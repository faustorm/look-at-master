import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './style';

const Tabs = (props) => (
  <View
    style={styles.tabs}
    onPress={props.onPress}
  >
    {props.options.map((option) => (
      <TouchableOpacity
        onPress={() => props.onPress(option.value)}
        key={option.value}
        style={styles.tab}
      >
        <Text style={styles.tabText}>{option.label.toUpperCase()}</Text>
        {option.value === props.activeTab && <View style={styles.activeTab} />}
      </TouchableOpacity>
    ))}
  </View>
);

Tabs.propTypes = {
  options: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.func.isRequired,
    map: PropTypes.func.isRequired,
  }).isRequired,
  activeTab: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default Tabs;
