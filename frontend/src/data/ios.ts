import { IParamsAddrAndCID, IParamsAddr, IParamsCID } from "./params";

export const DEFAULT_BACKEND_URL = process.env.REACT_APP_DEFAULT_BACKEND_URL;

export interface IResult {
  ConnectionError: string;
  PeerFoundInDHT: { [key: string]: number };
  CidInDHT: boolean;
  DataAvailableOverBitswap: {
    Duration: number;
    Found: boolean;
    Responded: boolean;
    Error: string;
  };
}

export const fetchCIDLogs = async (
  params: IParamsAddrAndCID
): Promise<IResult> => {
  const queryString = `multiaddr=${params.addr}&cid=${params.cid}`;

  const url = `${params.backend}?${queryString}`;

  const r = await fetch(url, {
    method: "POST",
    headers: {},
  });

  if (r.ok) {
    return r.json();
  }

  throw await r.text();
};

interface IIdentify {
  id?: string;
  parseAddressError?: string;
  connectToPeerError?: string;
  identifyPeerError?: string;
  pingError?: string;
  pingDurationMS?: number;
  protocols?: string[];
  addresses?: string[];
}

export const fetchNodeIdentify = async (
  params: IParamsAddr
): Promise<IIdentify> => {
  const queryString = `addr=${params.addr}`;

  const url = `${params.backend}/identify?${queryString}`;

  const r = await fetch(url, {
    method: "GET",
    headers: {},
  });

  if (r.ok) {
    return r.json();
  }

  throw await r.text();
};

interface IFindCID {
  parseCIDError?: string;
  findProvidersError?: string;
  providers?: { ID: string; Addrs: string[] }[];
}

export const fetchFindCIDInDHT = async (
  params: IParamsCID
): Promise<IFindCID> => {
  const queryString = `cid=${params.cid}`;

  const url = `${params.backend}/find?${queryString}`;

  const r = await fetch(url, {
    method: "GET",
    headers: {},
  });

  if (r.ok) {
    return r.json();
  }

  throw await r.text();
};

interface IFoundPeer {}

export const fetchPeerIDIsFound = async (
  params: IParamsAddr
): Promise<IFoundPeer> => {
  const queryString = `addr=${params.addr}`;

  const url = `${params.backend}/identify?${queryString}`;

  const r = await fetch(url, {
    method: "GET",
    headers: {},
  });

  if (r.ok) {
    return r.json();
  }

  throw await r.text();
};

interface IFindInBitswap {
  parseCIDError?: string;
  parseAddressError?: string;
  getBlockError?: string;
  blockSizeBytes?: number;
  durationMS?: number;
}

export const fetchViaBitswap = async (
  params: IParamsAddrAndCID
): Promise<IFindInBitswap> => {
  const queryString = `addr=${params.addr}&cid=${params.cid}`;

  const url = `${params.backend}/bitswap?${queryString}`;

  const r = await fetch(url, {
    method: "GET",
    headers: {},
  });

  if (r.ok) {
    return r.json();
  }

  throw await r.text();
};
