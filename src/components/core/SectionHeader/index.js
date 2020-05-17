import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

import styles from './style';
import common from '../../../style/common';

const SectionHeader = (props) => (
  <Text
    style={[styles.sectionTitle, common.innerViewPadding]}
  >
    {props.title}
  </Text>
);

SectionHeader.defaultProps = {
  title: '',
};

SectionHeader.propTypes = {
  title: PropTypes.string,
};

export default SectionHeader;
