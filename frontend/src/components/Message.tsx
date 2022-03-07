import { makeIssueURL } from "data/github";
import { ExternalLink } from "./ExternalLink";

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

  return (
    <>
      <article className={`notification ${status}`}>
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
          Need help with this result? Ask for help on{" "}
          <ExternalLink
            href={makeIssueURL({
              title: `[help] I need help with ${issueRef || "a result"}`,
              body: `
## Issue

- [ ] what I tried to do: ...
- [ ] url of the page: ${window.location}
- [ ] what I got: 

> ${content}

- [ ] what am I missing: ...

## Details:

- title: ${title}
- issueRef: ${issueRef}
- rawData: ${JSON.stringify(rawData)}
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
