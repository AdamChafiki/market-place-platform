interface Config {
  port: number;
  nodeEnv: string;
  databaseUrl: string;
  authSecret: string;
  authSecretExpiresIn: string;
  authRefreshSecret: string;
  authRefreshSecretExpiresIn: string;
  clientUrl: string;
}

export default Config;
