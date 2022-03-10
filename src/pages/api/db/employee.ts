import { Employee, EmployeeUpdate } from "@/lib/types";
import AWS from "@/pages/api/db/aws";

/**
 * Fetch an employee from dynamoDB
 * @param employee_pk Employee's public key used to identify on the blockchain
 * @returns an employee
 */
const fetchEmployee = async (
  employee_pk: string
): Promise<Employee | undefined> => {
  const docClient = new AWS.DynamoDB.DocumentClient();
  const table = "Employee";
  const indexName = "pk-index";

  const params = {
    TableName: table,
    IndexName: indexName,
    KeyConditionExpression: "#pk = :employee_pk",
    ExpressionAttributeNames: {
      "#pk": "pk",
    },
    ExpressionAttributeValues: {
      ":employee_pk": employee_pk,
    },
  };

  try {
    const result = await docClient.query(params).promise();
    const employees: Employee[] = [];
    result.Items?.forEach((item) => {
      const employee: Employee = {
        id: item.id,
        firstName: item.first_name,
        middleName: item.middle_name,
        lastName: item.last_name,
        phoneNum: item.phone_num,
        pk: item.pk,
        numReferrals: item.referrals_num,
        rui: item.rui,
      };
      employees.push(employee);
    });
    return employees ? employees[0] : undefined;
  } catch (err) {
    console.log(err);
  }

  return undefined;
};

/**
 * Update an employee's rui score with the id of
 * @param update update operation data
 * @returns updated event document
 */
const updateEmployee = async (
  update: EmployeeUpdate
): Promise<Employee | null> => {
  const docClient = new AWS.DynamoDB.DocumentClient();
  const table = "Employee";
  const params = {
    TableName: table,
    Key: {
      id: update.id, // partition key
    },
    UpdateExpression: "SET #rui= :rui_value,#n_ref= :n_ref_value",
    ExpressionAttributeNames: {
      "#rui": "rui",
      "#n_ref": "referrals_num",
    },
    ExpressionAttributeValues: {
      ":rui_value": update.newRui,
      ":n_ref_value": update.newNumReferrals,
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    const result = await docClient.update(params).promise();
    console.log(result);

    if (result.Attributes) {
      return {
        id: result.Attributes?.id,
        firstName: result.Attributes?.first_name,
        middleName: result.Attributes?.middle_name,
        lastName: result.Attributes?.last_name,
        phoneNum: result.Attributes?.phone_num,
        pk: result.Attributes?.pk,
        numReferrals: result.Attributes?.referrals_num,
        rui: result.Attributes?.rui,
      };
    }
  } catch (err) {
    console.log(err);
  }
  return null;
};

export { fetchEmployee, updateEmployee };
