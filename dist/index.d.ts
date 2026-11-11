export declare function makeKlass<TArgs extends unknown[], TPrivateFields extends Record<string, unknown>, TPrivateMethods extends Record<string, () => (...args: any[]) => any>, TPublicMethods extends Record<string, () => (...args: any[]) => any>>(factory: (...args: TArgs) => TPrivateFields, privateMethods: TPrivateMethods, methods: TPublicMethods, postInit?: (instance: {
    [Method in keyof TPublicMethods]: ReturnType<TPublicMethods[Method]>;
} & {
    [Method in keyof TPrivateMethods]: ReturnType<TPrivateMethods[Method]>;
} & TPrivateFields) => void): (...args: TArgs) => Readonly<{ [Method in keyof TPublicMethods]: ReturnType<TPublicMethods[Method]>; }>;
