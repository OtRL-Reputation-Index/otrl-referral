import { PrevReferral, ReferralGet, ReferralPost } from "@/lib/types";
import AWS from "@/pages/api/db/aws";

/**
 * Fetch a referral
 * @param employer_id Employer's public key used for the referral
 * @param employee_pk Employee's public key used for the referral
 * @returns a referral
 */
const fetchPrevReferral = async (
  param: ReferralGet
): Promise<PrevReferral | undefined> => {
  const docClient = new AWS.DynamoDB.DocumentClient();
  const table = "Referral";

  const params = {
    TableName: table,
    KeyConditionExpression:
      "#employer_id = :employer_id AND #employee_id = :employee_id",
    ExpressionAttributeNames: {
      "#employer_id": "employer_id",
      "#employee_id": "employee_id",
    },
    ExpressionAttributeValues: {
      ":employer_id": param.employer_id,
      ":employee_id": param.employee_id,
    },
  };

  try {
    const result = await docClient.query(params).promise();
    const prevReferrals: PrevReferral[] = [];
    result.Items?.forEach((item) => {
      const prevReferral: PrevReferral = {
        score: item.score,
      };
      prevReferrals.push(prevReferral);
    });
    return prevReferrals ? prevReferrals[0] : undefined;
  } catch (err) {
    console.log(err);
  }

  return undefined;
};

const postReferral = async ({
  referral,
  surveyScore,
}: ReferralPost): Promise<boolean> => {
  const docClient = new AWS.DynamoDB.DocumentClient();

  const table = "Referral";
  const params = {
    TableName: table,
    Item: {
      employee_id: referral.employeeId, // partition key
      employer_id: referral.employerId, // sort key
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
      s_fulltime: referral.survey.sFullTime,
      signature: referral.signature,
      submission_time: referral.submittedAt.toISOString(),
      score: surveyScore,
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

export { fetchPrevReferral, postReferral };
