// Defines a minimal `process` before any module that reads process.env is
// evaluated. Next replaces NEXT_PUBLIC_* reads at build time; a plain browser
// bundle does not, so src/lib/constants.ts would throw ReferenceError at module
// init and take the whole bundle (and every preview) down with it.
// Imported first by shims/constants.ts — ES module bodies run in import order.
declare const globalThis: {
  process?: { env: Record<string, string | undefined> };
};
if (typeof globalThis.process === "undefined") globalThis.process = { env: {} };
export {};
