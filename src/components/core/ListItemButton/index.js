import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import colors from '../../../constants/colors';
import common from '../../../style/common';
import styles from './style';

const ListItemButton = (props) => (
  <TouchableOpacity
    style={[common.innerViewPadding, styles.fieldView]}
    onPress={props.onPress}
  >
    <Icon.Button
      name={props.icon}
      backgroundColor={colors.transparent}
      color={colors.regularText}
      size={15}
    />
    <Text style={styles.text}>
      {props.title}
    </Text>
  </TouchableOpacity>
);


ListItemButton.defaultProps = {
  title: undefined,
};

ListItemButton.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
};

export default ListItemButton;
