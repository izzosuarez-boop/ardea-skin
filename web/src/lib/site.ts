// Store links: the proxy rewrites every path to /store/*, so links carry no prefix. Inlined at build time.
export const STORE_BASE = process.env.NEXT_PUBLIC_STORE_BASE ?? "";
export const storeHref = (path: string) => `${STORE_BASE}${path === "/" && STORE_BASE ? "" : path}` || "/";
