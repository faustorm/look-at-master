import Pushwoosh from 'pushwoosh-react-native-plugin';
import { Platform, AsyncStorage, Alert, Linking } from 'react-native';

import { initMixpanel, verifyMixpanel } from './Mixpanel';

import keys from '../constants/keys';
import api, { key } from '../api';

Pushwoosh.init(keys.pushWoosh);

export const registerPushwoosh = () => {
  Pushwoosh.register(
    (token) => {
      Pushwoosh.setApplicationIconBadgeNumber(0);
      AsyncStorage.setItem('pushToken', token);
      AsyncStorage.getItem(key).then((checkSession) => {
        if (checkSession) {
          initMixpanel(token);
          verifyMixpanel(checkSession);
          const data = {
            token: JSON.parse(checkSession).token,
            user: {
              pushToken: token,
              device: Platform.OS === 'ios' ? 2 : 1,
              version: '2.0.0',
            },
          };
          api.user.updateUserDeviceInfo(data);
        }
      });
    },
    () => {
      Alert.alert(
        'Error',
        'Revisa tu conexión de Internet y vuelve a intentar',
        [
          { text: 'Configuración', onPress: () => Linking.openURL('app-settings:') },
          { text: 'OK' },
        ],
      );
    },
  );
};

export const registerPushwooshAfterLogin = (loginToken) => {
  Pushwoosh.init(keys.pushWooshKeys);
  Pushwoosh.register((token) => {
    Pushwoosh.setApplicationIconBadgeNumber(0);
    AsyncStorage.setItem('pushToken', token);
    AsyncStorage.getItem(key).then((checkSession) => {
      if (checkSession) {
        initMixpanel(token);
        verifyMixpanel(checkSession);
        const data = {
          token: loginToken,
          user: {
            pushToken: token,
            device: Platform.OS === 'ios' ? 2 : 1,
            version: '2.0.0',
          },
        };
        api.user.updateUserDeviceInfo(data);
      }
    });
  });
};

export default registerPushwoosh;
