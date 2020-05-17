import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, View } from 'react-native';

import colors from '../../../constants/colors';
import common from '../../../style/common';
import styles from './style';

const MainInput = (props) => (
  <View style={[common.sectionView, styles.view]}>
    <TextInput
      style={styles.input}
      placeholder={props.placeholder}
      underlineColorAndroid={colors.transparent}
      onChangeText={props.onChange}
      keyboardType={props.keyboard}
      returnKeyType={props.returnButton}
    />
  </View>
);


MainInput.defaultProps = {
  placeholder: undefined,
  keyboard: 'default',
  returnButton: 'search',
};

MainInput.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  keyboard: PropTypes.string,
  returnButton: PropTypes.string,
};

export default MainInput;
