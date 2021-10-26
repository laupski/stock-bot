export interface Config {
  readonly clientId: string;
  readonly guildId: string;
  readonly botToken: string;
  readonly alphaKey: string;
}

export class EnvironmentConfig implements Config {
  public get clientId(): string {
    if (process.env.CLIENTID === '') {
      console.error('Client ID not set, exiting');
      process.exit(1);
    }
    return process.env.CLIENTID;
  }

  public get alphaKey(): string {
    if (process.env.ALPHAKEY === '') {
      console.error('Alpha Vantage API key not set, exiting');
      process.exit(1);
    }
    return process.env.ALPHAKEY;
  }

  public get botToken(): string {
    if (process.env.BOT_TOKEN === '') {
      console.error('Bot token not set, exiting');
      process.exit(1);
    }
    return process.env.BOT_TOKEN;
  }

  public get guildId(): string {
    if (process.env.GUILDID === '') {
      console.error('Guild ID not set, exiting');
      process.exit(1);
    }
    return process.env.GUILDID;
  }
}
