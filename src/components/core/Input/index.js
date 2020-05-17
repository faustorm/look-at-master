import React from 'react';
import {
  View,
  Text,
  TextInput,
} from 'react-native';
import PropTypes from 'prop-types';

import colors from '../../../constants/colors';
import styles from './style';

const Input = (props) => (
  <View style={styles.inputView}>
    <Text style={styles.title}>{props.title}</Text>
    <TextInput
      secureTextEntry={props.password}
      style={styles.input}
      placeholder={props.placeholder}
      underlineColorAndroid={colors.transparent}
      onChange={props.onChange}
      onChangeText={props.onChange}
      keyboardType={props.keyboard}
      returnKeyType={props.returnButton}
    />
  </View>
);

Input.defaultProps = {
  password: false,
  keyboard: 'default',
  returnButton: 'done',
  placeholder: '',
};

Input.propTypes = {
  password: PropTypes.bool,
  keyboard: PropTypes.string,
  returnButton: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Input;
