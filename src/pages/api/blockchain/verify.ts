import { verify } from "bitcoinjs-message";

/**
 * Generate a message for the employer to sign
 * @param employer_pk Employee's public key is used to generate a unique message
 * @returns a message
 */
const generateMessage = async (): Promise<string> => {
  const msg = "15gjzQezEfrmJDGxvMMWhnZaEQAZTaFmYY:012020102";

  return msg;
};

/**
 * Verify a digitally signed message by the employer
 * @param employer_pk Employer's public key used to digitally sign a message
 * @param message Employer's message
 * @param signature Employer's digitally signed message
 * @returns whether signature is valid or not
 */
const verifyMessage = async (
  employerPk: string,
  message: string,
  signature: string
): Promise<boolean> => {
  return verify(message, employerPk, signature);
};

export { generateMessage, verifyMessage };
