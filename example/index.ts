import { makeKlass } from '../index.ts';
import { parseEnv } from './private/parseEnv.ts';
import { getSecrets } from './public/getSecrets.ts';
import { getVars } from './public/getVars.ts';

const init = () => ({
  someState: 123,
});

const publicMethods = {
  getVars,
  getSecrets,
};

const privateMethods = {
  parseEnv,
};

export const makeConfig = makeKlass(init, privateMethods, publicMethods);

export type ConfigInternals = ReturnType<typeof init> & {
  [PrivateMethod in keyof typeof privateMethods]: ReturnType<
    (typeof privateMethods)[PrivateMethod]
  >;
} & {
  [PublicMethod in keyof typeof publicMethods]: ReturnType<
    (typeof publicMethods)[PublicMethod]
  >;
};
