import { MESSAGES } from "@utils/constants";

export const getErrorMessage = (e: any) => {
  return e?.response?.msg
    ? e?.response?.msg
    : e?.message
    ? e?.message
    : MESSAGES.GENERAL_ERROR_MESSAGE;
};
