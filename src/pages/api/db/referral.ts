import { Referral } from "@/lib/types";

const postEmployee = async (referral: Referral): Promise<boolean> => {
  console.log(referral);
  return true;
};

export { postEmployee };
