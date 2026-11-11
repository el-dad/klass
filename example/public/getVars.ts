import type { ConfigInternals } from '..';

export function getVars(this: ConfigInternals) {
  return async () => {
    return Object.freeze({
      myEnvVar: await this.parseEnv('myEnvVar'),
    });
  };
}
