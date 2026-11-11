import type { ConfigInternals } from '..';

export function parseEnv(this: ConfigInternals) {
  return async (envName: string) => {
    if (!this.someState) {
      throw new Error('someState is invalid');
    }

    return {
      mySecret: await Promise.resolve(`fake-${envName}-value`),
    };
  };
}
