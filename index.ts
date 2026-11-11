/* eslint-disable @typescript-eslint/no-explicit-any */
export function makeKlass<
  TArgs extends unknown[],
  TPrivateFields extends Record<string, unknown>,
  TPrivateMethods extends Record<string, () => (...args: any[]) => any>,
  TPublicMethods extends Record<string, () => (...args: any[]) => any>,
>(
  factory: (...args: TArgs) => TPrivateFields,
  privateMethods: TPrivateMethods,
  methods: TPublicMethods,
  postInit?: (
    instance: {
      [Method in keyof TPublicMethods]: ReturnType<TPublicMethods[Method]>;
    } & {
      [Method in keyof TPrivateMethods]: ReturnType<TPrivateMethods[Method]>;
    } & TPrivateFields,
  ) => void,
) {
  const initFn = (...args: TArgs) => {
    const privateInstance = factory(...args) as any;

    for (const method in privateMethods) {
      privateInstance[method] = privateMethods[method].bind(privateInstance)();
    }

    const publicInterface = {} as {
      [Method in keyof TPublicMethods]: ReturnType<TPublicMethods[Method]>;
    };

    for (const method in methods) {
      const boundMethod = methods[method].bind(privateInstance)() as any;
      publicInterface[method] = boundMethod;
      privateInstance[method] = boundMethod;
    }

    postInit?.(privateInstance);

    return Object.freeze(publicInterface);
  };

  return initFn;
}
