import { fetchFindCIDInDHT, isValidCIDParams } from "data";
import { useCommonParams } from "data/useCommonParams";
import React, { FormEventHandler, useCallback, useEffect } from "react";
import { useMutation } from "react-query";
import { ClickablePeerAddrList } from "./ClickablePeerAddrList";
import { Message } from "./Message";
import { ResultTitle } from "./ResultTitle";
import { Tooltip } from "./Tooltip";
// @ts-ignore
import bulmaCollapsible from "@creativebulma/bulma-collapsible";
//@ts-ignore for debugging
window.bulmaCollapsible = bulmaCollapsible;

export const IsMyContentAvailableInline: React.FC = () => {
  const { params } = useCommonParams();
  const mutation = useMutation(fetchFindCIDInDHT);
  const canSubmit = isValidCIDParams(params) && !mutation.isLoading;

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();

      if (isValidCIDParams(params)) {
        mutation.mutate(params);
      }
    },
    [mutation, params]
  );

  const error =
    mutation.error ||
    mutation.data?.parseCIDError ||
    mutation.data?.findProvidersError;

  const data = error ? undefined : mutation.data?.providers;

  const rawData = { error: mutation.error, data: mutation.data };

  useEffect(() => {
    bulmaCollapsible.attach(".is-collapsible");
  });

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
            title="The request failed"
            content={`${error}`}
            rawData={rawData}
            issueRef="content availability"
          />
        )}
        {data && (
          <>
            <Message success rawData={rawData} issueRef="content availability">
              <p>Our backend found {data.length} providers for this CID.</p>
            </Message>
            <div className="block mt-3">
              <h3 className="title is-5">
                Providers:{" "}
                <Tooltip
                  message="These are the providers that we found.&#10;Click on any of their addresses to test them."
                />
              </h3>

              <div>
                <button
                  className="button primary"
                  data-action="collapse"
                  data-target="#available-providers"
                >
                  Expand
                </button>
              </div>
              <div
                className="menu is-collapsible is-active"
                id="available-providers"
                style={{ maxWidth: "600px" }}
              >
                {data.map((peer) => (
                  <ClickablePeerAddrList key={peer.ID} {...peer} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
