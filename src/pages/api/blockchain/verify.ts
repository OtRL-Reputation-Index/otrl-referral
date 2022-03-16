import { verify } from "bitcoinjs-message";

/**
 * Generate a message for the employer to sign
 * @param employer_pk Employee's public key is used to generate a unique message
 * @returns a message
 */
const generateMessage = async (): Promise<string> => {
  const msg = "3832990DD1A5B5AB9C5E119D81E178A91D10FE54C2:012020012";
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
