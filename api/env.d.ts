
  // types for your environmental variables
  declare namespace NodeJS {
    export interface ProcessEnv {
      DATABASE_URL : string;
			NODE_ENV : string;
			DATABASE_USER : string;
			DATABASE_PASSWORD : string;
			DATABASE_HOST : string;
			DATABASE_NAME : string;
			DATABASE_PORT : string;
			REDIS_HOST : string;
			PORT : string;
			JWT_TOKEN_SECRETE : string;

    }
  }
  