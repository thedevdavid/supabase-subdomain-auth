const APP_DOMAIN = process.env.NEXT_PUBLIC_APP_DOMAIN; // Ex: app.domain.com. Do not include the protocol scheme (https://) or trailing slash (/)!
const VERCEL_DOMAIN = process.env.NEXT_PUBLIC_VERCEL_URL; // Autoset on Vercel. Does not include the protocol scheme

export const getURL = () => {
  const domain = APP_DOMAIN ?? VERCEL_DOMAIN;
  return domain ? `https://${domain}/` : "http://localhost:3001/"; // Fallback to localhost if no URL is set.
};

export const AUTH_REDIRECT_URL = `${getURL()}dashboard`;
