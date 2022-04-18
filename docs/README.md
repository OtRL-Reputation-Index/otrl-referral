
# Setting-up DynamoDB through AWS CLI
- Install AWS CLI
- configure AWS
  - Refer to: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/SettingUp.DynamoWebService.html 
  - aws

## Create DynamoDB table command using JSON file 
#
- aws dynamodb create-table --cli-input-json file://filename.json

## Create an item
- aws dynamodb put-item  --cli-input-json file://filename.json

# reference material:
- https://docs.aws.amazon.com/cli/latest/reference/dynamodb/index.html 