import { Fragment, type ReactNode } from "react";

function renderStarred(text: string, keyPrefix = "a"): ReactNode[] {
  const parts = text.split(/(\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (!part) return null;
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      return (
        <em
          key={`${keyPrefix}-${i}`}
          className="font-display font-medium text-accent-400"
        >
          {part.slice(1, -1)}
        </em>
      );
    }
    return <Fragment key={`${keyPrefix}-${i}`}>{part}</Fragment>;
  });
}

export function AccentText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return <span className={className}>{renderStarred(text)}</span>;
}

export { renderStarred };