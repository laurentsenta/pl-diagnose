import { DEFAULT_BACKEND_URL } from "data";
import { isEmpty, omitBy } from "lodash-es";
import React, {
  ChangeEventHandler,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useSearchParams } from "react-router-dom";

interface IParams {
  params: { addr?: string; backend?: string; cid?: string };
  onChangeAddr: ChangeEventHandler<HTMLInputElement>;
  onChangeCID: ChangeEventHandler<HTMLInputElement>;
  onChangeBackend: ChangeEventHandler<HTMLInputElement>;
  setAddr: (x: string) => void;
  setBackend: (x: string) => void;
  setCID: (x: string) => void;
}

const CommonParams = createContext<IParams | null>(null);
const CommonParamsProviderInternal = CommonParams.Provider;

export const CommonParamsProvider: React.FC = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const s = (key: string, initial: string = ""): string => {
    const value = searchParams.get(key);
    console.log(key, initial, searchParams.get(key));
    return value ? value : initial;
  };

  const [addr, setAddr] = useState(s("addr"));
  const [backend, setBackend] = useState(s("backend", DEFAULT_BACKEND_URL));
  const [cid, setCID] = useState(s("cid"));

  const params = useMemo(() => ({ addr, backend, cid }), [addr, cid, backend]);

  const onChangeAddr: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setAddr(e.target.value);
    },
    [setAddr]
  );

  const onChangeCID: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setCID(e.target.value);
    },
    [setCID]
  );

  const onChangeBackend: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setBackend(e.target.value);
    },
    [setBackend]
  );

  useEffect(() => {
    setSearchParams(omitBy(params, isEmpty));
  }, [setSearchParams, params]);

  return (
    <CommonParamsProviderInternal
      value={{
        params,
        onChangeAddr,
        onChangeBackend,
        onChangeCID,
        setAddr,
        setBackend,
        setCID,
      }}
    >
      {children}
    </CommonParamsProviderInternal>
  );
};

export const useCommonParams = (): IParams => {
  const c = useContext(CommonParams);

  if (!c) {
    throw new Error("invalid context");
  }

  return c;
};
