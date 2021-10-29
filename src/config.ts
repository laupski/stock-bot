export interface Config {
  readonly clientId: string;
  readonly botToken: string;
  readonly alphaKey: string;
}

export class EnvironmentConfig implements Config {
  // eslint-disable-next-line class-methods-use-this
  public get clientId(): string {
    const clientId = process.env.CLIENTID ?? '';
    if (clientId === '') {
      console.error('Client ID not set, exiting');
      process.exit(1);
    }
    return clientId;
  }

  // eslint-disable-next-line class-methods-use-this
  public get alphaKey(): string {
    const alphaKey = process.env.ALPHAKEY ?? '';
    if (alphaKey === '') {
      console.error('Alpha Vantage API key not set, exiting');
      process.exit(1);
    }
    return alphaKey;
  }

  // eslint-disable-next-line class-methods-use-this
  public get botToken(): string {
    const botToken = process.env.BOT_TOKEN ?? '';
    if (botToken === '') {
      console.error('Bot token not set, exiting');
      process.exit(1);
    }
    return botToken;
  }
}
