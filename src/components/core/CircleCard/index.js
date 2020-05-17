import React from 'react';
import { Image, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './style';

const CircleCard = (props) => (
  <TouchableOpacity style={styles.columnTouchable} onPress={props.onPress}>
    <Image style={styles.thumbImg} resizeMode="contain" source={{ uri: props.img }} />
    <Text numberOfLines={1} style={styles.thumbTitle}>{props.title}</Text>
  </TouchableOpacity>
);

CircleCard.defaultProps = {
  onPress: undefined,
  title: undefined,
};

CircleCard.propTypes = {
  onPress: PropTypes.func,
  img: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default CircleCard;

