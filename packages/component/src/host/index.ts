import { getHost } from "@xc/hiya-host";

export const {replaceAutoHost,replaceAutoHostStyle} = getHost({
    host:  globalThis.location?.host,
    env:"prod"
})
