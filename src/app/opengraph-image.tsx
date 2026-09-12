import { ImageResponse } from "next/og";

export const alt = "Manisha Sharma — UX & XR Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          background: "#0b0d12",
          fontFamily: "sans-serif",
          padding: 72,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#6c8cff",
            fontSize: 24,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          <span
            style={{
              width: 48,
              height: 2,
              background: "#6c8cff",
              display: "flex",
            }}
          />
          UX Designer · XR Designer
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "#f4f1ec",
            lineHeight: 1.05,
          }}
        >
          Manisha Sharma
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 34,
            color: "#9aa0b3",
            marginTop: 24,
            maxWidth: 900,
          }}
        >
          UX Designer with a research-first brain. XR Designer with a
          headset on.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 40,
            alignSelf: "flex-start",
            padding: "14px 24px",
            borderRadius: 999,
            border: "1px solid rgba(108,140,255,0.5)",
            color: "#9db8ff",
            fontSize: 22,
          }}
        >
          Instantly available to relocate
        </div>
      </div>
    ),
    { ...size }
  );
}