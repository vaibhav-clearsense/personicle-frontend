
import { useOktaAuth } from '@okta/okta-react';
import React, { useEffect, useState } from 'react';
import { Header, Icon } from 'semantic-ui-react';


const Connections = () => {

  const ingestionServer = "https://20.121.8.101:8000"
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const[authorized,setAuthorized] = useState(false);

  // authenticate resource server with access token
  useEffect(() => {
    if (authState && authState.isAuthenticated) {
      const accessToken = oktaAuth.getAccessToken();
      fetch('https://20.121.8.101:8000/authenticate', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            return Promise.reject();
          }
          return response.json();
        })
        .then((data) => {
          setAuthorized(data.message)
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [authState]);
  

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      }).catch((err) => {
        console.error(err);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  if (!userInfo) {
    return (
      <div>
        <p>Fetching user connections...</p>
      </div>
    );
  }
  const userConnections = [
    {
        'source': 'FitBit',
        'icon': '',
        'redirect': ingestionServer + '/fitbit/connection',
        'return': 'http://localhost:3000/testPage'
        // process.env.AUTH_SERVER + ':' + process.env.AUTH_PORT + process.env.FITBIT_AUTH_ENDPOINT
    },
    {
        'source': 'Oura',
        'icon': '',
        'redirect': '/',
        'return': 'http://localhost:3000/testPage'
    },
    {
        'source': 'GoogleFit',
        'icon': '',
        'redirect': ingestionServer + '/google-fit/connection',
        'return': 'http://localhost:3000/testPage'
    }
]
  
async function authorizationWindow(e, redirectUrl){
    if(authorized){
      console.log("Authorized")
       window.open(redirectUrl);
    } else {
      console.log("Unauthorized")
    }

}


  return (
    <div>
      <Header as="h1">  
        My Connections
      </Header>
      <div>
        {userConnections.map((connection)=>(
          <tr >
          <td><button onClick={(e) => authorizationWindow(e,connection.redirect+"?user_id="+userInfo.sub)}>{connection.source}</button></td>
          </tr>
        ))}
      </div>
      {/* <button onClick={(e) => authorizationWindow(e, "https://20.121.8.101:8000/fitbit/connection?user_id=123343353")}>Connect</button> */}
      {/* <Button></Button> */}
      {/* {messageFetchFailed && <Message error header="Failed to fetch messages.  Please verify the following:" list={possibleErrors} />}
      {!messages && !messageFetchFailed && <p>Fetching Messages..</p>}
      {messages
      && (
      <div>
        <p>
          This component makes a GET request to the resource server example, which must be running at
          <code>localhost:8000/api/messages</code>
        </p>
        <p>
          It attaches your current access token in the
          {' '}
          <code>Authorization</code>
          {' '}
          header on the request,
          and the resource server will attempt to authenticate this access token.
          If the token is valid the server will return a list of messages.  If the token is not valid
          or the resource server is incorrectly configured, you will see a 401
          {' '}
          <code>Unauthorized response</code>
          .
        </p>
        <p>
          This route is protected with the
          {' '}
          <code>&lt;SecureRoute&gt;</code>
          {' '}
          component, which will
          ensure that this page cannot be accessed until you have authenticated and have an access token in local storage.
        </p>
        <Table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => (
              <tr id={message.id} key={message.id}>
                <td>{message.date}</td>
                <td>{message.text}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      )} */}
    </div>
  );
};

export default Connections;
