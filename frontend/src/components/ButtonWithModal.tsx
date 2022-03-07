import { useCallback, useState } from "react";

export const ButtonWithModal: React.FC<{ title: string }> = ({
  title,
  children,
}) => {
  const [show, setShow] = useState(false);
  const toggle = useCallback(() => setShow((x) => !x), [setShow]);

  return (
    <>
      <button className="button outline" onClick={toggle}>
        {title}
      </button>
      <div className={`modal ${show ? "is-active" : ""}`}>
        <div className="modal-background" onClick={toggle}></div>
        <div className="modal-content">
          <div className="box">{children}</div>
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={toggle}
        ></button>
      </div>
    </>
  );
};
