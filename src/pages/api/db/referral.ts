import { Referral } from "@/lib/types";
import AWS from "@/pages/api/db/aws";

const postReferral = async (referral: Referral): Promise<boolean> => {
  console.log(referral);

  const docClient = new AWS.DynamoDB.DocumentClient();
  
  const table = "Referral";
  const params = {
    TableName: table,
    Key: {
      id: referral.id, // partition key
    },
    Item: {
      "message" : referral.message,
      "s_complaints" : referral.sComplaints,
      "s_ethic" : referral.sEthic,
      "s_pressure" : referral.sPressure,
      "s_reliable" : referral.sReliable,
      "s_respect" : referral.sRespect,
      "s_task_communicate" : referral.sTaskCommunicate,
      "s_task_complete" : referral.sTaskComplete,
      "s_task_experience" : referral.sTaskExperience,
      "s_task_time" : referral.sTaskTime,
      "s_work_time" : referral.sWorkTime,
      "signature" : referral.signature
    }
  };

  console.log("Adding a new item...");
  docClient.put(params, function(err: any, data: any) {
      if (err) {
          console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
      } else {
          console.log("Added item:", JSON.stringify(data, null, 2));
      }
  });

  return true;
};

export { postReferral };