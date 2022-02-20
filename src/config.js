
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
    messagesUrl: 'http://localhost:8000/api/messages',
  },
  idps: {

    googleId: GOOGLE_ID,

    state:'thisissomestate',

    nonce:'thisissomerandomstring',
   
    // redirect_uri: 'http%3A%2F%2Flocalhost%3A3000%2F'

},
  app: {
    basename: BASENAME,
  },
};
