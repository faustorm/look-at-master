import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import common from '../../../style/common';
import styles from './style';
import colors from '../../../constants/colors';

const TextSection = (props) => (
  <View style={[common.innerViewPadding, styles.fieldView]}>
    <Icon.Button
      flex={2}
      size={15}
      name={props.icon}
      backgroundColor={colors.transparent}
      color={props.color}
    />
    <Text style={styles.text}>
      {props.text}
    </Text>
  </View>
);

TextSection.defaultProps = {
  color: colors.regularText,
  text: '',
};

TextSection.propTypes = {
  icon: PropTypes.string.isRequired,
  text: PropTypes.string,
  color: PropTypes.string,
};

export default TextSection;
