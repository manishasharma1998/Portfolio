import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

function authPage(script: string): string {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Sign in to GitHub</title></head><body><script>${script}</script></body></html>`;
}

const sendMsg = (payload: string) =>
  `window.opener.postMessage(${JSON.stringify(payload)}, window.location.origin);window.close();`;

/**
 * Decap's implicit-grant popup flow REQUIRES a challenge handshake:
 *   1. popup posts "authorizing:github" to the opener,
 *   2. Decap echoes it back (and swaps in its token listener),
 *   3. only then does the popup post "authorization:github:<status>:<payload>".
 * Posting the token directly is silently ignored by Decap.
 */
const handshakeScript = (message: string) =>
  `(function(){var t=window.location.origin;function r(e){if(e.origin!==t)return;if(e.data==="authorizing:github"){window.opener.postMessage(${JSON.stringify(
    message
  )},t);setTimeout(function(){window.close()},50)}}window.addEventListener("message",r,false);window.opener.postMessage("authorizing:github",t)})();`;

/**
 * Decap CMS external-OAuth proxy (GitHub backend).
 *
 *  - GET without `code`  → begin flow: redirect to GitHub's authorize screen.
 *  - GET with `code`     → callback: exchange the code for an access token and
 *                          post the result back to the Decap popup window.
 *
 * Requires env vars GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET (set on Vercel).
 */
export async function GET(request: NextRequest) {
  const { origin } = new URL(request.url);
  const code = request.nextUrl.searchParams.get("code");

  if (code) {
    const response = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "User-Agent": "portfolio-content-manager",
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_CLIENT_ID,
          client_secret: process.env.GITHUB_CLIENT_SECRET,
          code,
        }),
      }
    );
    const data = (await response.json()) as {
      access_token?: string;
      error?: string;
      error_description?: string;
    };

    if (data.error || !data.access_token) {
      const message =
        "authorization:github:error:" +
        JSON.stringify({ message: data.error_description || data.error || "unknown" });
      return new Response(authPage(handshakeScript(message)), {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    const message =
      "authorization:github:success:" +
      JSON.stringify({ token: data.access_token, provider: "github" });
    return new Response(authPage(handshakeScript(message)), {
      headers: { "Content-Type": "text/html; charset=utf-8" },
    });
  }

  const redirectUri = `${origin}/api/auth`;
  const scope = request.nextUrl.searchParams.get("scope") || "repo";
  const authorizeUrl =
    "https://github.com/login/oauth/authorize?" +
    new URLSearchParams({
      client_id: process.env.GITHUB_CLIENT_ID ?? "",
      scope,
      redirect_uri: redirectUri,
    });

  return new Response(authPage(`window.location.href=${JSON.stringify(authorizeUrl)};`), {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}