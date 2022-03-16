import * as AWS from "aws-sdk";

// setup AWS configuration, note: using AWS SDK V2 not V3
AWS.config.update({
  accessKeyId: process.env.DB_AWS_ACCESS_KEY,
  secretAccessKey: process.env.DB_AWS_SECRET_KEY,
  region: process.env.DB_AWS_REGION,
});

export default AWS;