import { Rule } from "../types/rules";

type RulesMessage = {
  type: "rules";
  rules: Rule[];
};

export const sendRulesToSW = (rules: Rule[]) => {
  const payload: RulesMessage = {
    type: "rules",
    rules,
  };

  chrome.runtime.sendMessage(payload).catch(() => {});
};

export const isMessageDataRulesPayload = (data: any): data is RulesMessage => {
  return data?.type === "rules";
};
