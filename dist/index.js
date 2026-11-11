/* eslint-disable @typescript-eslint/no-explicit-any */
export function makeKlass(factory, privateMethods, methods, postInit) {
    const initFn = (...args) => {
        const privateInstance = factory(...args);
        for (const method in privateMethods) {
            privateInstance[method] = privateMethods[method].bind(privateInstance)();
        }
        const publicInterface = {};
        for (const method in methods) {
            const boundMethod = methods[method].bind(privateInstance)();
            publicInterface[method] = boundMethod;
            privateInstance[method] = boundMethod;
        }
        postInit?.(privateInstance);
        return Object.freeze(publicInterface);
    };
    return initFn;
}
