# Setting-up DynamoDB through AWS CLI
- Install AWS CLI
- configure AWS
  - Refer to: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/SettingUp.DynamoWebService.html 
  - use command **aws configure** to your access keys to AWS CLI after creating the keys using the above link for reference.  

## Create DynamoDB table command using JSON file 
#
- aws dynamodb create-table --cli-input-json file://filename.json

## Create multiple items
- aws dynamodb batch-write-item --request-items file://fileitems.json

# reference material:
- https://docs.aws.amazon.com/cli/latest/reference/dynamodb/index.html 
