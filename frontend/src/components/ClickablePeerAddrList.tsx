import { useCommonParams } from "data/useCommonParams";
import React from "react";

export const ClickablePeerAddrList: React.FC<{
  ID?: string;
  Addrs?: string[];
}> = ({ ID, Addrs }) => {
  const { setAddr } = useCommonParams();

  const onClick = () => {
    setAddr(`/p2p/${ID}`);
  };

  return (
    <>
      <p className="menu-label">Peer: {ID}</p>
      {Addrs && (
        <ul className="menu-list">
          {Addrs.map((a) => {
            const onClick = () => {
              setAddr(`${a}/p2p/${ID}`);
            };

            return (
              <li>
                <a onClick={onClick}>{a}</a>
              </li>
            );
          })}
          <li>
            <a onClick={onClick}>{`/p2p/${ID}`}</a>
          </li>
        </ul>
      )}
    </>
  );
};
