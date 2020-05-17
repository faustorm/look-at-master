import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import { Button } from '../../../components/core';
import { navigationPropTypes } from '../../../proptypes';

import common from '../../../style/common';

const Facebook = (props) => {
  const { navigation } = props;
  return (
    <View style={common.semiFullWidthCentered}>
      <Button
        ownStyle="facebook"
        text="ENTRA CON FACEBOOK"
        onPress={() => props.requestFacebookLogin({ navigation })}
      />
    </View>
  );
};

Facebook.defaultProps = {
  navigation: null,
};

Facebook.propTypes = {
  navigation: navigationPropTypes,
  requestFacebookLogin: PropTypes.func.isRequired,
};

export default Facebook;

