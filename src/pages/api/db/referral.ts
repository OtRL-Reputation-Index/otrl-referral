import { Referral } from "@/lib/types";
import AWS from "@/pages/api/db/aws";

const postReferral = async (referral: Referral): Promise<boolean> => {
  const docClient = new AWS.DynamoDB.DocumentClient();

  const table = "Referral";
  const params = {
    TableName: table,
    Key: {
      id: referral.id, // partition key
    },
    Item: {
      message: referral.message,
      s_complaints: referral.sComplaints,
      s_ethic: referral.sEthic,
      s_pressure: referral.sPressure,
      s_reliable: referral.sReliable,
      s_respect: referral.sRespect,
      s_task_communicate: referral.sTaskCommunicate,
      s_task_complete: referral.sTaskComplete,
      s_experience: referral.sExperience,
      s_task_time: referral.sTaskTime,
      s_work_time: referral.sWorkTime,
      signature: referral.signature,
    },
  };

  try {
    await docClient.put(params).promise();
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
};

export { postReferral };
