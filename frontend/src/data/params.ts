export interface IParamsAddrAndCID {
  backend: string;
  cid: string;
  addr: string;
}

export interface IParamsAddr {
  backend: string;
  addr: string;
}

export interface IParamsCID {
  backend: string;
  cid: string;
}

export const isValidParams = (
  params: Partial<IParamsAddrAndCID>
): params is IParamsAddrAndCID => {
  // To be expanded
  if (!params.addr || !params.backend || !params.cid) {
    return false;
  }
  return true;
};

export const isValidAddrParams = (
  params: Partial<IParamsAddrAndCID>
): params is IParamsAddr => {
  // To be expanded
  if (!params.addr || !params.backend) {
    return false;
  }
  return true;
};

export const isValidCIDParams = (
  params: Partial<IParamsCID>
): params is IParamsCID => {
  // To be expanded
  if (!params.cid || !params.backend) {
    return false;
  }
  return true;
};
