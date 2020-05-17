import React from 'react';
import {
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './style';

const TextButton = (props) => (
  <TouchableOpacity
    style={styles.TextButton}
    onPress={props.onPress}
  >
    <Text style={[styles.buttonText, styles[`${props.ownStyle}Text`]]}>
      {props.text}
    </Text>
  </TouchableOpacity>
);

TextButton.propTypes = {
  ownStyle: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default TextButton;
