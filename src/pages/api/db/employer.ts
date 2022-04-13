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

/**
 * Creating a new employer
 * @param employer employer to add to the database
 * @returns whether employer was added
 */
const postEmployer = async (employer: Employer): Promise<boolean> => {
  const docClient = new AWS.DynamoDB.DocumentClient();
  const table = "Employer";
  const idParams = {
    TableName: table,
    Key: {
      id: "counter", // partition key
    },
    UpdateExpression: "Add #last_id :increment",
    ExpressionAttributeNames: {
      "#last_id": "last_id",
    },
    ExpressionAttributeValues: {
      ":increment": 1,
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    const idResult = await docClient.update(idParams).promise();
    if (idResult.Attributes && idResult.Attributes.last_id) {
      const params = {
        TableName: table,
        Item: {
          id: idResult.Attributes.last_id.toString(), // partition key
          pk: employer.pk,
          company_name: employer.companyName,
          email: employer.email,
          first_name: employer.firstName,
          middle_name: employer.middleName,
          last_name: employer.lastName,
          phone_num: employer.phoneNum,
        },
      };

      await docClient.put(params).promise();
      return true;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
  return false;
};

export { fetchEmployer, postEmployer };
