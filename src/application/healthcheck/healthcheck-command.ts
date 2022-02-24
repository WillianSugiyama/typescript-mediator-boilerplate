export class HealthcheckCommand {
  public readonly whoami?: string;

  constructor(data: HealthcheckCommand) {
    this.whoami = data.whoami;
  }
}
