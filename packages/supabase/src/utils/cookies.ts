import type { CookieOptionsWithName } from "@supabase/ssr";
import { DEFAULT_COOKIE_OPTIONS } from "@supabase/ssr";

export const COOKIE_NAME = "appname:session";

export const COOKIE_OPTIONS: CookieOptionsWithName = {
  ...DEFAULT_COOKIE_OPTIONS,
  name: COOKIE_NAME,
  domain: process.env.COOKIE_DOMAIN ?? ".localhost", // Default to .localhost if no domain is set
};
