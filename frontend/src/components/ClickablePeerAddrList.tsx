import { useCommonParams } from "data/useCommonParams";
import React from "react";

export const ClickablePeerAddrList: React.FC<{
  ID?: string;
  Addrs?: string[];
}> = ({ ID, Addrs }) => {
  const { setAddr } = useCommonParams();

  return (
    <>
      <p className="menu-label">Peer: {ID}</p>
      {Addrs && Addrs.length === 0 && (
        <p>(No advertised addresses, we can't connect)</p>
      )}
      {Addrs && Addrs.length > 0 && (
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
        </ul>
      )}
    </>
  );
};
