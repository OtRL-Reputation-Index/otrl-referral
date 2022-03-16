import { Employer, EmployerGet } from "@/lib/types";
import AWS from "@/pages/api/db/aws";

/**
 * Fetch an employer from dynamoDB
 * @param employer_pk Employer's public key used to identify on the blockchain
 * @returns an employer
 */
const fetchEmployer = async (
  param: EmployerGet
): Promise<Employer | undefined> => {
  const docClient = new AWS.DynamoDB.DocumentClient();
  const table = "Employer";
  const indexName = "pk-index";

  const params = {
    TableName: table,
    IndexName: indexName,
    KeyConditionExpression: "#pk = :employer_pk",
    ExpressionAttributeNames: {
      "#pk": "pk",
    },
    ExpressionAttributeValues: {
      ":employer_pk": param.employerPk,
    },
  };

  try {
    const result = await docClient.query(params).promise();
    const employers: Employer[] = [];
    result.Items?.forEach((item) => {
      const employer: Employer = {
        id: item.id,
        pk: item.pk,
        companyName: item.company_name,
        firstName: item.first_name,
        middleName: item.middle_name,
        lastName: item.last_name,
        phoneNum: item.phone_num,
        email: item.email,
      };
      employers.push(employer);
    });
    return employers ? employers[0] : undefined;
  } catch (err) {
    console.log(err);
  }

  return undefined;
};

export { fetchEmployer };
