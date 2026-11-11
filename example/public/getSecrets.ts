import type { ConfigInternals } from '..';

export function getSecrets(this: ConfigInternals) {
  return async () => {
    return {
      mySecret: await this.parseEnv('mySecret'),
    };
  };
}
