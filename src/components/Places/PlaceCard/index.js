import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { setFavorite, removeFavorite } from '../../../redux/actions/places';
import { getIsFavorite } from '../../../redux/selectors/places';
import common from '../../../style/common';
import style from './style';
import { navigationPropTypes } from '../../../proptypes';

const PlaceCard = (props) => {
  const { place, isFavorited } = props;
  return (
    <TouchableOpacity
      style={[common.mainCardView, common.innerViewPadding]}
      onPress={() => props.navigation.navigate('place', { id: place.get(props.placeKey) })}
    >
      <View style={style.imageView} >
        <Image
          resizeMode="cover"
          style={style.image}
          source={{ uri: place.get('coverPicture') }}
        />
        <View style={style.imageOverlay}>
          <TouchableOpacity
            style={style.favorite}
            onPress={isFavorited ?
              () => props.removeFavorite({
                place, placeKey: place.get(props.placeKey),
              })
              :
              () => props.setFavorite({
                place,
                placeKey: place.get(props.placeKey),
              })
            }
          >
            <Icon name={isFavorited ? 'favorite' : 'favorite-border'} size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[style.bodyView, common.semiBorder, common.shadow]}
      >
        <Text style={style.placeTitle}>{place.get('place')}</Text>
        <Text
          style={style.placeDescription}
          numberOfLines={2}
        >
          {place.get('description')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

PlaceCard.defaultProps = {
  navigation: undefined,
};

PlaceCard.propTypes = {
  navigation: navigationPropTypes,
  place: ImmutablePropTypes.map.isRequired,
  placeKey: PropTypes.number.isRequired,
  removeFavorite: PropTypes.func.isRequired,
  setFavorite: PropTypes.func.isRequired,
  isFavorited: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  isFavorited: getIsFavorite(state, ownProps.place.get(ownProps.placeKey)),
});

const mapDispatchToProps = {
  setFavorite,
  removeFavorite,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceCard);
