export interface Config {
  readonly clientId: string;
  readonly guildId: string;
  readonly botToken: string;
  readonly alphaKey: string;
}

export class EnvironmentConfig implements Config {
  public get clientId(): string {
    const clientId = process.env.CLIENTID ?? '';
    if (clientId === '') {
      console.error('Client ID not set, exiting');
      process.exit(1);
    }
    return clientId;
  }

  public get alphaKey(): string {
    const alphaKey = process.env.ALPHAKEY ?? '';
    if (alphaKey === '') {
      console.error('Alpha Vantage API key not set, exiting');
      process.exit(1);
    }
    return alphaKey;
  }

  public get botToken(): string {
    const botToken = process.env.BOT_TOKEN ?? '';
    if (botToken === '') {
      console.error('Bot token not set, exiting');
      process.exit(1);
    }
    return botToken;
  }

  public get guildId(): string {
    const guildId = process.env.GUILDID ?? '';
    if (guildId === '') {
      console.error('Guild ID not set, exiting');
      process.exit(1);
    }
    return guildId;
  }
}
