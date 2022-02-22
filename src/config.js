
const CLIENT_ID = process.env.CLIENT_ID || '{clientId}';
const ISSUER = process.env.ISSUER || 'https://{yourOktaDomain}.com/oauth2/default';
const OKTA_TESTING_DISABLEHTTPSCHECK = process.env.OKTA_TESTING_DISABLEHTTPSCHECK || false;
const BASENAME = process.env.PUBLIC_URL || '';
const REDIRECT_URI = `${window.location.origin}${BASENAME}/login/callback`;
const GOOGLE_ID = process.env.GOOGLE_ID
export default {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: REDIRECT_URI,
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
  },
  resourceServer: {
    authenticateEndpoint: 'https://personicle-data-ingestion.azurewebsites.net/authenticate',
    ingestionServer: 'https://personicle-data-ingestion.azurewebsites.net',
    stagingServer: 'https://20.121.8.101:8000/authenticate'
  },
  idps: {
    googleId: GOOGLE_ID,

},
  app: {
    basename: BASENAME,
  },
};
