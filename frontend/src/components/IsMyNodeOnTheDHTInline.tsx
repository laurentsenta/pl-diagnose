import { fetchPeerInDHT, isValidAddrParams } from "data";
import { useCommonParams } from "data/useCommonParams";
import { FormEventHandler, useCallback } from "react";
import { useMutation } from "react-query";
import { ClickablePeerAddrList } from "./ClickablePeerAddrList";
import { Message } from "./Message";
import { ResultTitle } from "./ResultTitle";

export const IsMyNodeOnTheDHTInline: React.FC = () => {
  const { params } = useCommonParams();
  const mutation = useMutation(fetchPeerInDHT);
  const canSubmit = isValidAddrParams(params) && !mutation.isLoading;

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();

      if (isValidAddrParams(params)) {
        mutation.mutate(params);
      }
    },
    [mutation, params]
  );

  const data = mutation.error ? undefined : mutation.data;
  const error =
    mutation.error || data?.findPeerError || data?.parseAddressError;

  const rawData = { error: mutation.error, data: mutation.data };

  return (
    <div className="block">
      <div className="block my-4">
        <form onSubmit={onSubmit}>
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
      <div className="block my-4">
        <ResultTitle
          raw={{ error: mutation.error, data: mutation.data }}
          error={!!error}
          success={!!data}
        />
        {error && (
          <Message
            failure
            title="An error occured"
            rawData={rawData}
            issueRef="node in the dht"
          >
            <div className="content">
              <p>
                The backend couldn't find your node in the DHT. It failed with
                the following error: <br />
                <strong>{`${error}`}</strong>
              </p>
            </div>
          </Message>
        )}
        {!error && data && (
          <>
            <Message
              success
              title=""
              rawData={rawData}
              issueRef="node availability"
            >
              <div className="content">
                <p>
                  The backend was able to find {(data.addresses || []).length}{" "}
                  addresses for the node {data.id}.
                </p>
              </div>
            </Message>
            <div className="content mt-3">
              <p>
                The node advertised the following addresses. Click on any of
                this address to try connect to it.
              </p>
              <ClickablePeerAddrList ID={data.id} Addrs={data.addresses} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
