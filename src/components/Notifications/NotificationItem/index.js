import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { Text, View, Image, TouchableOpacity } from 'react-native';

import common from '../../../style/common';
import style from './style';

const NotificationItem = (props) => {
  const { notification } = props;
  return (
    <TouchableOpacity
      style={[common.mainCardView, common.innerViewPadding]}
      onPress={props.onPress}
    >
      <View style={style.imageView} >
        <Image
          resizeMode="cover"
          style={style.image}
          source={{ uri: notification.get('Place').get('coverPicture') }}
        />
        <View style={style.imageOverlay} />
      </View>
      <View
        style={[style.bodyView, common.semiBorder, common.shadow]}
      >
        <Text style={style.place}>{notification.get('Place').get('place')}</Text>
        <Text
          style={style.notification}
          numberOfLines={2}
        >
          {notification.get('notification')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

NotificationItem.propTypes = {
  notification: ImmutablePropTypes.map.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default NotificationItem;
