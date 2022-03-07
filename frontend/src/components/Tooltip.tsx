export const Tooltip: React.FC<{ message: string }> = ({ message }) => {
  return (
    <span
      className="icon has-tooltip-arrow has-tooltipl-multiline"
      data-tooltip={message}
    >
      ℹ️
    </span>
  );
};

export const TooltipMultiaddr: React.FC = () => {
  return (
    <Tooltip
      message="The multiaddress is the&#10;location of your node, created by combining&#10;the string `/xp2p/` with the PeerID"
    />
  );
};

export const TooltipCID: React.FC = () => {
  return (
    <Tooltip
      message="This is the Content Identifier&#10;for a piece of content&#10;that is pinned by a node in IPFS"
    />
  );
};

export const TooltipBackend: React.FC = () => {
  return (
    <Tooltip
      message="This is the a third party URL that you&#10;would like to check a node or piece of content against.&#10;You can use https://ipfs-check-backend.ipfs.io/"
    />
  );
};
