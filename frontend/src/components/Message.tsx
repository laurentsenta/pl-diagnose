import { makeIssueURL } from "data/github";
import { useCallback, useState } from "react";
import { ExternalLink } from "./ExternalLink";

const useTextContent = (
  initial: string
): [React.LegacyRef<HTMLElement>, string] => {
  const [text, setText] = useState(initial);

  const ref = useCallback(
    (node: HTMLElement) => {
      if (node && node.textContent) {
        setText(node.textContent);
      }
    },
    [setText]
  );

  return [ref, text];
};

export const Message: React.FC<{
  title?: string;
  content?: string;
  failure?: true;
  success?: true;
  issueRef?: string;
  rawData?: unknown; // TODO: remove me
}> = ({ title, content, children, success, failure, issueRef, rawData }) => {
  const status = success ? "is-success" : "is-warning";
  const hasMore = content || children;
  const [ref, text] = useTextContent("");

  return (
    <>
      <article className={`notification ${status}`} ref={ref}>
        {title && (
          <div className="header">
            <p>{title}</p>
          </div>
        )}
        {hasMore && (
          <div className="body" style={{ overflow: "scroll" }}>
            {content}
            {children}
          </div>
        )}
      </article>
      {
        <p>
          ❓ Need help with this result? Ask for help on{" "}
          <ExternalLink
            href={makeIssueURL({
              title: `[help] I need help with ${issueRef || "a result"}`,
              body: `
- [ ] what I tried to do: ...
- [ ] url of the page: ${window.location}
- [ ] what I got: 

> ${text.split("\n").join("\n> ")}

- [ ] I don't have enough information to fix my issue because: ...

## Details:

- title: ${title}
- issueRef: ${issueRef}
- rawData: 

\`\`\`json
${JSON.stringify(rawData, undefined, 2)}
\`\`\`
            `,
            })}
            title="github"
          />
          .
        </p>
      }
    </>
  );
};
