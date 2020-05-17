import FBSDK from 'react-native-fbsdk';

import api from '../api';

const { AccessToken, LoginManager } = FBSDK;

export const sendFacebookRequest = () => (
  LoginManager.logInWithReadPermissions(['public_profile', 'email']).then((result) => {
    if (result.grantedPermissions.length > 0) {
      return AccessToken.getCurrentAccessToken().then((data) => {
        const dataUser = {
          idtype: 2,
          token: data.accessToken,
        };
        return api.user.login(dataUser)
          .then((response) => response.json())
          .then((rjson) => {
            if (rjson.status === 'notYetCreated') {
              return ({ error: undefined, data: { status: 'notYetCreated', accessToken: data.accessToken } });
            } else if (rjson.status !== 'success') {
              return ({ error: 'Actualmente no cuentas con tu cuenta registrada en lookat.', data: undefined });
            }
            return ({ status: 'success', data: rjson.data, error: undefined });
          })
          .catch((error) => {
            if (error.status === 'notYetCreated') {
              return ({ error: undefined, data: { status: 'notYetCreated', accessToken: data.accessToken } });
            }
            return ({ error: 'Ocurrio un error, favor de intentarlo mas tarde.', data: undefined });
          });
      });
    }
    return ({ error: 'No ha sido posible conectarse con los servidores de Facebook' });
  }).catch((e) => ({ e, error: 'No ha sido posible conectarse con los servidores de Facebook', data: undefined }))
);

export const notYeatCreatedAccount = (accessToken) => (
  fetch(`https://graph.facebook.com/me?fields=id,name,email&&access_token=${accessToken}`, { method: 'GET' })
    .then((response) => response.json())
    .then((responseData) =>
      ({ createdError: undefined, response: { responseData, accessToken } }))
    .catch(() => ({ createdError: 'No ha sido posible conectarse con los servidores de Facebook', response: undefined }))
    .done()
);

export const postUserAndSignUp = ({ responseData, accessToken }) => {
  const data = {
    name: responseData.name,
    idFacebook: responseData.id,
    email: responseData.email,
  };
  return api.user.signUp(data)
    .then((res) => res.json())
    .then((rjson) => {
      if (rjson.status !== 'success') {
        return ({ error: 'Ha ocurrido un error intentando crear tu cuenta' });
      }
      const dataUser = {
        idtype: 2,
        token: accessToken,
      };
      return api.user.login(dataUser)
        .then((res) => res.json())
        .then((jsonr) => {
          if (jsonr.status !== 'success') {
            return ({ error: 'Actualmente no estás registrado en lookat con tu cuenta de Facebook, favor de iniciar sesión con tu correo eléctronico y contraseña.', data: undefined });
          }
          return ({ status: 'success', data: jsonr.data, error: undefined });
        });
    })
    .catch(() => ({ error: 'Ha ocurrido un error intentando iniciar sesión' }));
};
