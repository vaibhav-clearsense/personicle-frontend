
import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';
import { Button, Header } from 'semantic-ui-react';
import config from './config';
import GoogleButton from 'react-google-button'
const Home = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const googleAuthorizeRoute = "https://dev-01936861.okta.com/oauth2/v1/authorize?idp="+config.idps.googleId+'&client_id='+config.oidc.clientId+'&response_type=code%20token%20id_token&response_mode=fragment&scope=openid%20email%20profile&redirect_uri='+config.oidc.redirectUri+'&state='+config.idps.state+'&nonce='+config.idps.nonce;
  
  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      }).catch((err) => {
        console.error(err);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  const login = async () => {
    oktaAuth.signInWithRedirect({ originalUri: '/' });
  };

  if (!authState) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div id="home">
      <div>
        <Header as="h1">The Personicle</Header>

        { authState.isAuthenticated && !userInfo
        && <div>Loading user information...</div>}

        {authState.isAuthenticated && userInfo
        && (
        <div>
          <p id="welcome">
            Welcome to the super awesome personicle, &nbsp;
            {userInfo.name}
            !
          </p>
          <p>
          The Personicle is a person centric healthcare data platform that registers Individual events of lifestyle, health, social, environmental, and other related events to provide highly personalized & preventive health insights in real time.
            <br/><br/>
            Click 
            {' '}
            <a href="/connections"> here</a>
            {' '}
            to test your connections.
          </p>
         
        </div>
        )}

        {!authState.isAuthenticated
        && (
        <div>
          <p>Hello, welcome to Personicle. Please login to access personicle!</p>
          <p>
          The Personicle is a person centric healthcare data platform that registers individual events of lifestyle, health, social, environmental, and other related events to provide highly personalized & preventive health insights in real time.
          </p>
          <Button id="login-button" primary onClick={login}>Login</Button>
          {/* <GoogleButton
                  onClick={() => { window.open(googleAuthorizeRoute,'_self')}}
              /> */}
        </div>
        )}

      </div>
    </div>
  );
};
export default Home;
