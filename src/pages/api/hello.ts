export const getHelloWorld = async (): Promise<string | undefined> => {
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((f) => setTimeout(f, 1000));
  return "Hello World";
};
