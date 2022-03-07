import { useCallback, useState } from "react";

export const ResultTitle: React.FC<{
  success?: boolean;
  error?: boolean;
  raw: unknown;
}> = ({ success, error, raw }) => {
  const [expanded, setExpanded] = useState(false);

  const toggle = useCallback(() => {
    setExpanded((x) => !x);
  }, [setExpanded]);

  const hasResult = success || error;

  return (
    <>
      <div className="level">
        <div className="level-left">
          <div className="level-item">
            <h3 className="title is-4">Result</h3>
          </div>
          <div className="level-item">
            <p className="subtitle">
              {error ? "❌ Failed" : success ? "✔️ Success" : null}
            </p>
          </div>
        </div>
        <div className="level-right">
          <div className="level-item">
            {!!raw && hasResult && (
              <button className="button is-small" onClick={toggle}>
                Raw Response
              </button>
            )}
          </div>
        </div>
      </div>
      {raw && hasResult && expanded && (
        <div className="block">
          <pre className="code">{JSON.stringify(raw, undefined, 2)}</pre>
        </div>
      )}
    </>
  );
};
