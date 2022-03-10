import * as AWS from "aws-sdk";

import env from "@/util/env";

// setup AWS configuration, note: using AWS SDK V2 not V3
AWS.config.update({
  accessKeyId: env.DB_AWS_ACCESS_KEY,
  secretAccessKey: env.DB_AWS_SECRET_KEY,
  region: env.DB_AWS_REGION,
});

export default AWS;
