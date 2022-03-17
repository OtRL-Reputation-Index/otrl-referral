import { Referral } from "@/lib/types";
import AWS from "@/pages/api/db/aws";

const postReferral = async (referral: Referral): Promise<boolean> => {
  const docClient = new AWS.DynamoDB.DocumentClient();

  const table = "Referral";
  const params = {
    TableName: table,
    Item: {
      id: referral.id, // partition key
      employee_id: referral.employeeId,
      employer_id: referral.employerId,
      message: referral.message,
      s_complaints: referral.survey.sComplaints,
      s_ethic: referral.survey.sEthic,
      s_pressure: referral.survey.sPressure,
      s_reliable: referral.survey.sReliable,
      s_respect: referral.survey.sRespect,
      s_task_communicate: referral.survey.sTaskCommunicate,
      s_task_complete: referral.survey.sTaskComplete,
      s_experience: referral.survey.sExperience,
      s_task_time: referral.survey.sTaskTime,
      s_work_time: referral.survey.sWorkTime,
      signature: referral.signature,
      submission_time: referral.submittedAt.toISOString(),
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
