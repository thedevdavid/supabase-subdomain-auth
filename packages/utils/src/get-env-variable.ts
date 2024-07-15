export const getEnvVariable = (
  vars: NodeJS.ProcessEnv,
  key: string
): string => {
  const value = vars[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
};
