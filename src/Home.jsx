
import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';
import { Button, Header } from 'semantic-ui-react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal,Container,Col,Row} from 'react-bootstrap';
import config from './config';
import GoogleButton from 'react-google-button'
import HomepageLayout from './HomepageLayout';

const Home = () => {
  const[showModal,setShowModal] = useState(false)
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  const onGoogleSignIn = () => {
    oktaAuth.signInWithRedirect({ 
      clientId: config.oidc.clientId,
      redirectUri: encodeURI(config.oidc.redirectUri),
      responseType: 'code',
      responseMode: 'query',
      codeChallengeMethod: 'S256',
      scopes: ['openid', 'email', 'profile'],
      idp: "0oa3v658b8VCLoy3L5d7",
      pkce:true
    });
  };
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
          <Button variant="primary" onClick={openModal}>
              Login to Explore
          
            </Button>
          {/* <Button id="login-button" primary onClick={login}>Login</Button> */}
          {/* <a href={googleAuthorizeRoute}>Sign in with google</a> */}
          {/* <GoogleButton
                  onClick={() => { window.prompt(googleAuthorizeRoute,'_self')}}
              /> */}
          {/* <GoogleButton
                  onClick={onGoogleSignIn}
              /> */}
            <Modal centered show={showModal} onHide={closeModal} >
              <Modal.Header closeButton>
                <Modal.Title >Sign in</Modal.Title>
              </Modal.Header>

          <Container >

          <Row >
            <Col></Col>
            <Col xs={7}>
              <GoogleButton
                  onClick={onGoogleSignIn}
              />
            </Col>
            <Col></Col>
          </Row>

          <Row>
              <Col></Col>
              <Col xs={5}> <button style={{marginTop:'5px', width:'100%'}} onClick={login}>Sign in with Okta</button> </Col>
              <Col></Col>
          </Row>
         
          </Container>
        </Modal>
        </div>
        )}

      </div>
    </div>
  );
};
export default Home;
