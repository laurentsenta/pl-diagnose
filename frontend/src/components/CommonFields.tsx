import { useCommonParams } from "data/useCommonParams";
import { TooltipBackend, TooltipCID, TooltipMultiaddr } from "./Tooltip";

export const BackendURLField: React.FC = () => {
  const { params, onChangeBackend } = useCommonParams();
  const { backend } = params;

  return (
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
  );
};

export const CIDField: React.FC = () => {
  const { params, onChangeCID } = useCommonParams();
  const { cid } = params;

  return (
    <div className="field">
      <label className="label">
        CID <TooltipCID />
      </label>
      <div className="control">
        <input
          className="input"
          type="text"
          placeholder="baf.... or Qm.... for example"
          value={cid}
          onChange={onChangeCID}
        />
      </div>
    </div>
  );
};

export const AddrField: React.FC = () => {
  const { params, onChangeAddr } = useCommonParams();
  const { addr } = params;

  return (
    <div className="field">
      <label className="label">
        Network or Multi- Address <TooltipMultiaddr />
      </label>
      <div className="control">
        <input
          className="input"
          type="text"
          placeholder="/ip4/.... for example"
          value={addr}
          onChange={onChangeAddr}
        />
      </div>
    </div>
  );
};
