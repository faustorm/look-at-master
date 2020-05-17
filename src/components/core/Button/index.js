import React from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './style';

const Button = (props) => (
  <TouchableOpacity
    style={[styles.button, styles[props.ownStyle]]}
    onPress={props.onPress}
  >
    <Text style={[styles.buttonText, styles[`${props.ownStyle}Text`]]}>
      {props.text}
    </Text>
  </TouchableOpacity>
);

Button.propTypes = {
  ownStyle: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default Button;
