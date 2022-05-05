type RuleBase = {
  id: string;
  lifecycle: "req" | "res";
  url: { type: "contains"; value: string };
  createdAt: number;
  enabled: boolean;
};

export type DelayRule = RuleBase & {
  type: "delay";
  duration: number;
};

export type Rule = DelayRule;
