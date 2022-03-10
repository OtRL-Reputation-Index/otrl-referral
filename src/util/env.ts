const env =
  process.env.NODE_ENV === "development"
    ? {
        NEXTJS_URL: process.env.DEV_NEXTJS_URL as string,
        DB_AWS_ACCESS_KEY: process.env.DEV_DB_AWS_ACCESS_KEY as string,
        DB_AWS_SECRET_KEY: process.env.DEV_DB_AWS_SECRET_KEY as string,
        DB_AWS_REGION: process.env.DEV_DB_AWS_REGION as string,
      }
    : {
        NEXTJS_URL: process.env.PROD_NEXTJS_URL as string,
        DB_AWS_ACCESS_KEY: process.env.PROD_DB_AWS_ACCESS_KEY as string,
        DB_AWS_SECRET_KEY: process.env.PROD_DB_AWS_SECRET_KEY as string,
        DB_AWS_REGION: process.env.PROD_DB_AWS_REGION as string,
      };

export default env;
