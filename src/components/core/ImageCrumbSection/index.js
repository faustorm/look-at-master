import React from 'react';
import { Image, View, Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './style';

const ImageCrumbSection = (props) => (
  <View style={styles.columnTouchable}>
    <Image style={styles.thumbImg} resizeMode="contain" source={props.img} />
    <Text numberOfLines={1} style={styles.thumbTitle}>{props.title}</Text>
  </View>
);

ImageCrumbSection.defaultProps = {
  title: undefined,
};

ImageCrumbSection.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default ImageCrumbSection;

