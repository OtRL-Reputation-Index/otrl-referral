import { BlockChainPost } from "@/lib/types";

/**
 * Add a referral to the blockchain
 * @param BlockChainPost referral to add to the blockchain
 */
const postBlockchain = async (block: BlockChainPost): Promise<boolean> => {
  try {
    const response = await fetch(`${process.env.BLOCKCHAIN_URL}/submit`, {
      body: JSON.stringify({
        employer_pk: block.employerPk,
        employee_pk: block.employeePk,
        message: block.message,
        rui: block.ruiScore,
        signature: block.digitalSignature,
      }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (response.status >= 400) {
      return false;
    }

    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export { postBlockchain };
