export const Message: React.FC<{
  title?: string;
  content?: string;
  failure?: true;
  success?: true;
  rawData?: unknown; // TODO: remove me
}> = ({ title, content, children, success }) => {
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
    </>
  );
};
