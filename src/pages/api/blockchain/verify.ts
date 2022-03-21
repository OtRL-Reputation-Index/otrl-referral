import { verify } from "bitcoinjs-message";

/**
 * Generate a message for the employer to sign
 * @param employer_pk Employee's public key is used to generate a unique message
 * @returns a message
 */
const generateMessage = async (employerPk: string): Promise<string> => {
  try {
    const response = await fetch(
      `${process.env.BLOCKCHAIN_URL}/requestValidation`,
      {
        body: JSON.stringify({
          employer_pk: employerPk,
        }),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    );

    if (response.status >= 400) {
      return "Error";
    }

    const msg = await response.json();
    if (msg) {
      return msg;
    }
  } catch (error) {
    return "Error";
  }

  return "Error";
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
  try {
    return verify(message, employerPk, signature);
  } catch (err) {
    return false;
  }
};

export { generateMessage, verifyMessage };
