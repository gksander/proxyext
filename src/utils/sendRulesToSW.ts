type RulesMessage = {
  type: "rules";
  rules: string[];
};

export const sendRulesToSW = (rules: string[]) => {
  const payload: RulesMessage = {
    type: "rules",
    rules,
  };

  navigator.serviceWorker?.controller?.postMessage?.(payload);
};

export const isMessageDataRulesPayload = (data: any): data is RulesMessage => {
  return data?.type === "rules";
};
