import React from 'react';
import { View, Platform, Text, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import common from '../../../style/common';
import styles from './style';

const AddressCard = (props) => {
  const initialRegion = {
    longitude: props.address.get('lng'),
    latitude: props.address.get('lat'),
    latitudeDelta: 0.045,
    longitudeDelta: 0.02,
  };
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[common.mainCardView, styles.viewPadding]}
    >
      <View style={{ height: 100 }}>
        <MapView
          scrollEnabled={false}
          style={{ flex: 1 }}
          cacheEnabled={Platform.OS === 'android' ? true : false}
          initialRegion={initialRegion}
        />
      </View>
      <View
        style={[styles.bodyView, common.semiBorder, common.shadow]}
      >
        <Text style={styles.name}>{props.address.get('name')}</Text>
        <Text
          style={styles.address}
          numberOfLines={2}
        >
          {props.address.get('address')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

AddressCard.defaultProps = {
  onPress: undefined,
};

AddressCard.propTypes = {
  onPress: PropTypes.func,
  address: ImmutablePropTypes.map.isRequired,
};

export default AddressCard;
