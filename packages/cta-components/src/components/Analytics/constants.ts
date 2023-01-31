import { getEnv } from "../../lib/getEnv"

export const GOOGLE_ANALYTICS_PROPERTY_ID = getEnv('GOOGLE_ANALYTICS_ID');
const GOOGLE_TAG_MANAGER_URL = new globalThis.URL(`https://www.googletagmanager.com/gtag/js`)

export const getTagManagerUrl = (gaId: string): URL => {
    const url = new globalThis.URL(GOOGLE_TAG_MANAGER_URL);
    url.searchParams.set('id', gaId);
    return url;
}
