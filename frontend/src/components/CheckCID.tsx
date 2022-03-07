import { fetchCIDLogs, IResult, isValidParams } from "data";
import { useCommonParams } from "data/useCommonParams";
import isEmpty from "lodash-es/isEmpty";
import { FormEventHandler, useCallback } from "react";
import { useMutation } from "react-query";
import { Message } from "./Message";
import { TooltipMultiaddr } from "./Tooltip";
import { TooltipCID } from "./Tooltip";
import { TooltipBackend } from "./Tooltip";

export const CheckCID: React.FC = () => {
  const { params, onChangeCID, onChangeBackend, onChangeAddr } =
    useCommonParams();

  const mutation = useMutation(fetchCIDLogs);
  const canSubmit = isValidParams(params) && !mutation.isLoading;

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();

      if (isValidParams(params)) {
        mutation.mutate(params);
      }
    },
    [mutation, params]
  );

  const { addr, cid, backend } = params;

  return (
    <div className="block p-4">
      <div className="block">
        <form onSubmit={onSubmit}>
          <div className="field">
            <label className="label">
              Multiaddr <TooltipMultiaddr />
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="/p2p/Qm..."
                value={addr}
                onChange={onChangeAddr}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">
              CID <TooltipCID />
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="QmData..."
                value={cid}
                onChange={onChangeCID}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">
              Backend URL <TooltipBackend />
            </label>
            <div className="control">
              <input
                className="input"
                type="text"
                value={backend}
                onChange={onChangeBackend}
              />
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button
                className="button is-link"
                type="submit"
                disabled={!canSubmit}
              >
                {mutation.isLoading ? "Loading..." : "Run Test"}
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="block">
        {mutation.error && (
          <Message
            failure
            title="The request failed"
            content={`${mutation.error}`}
          />
        )}
        {mutation.data && <Result data={mutation.data} />}
      </div>
    </div>
  );
};

const Result: React.FC<{ data: IResult }> = ({ data }) => {
  return (
    <>
      {data.ConnectionError !== "" ? (
        <Message
          failure
          title="Could not connect to multiaddr"
          content={data.ConnectionError}
        />
      ) : (
        <Message success title="Successfully connected to multiaddr" />
      )}
      {isEmpty(data.PeerFoundInDHT) ? (
        <Message
          failure
          title="Could not find any multiaddrs in the dht"
          content={data.ConnectionError}
        />
      ) : (
        <Message success title="Found multiaddrs advertised in the DHT">
          <ul>
            {Object.entries(data.PeerFoundInDHT).map(([peerAddr, value]) => (
              <li key={peerAddr}>{peerAddr}</li>
            ))}
          </ul>
        </Message>
        // TODO: port the idea of finding your address in the multiaddress (l.137 from original web)
      )}
      {!data.CidInDHT ? (
        <Message failure title="Could not find the multihash in the DHT" />
      ) : (
        <Message success title="Found multihash advertised in the DHT" />
      )}
      {data.DataAvailableOverBitswap.Error ? (
        <Message
          failure
          title="There was an error downloading the CID from the peer"
          content={data.DataAvailableOverBitswap.Error}
        />
      ) : (
        <Message success title="The data is available over bitswap" />
        // TODO: port back the other checks
      )}
      <pre>{JSON.stringify(data, undefined, 2)}</pre>
    </>
  );
};
