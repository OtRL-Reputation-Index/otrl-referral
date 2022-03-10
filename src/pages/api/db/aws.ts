import * as AWS from "aws-sdk";

// setup AWS configuration, note: using AWS SDK V2 not V3
AWS.config.update({
  accessKeyId: "AKIAQCL3A7PMSI4BS5IF",
  secretAccessKey: "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",
  region: "us-east-1",
});

export default AWS;
