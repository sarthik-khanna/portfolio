// X/Twitter uses the same card as Open Graph. `runtime` has to be declared
// here directly; Next doesn't pick up re-exported segment config.
export const runtime = "edge";
export { default, alt, size, contentType } from "./opengraph-image";
