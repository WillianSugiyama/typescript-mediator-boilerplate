import 'dotenv/config';
import { injectable } from 'inversify';
import { MaybeUndefined } from 'tsdef';
import { castNullableNumber } from './helpers/cast-number';
import { isNullOrUndefined } from './helpers/is-null-or-undefined';

@injectable()
export class Settings {
  public getPort(): number {
    return this.assertAndReturnNumberSetting('PORT');
  }

  public isDev(): boolean {
    return this.isPropertyTrue('ISDEV');
  }

  private assertAndReturnNumberSetting(settingName: string): number {
    const rawSetting = this.returnSetting(settingName);
    const setting = castNullableNumber(rawSetting);

    if (isNullOrUndefined(setting)) {
      const message = `You need to configure the environment variable ${settingName}`;

      console.log(message);

      throw new Error(message);
    }

    return setting;
  }

  private assertAndReturnSetting(settingName: string): string {
    const setting = this.returnSetting(settingName);

    if (setting === undefined) {
      const message = `You need to configure the environment variable ${settingName}`;

      console.log(message);

      throw new Error(message);
    }

    return setting;
  }

  private isPropertyTrue(property: string): boolean {
    return this.assertAndReturnSetting(property) === 'true';
  }

  private returnSetting(settingName: string): MaybeUndefined<string> {
    const setting = process.env[settingName];

    /**
     * This behavior is necessary to ignore empty variables from the set environments plugin in natura jenkins.
     */
    if (setting === 'null') {
      return undefined;
    }

    return setting;
  }
}
