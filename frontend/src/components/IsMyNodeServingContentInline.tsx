import { fetchViaBitswap, isValidParams } from "data";
import { useCommonParams } from "data/useCommonParams";
import { FormEventHandler, useCallback } from "react";
import { useMutation } from "react-query";
import { Message } from "./Message";

export const IsMyNodeServingContentInline: React.FC = () => {
  const { params } = useCommonParams();
  const mutation = useMutation(fetchViaBitswap);
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

  const data = mutation.error ? undefined : mutation.data;

  const error =
    mutation.error ||
    data?.parseAddressError ||
    data?.parseCIDError ||
    data?.getBlockError;

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
        <h3 className="title is-4">Result:</h3>
        {error && (
          <Message
            failure
            title="The request failed"
            content={`${error}`}
            rawData={{ error: mutation.error, data: mutation.data }}
          />
        )}
        {!error && data && (
          <Message success title="Success" rawData={data}>
            <p>
              The backend was able to retrieve the bitswap content in{" "}
              {data.durationMS} milliseconds. The payload was{" "}
              {data.blockSizeBytes} bytes.
            </p>
          </Message>
        )}
      </div>
    </div>
  );
};
