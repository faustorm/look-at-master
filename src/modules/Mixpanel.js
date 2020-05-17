import Mixpanel from 'react-native-mixpanel';
import { Platform, AsyncStorage } from 'react-native';

import keys from '../constants/keys';
import api, { key } from '../api';

Mixpanel.sharedInstanceWithToken(keys.mixpanel);

export const trackEvent = (event) => {
  Mixpanel.track(event);
};

export const initMixpanel = (token) => {
  Mixpanel.getDistinctId((id) => {
    Mixpanel.identify(id);
    if (Platform.OS === 'android') {
      Mixpanel.initPushHandling('129249118730');
    }
  });
  if (Platform.OS === 'ios') {
    Mixpanel.addPushDeviceToken(token);
  } else {
    Mixpanel.setPushRegistrationId(token);
  }
  Mixpanel.set({
    $last_login: new Date().toISOString(),
  });
};

export const verifyMixpanel = () => {
  AsyncStorage.getItem('Mixpanel').then((subscribed) => {
    if (!subscribed) {
      AsyncStorage.getItem(key).then((checkSession) => {
        const accessToken = JSON.parse(checkSession).token;
        api.user.userInfo(accessToken)
          .then((response) => response.json())
          .then((rjson) => {
            Mixpanel.setOnce({
              $email: rjson.data[0].email,
              $first_name: rjson.data[0].name,
              $created: new Date().toISOString(),
            });
            AsyncStorage.setItem('@Mixpanel', 'true');
          });
      });
    }
  });
};
