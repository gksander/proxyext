import { useRootSelector } from "./useRootSelector";
import { AppRequest, selectActiveRequest } from "../store/requests.slice";

export const useActiveRequest = () =>
  useRootSelector(selectActiveRequest) as AppRequest | undefined;
