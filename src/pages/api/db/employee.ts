import {
  Employee,
  EmployeeUpdate,
  EmployeeGet,
  EmployeeInfoGet,
  EmployeeInfo,
} from "@/lib/types";
import AWS from "@/pages/api/db/aws";

/**
 * Fetch an employee from dynamoDB
 * @param employee_id Employee id used to identify on the blockchain
 * @returns an employee
 */
const fetchEmployee = async (
  param: EmployeeGet
): Promise<Employee | undefined> => {
  const docClient = new AWS.DynamoDB.DocumentClient();
  const table = "Employee";

  const params = {
    TableName: table,
    KeyConditionExpression: "#id = :employee_id",
    ExpressionAttributeNames: {
      "#id": "id",
    },
    ExpressionAttributeValues: {
      ":employee_id": param.employeeId,
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
        companyName: item.company_name,
        rui: item.rui,
        email: item.email,
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
 * Fetch an employee from dynamoDB
 * @param employee_pk Employee's public key used to identify on the blockchain
 * @returns employee info
 */
const getEmployeeInfo = async (
  param: EmployeeInfoGet
): Promise<EmployeeInfo | undefined> => {
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
      ":employee_pk": param.employeePk,
    },
  };

  try {
    const result = await docClient.query(params).promise();
    const employees: EmployeeInfo[] = [];
    result.Items?.forEach((item) => {
      const employee: EmployeeInfo = {
        id: item.id,
        firstName: item.first_name,
        middleName: item.middle_name,
        lastName: item.last_name,
        pk: item.pk,
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
    UpdateExpression:
      "SET #rui= :rui_value,#n_ref= :n_ref_value,#last_updated = :last_updated",
    ExpressionAttributeNames: {
      "#rui": "rui",
      "#n_ref": "referrals_num",
      "#last_updated": "last_updated",
    },
    ExpressionAttributeValues: {
      ":rui_value": update.newRui,
      ":n_ref_value": update.newNumReferrals,
      ":last_updated": update.lastUpdated.toISOString(),
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    const result = await docClient.update(params).promise();

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
        email: result.Attributes?.email,
        companyName: result.Attributes?.company_name,
      };
    }
  } catch (err) {
    console.log(err);
  }
  return null;
};

/**
 * Creating a new employee
 * @param employee employee to add to the database
 * @returns whether employee was added
 */
const postEmployee = async (employee: Employee): Promise<boolean> => {
  const docClient = new AWS.DynamoDB.DocumentClient();
  const table = "Employee";
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
          pk: employee.pk,
          email: employee.email,
          first_name: employee.firstName,
          middle_name: employee.middleName,
          last_name: employee.lastName,
          phone_num: employee.phoneNum,
          rui: employee.rui,
          referrals_num: employee.numReferrals,
          companyName: employee.companyName,
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

export { fetchEmployee, updateEmployee, getEmployeeInfo, postEmployee };
