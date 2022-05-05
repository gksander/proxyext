export const METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"] as const;
export type Method = typeof METHODS[number];

export const isMethod = (maybeMethod: string): maybeMethod is Method => {
  for (const method of METHODS) {
    if (maybeMethod === method) return true;
  }
  return false;
};
