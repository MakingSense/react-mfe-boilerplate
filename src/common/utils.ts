export const timeout: (ms: number) => Promise<void> = async (ms: number) => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};

export const generateRandomString = (length: number) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
  }

  return result;
};

// Based on https://github.com/typescript-eslint/typescript-eslint/issues/4619#issuecomment-1055653098
export const fireAndForget =
  <TArgs extends unknown[]>(fn: (...args: TArgs) => Promise<unknown>) =>
  (...args: TArgs) => {
    void fn(...args);
  };

export const noop = () => {};
