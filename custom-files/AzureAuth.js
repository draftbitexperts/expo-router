import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import {
  GlobalVariableContext,
  useSetValue,
} from '../config/GlobalVariableContext';
import {
  exchangeCodeAsync,
  makeRedirectUri,
  useAuthRequest,
  useAutoDiscovery,
} from 'expo-auth-session';
import { Platform } from 'react-native';
import { Touchable } from '@draftbit/ui';

//import JWTdraftbit from "../global-functions/JWTdraftbit"

WebBrowser.maybeCompleteAuthSession();

// Define the JWTDecoderupn function within this file
// function JWTDecoderupn(AUTH_TOKEN, setGlobalVariableValue) {
//   function getUserInfoFromJWT(token) {
//     let parts = token.split('.');
//     if (parts.length !== 3) {
//       throw new Error('Invalid JWT token');
//     }

//     let payloadBase64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
//     switch (payloadBase64.length % 4) {
//       case 2:
//         payloadBase64 += '==';
//         break;
//       case 3:
//         payloadBase64 += '=';
//         break;
//     }

//     const payload = atob(payloadBase64);
//     const payloadObject = JSON.parse(payload);

//     const expirationDate = new Date(payloadObject.exp * 1000); // exp is in seconds, Date expects milliseconds

//     return {
//       email: payloadObject.upn,
//       firstName: payloadObject.given_name,
//       lastName: payloadObject.family_name,
//       expiration: expirationDate,
//     };
//   }

//   try {
//     console.log('JWTDecoderupn function triggered');
//     console.log('AUTH_TOKEN retrieved:', AUTH_TOKEN);

//     const userInfo = getUserInfoFromJWT(AUTH_TOKEN);
//     console.log('User information extracted:', userInfo);

//     // Update the device variables using the helper function
//     setGlobalVariableValue({ key: 'USER_EMAIL', value: userInfo.email });
//     setGlobalVariableValue({ key: 'USER_FIRST', value: userInfo.firstName });
//     setGlobalVariableValue({ key: 'USER_LAST', value: userInfo.lastName });
//     setGlobalVariableValue({ key: 'TOKEN_EXPIRATION', value: userInfo.expiration.toISOString() });

//     console.log('Device variables updated:', userInfo);
//   } catch (error) {
//     console.error('An error occurred:', error);
//   }
//}

// The main App component
export function App({ children, setToken }) {
  const setGlobalVariable = useSetValue(GlobalVariableContext);

  const discovery = {
    authorizationEndpoint:
      'https://Drafbit.b2clogin.com/Drafbit.onmicrosoft.com/B2C_1_email_local/oauth2/v2.0/authorize',
    tokenEndpoint:
      'https://Drafbit.b2clogin.com/Drafbit.onmicrosoft.com/B2C_1_email_local/oauth2/v2.0/token',
  };

  const redirectUri = Platform.select({
    ios: 'msauth.com.mountaincrane.mountainopss://auth',
    android: makeRedirectUri({ path: 'auth' }),
  });

  const clientId = 'dd3af25d-592e-490c-a236-53af182f825c';

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId,
      scopes: ['openid', 'profile', 'email', 'offline_access'],
      redirectUri,
    },
    discovery
  );

  const codeProcessed = React.useRef(false);

  React.useEffect(() => {
    if (codeProcessed.current || !response) return;

    if (response?.type === 'success' && discovery && request) {
      codeProcessed.current = true; // Immediately mark the code as processed
      exchangeCodeAsync(
        {
          clientId,
          code: response.params.code,
          redirectUri,
          extraParams: {
            code_verifier: request.codeVerifier,
          },
        },
        discovery
      )
        .then(res => {
          console.log(JSON.stringify(res));
          if (res.accessToken) {
            // Store access token in both local state and global variable
            setToken(res.accessToken);
            setGlobalVariable({ key: 'AUTH_TOKEN', value: res.accessToken });
            console.log('Access Token retrieved and stored:', res.accessToken);

            // Store refresh token in the global variable
            if (res.refreshToken) {
              // Check if refreshToken exists in the response
              setGlobalVariable({
                key: 'REFRESH_TOKEN',
                value: res.refreshToken,
              });
              console.log(
                'Refresh Token retrieved and stored:',
                res.refreshToken
              );
            } else {
              console.warn('No Refresh Token found in the response.');
            }

            // Call the JWTDecoderupn function with the AUTH_TOKEN and setGlobalVariable
            //  JWTDecoderupn(res.accessToken, setGlobalVariable);
            console.log('next one ');
            // JWTdraftbit(res.accessToken,setGlobalVariable)

            // Update global variable on success
            navigation.navigate('LoadingPostLoginScreen');
            setGlobalVariable({ key: 'LoginPageSuccess3', value: 1 });
            console.log('LoginPageSuccess3 set to 1');
          }
        })
        .catch(error => {
          console.error('Error during token exchange:', error);

          // Stop further attempts on error
          codeProcessed.current = true;

          // Update global variable on failure

          setGlobalVariable({ key: 'LoginPageSuccess3', value: 2 });
          console.log('LoginPageSuccess3 set to 2');
        });
    }
  }, [response, discovery, request, setGlobalVariable]);

  return (
    <Touchable
      disabled={!request || codeProcessed.current} // Disable further attempts if processed
      onPress={() => {
        promptAsync();
      }}
    >
      {children}
    </Touchable>
  );
}
