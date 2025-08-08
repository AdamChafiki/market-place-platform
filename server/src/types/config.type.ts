interface Config {
  port: number;
  nodeEnv: string;
  databaseUrl: string;
  authSecret: string;
  authSecretExpiresIn: number;
  authRefreshSecret: string;
  authRefreshSecretExpiresIn: number;
  clientUrl: string;
  cloudinaryCloudName: string;
  cloudinaryApiKey: string;
  cloudinaryApiSecret: string;
}

export default Config;
