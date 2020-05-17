import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { setFavorite, removeFavorite } from '../../../redux/actions/places';
import { getIsFavorite } from '../../../redux/selectors/places';
import common from '../../../style/common';
import style from './style';

const PlaceItem = (props) => {
  const { place } = props;
  const distance = place.get('distance');
  return (
    <TouchableOpacity
      style={style.mainCardView}
    >
      <View style={[style.bodyView, common.semiBorder]}>
        <View style={{ flex: 1 }}>
          <View style={[common.betweenHorizontalSpace]}>
            <Text style={style.placeTitle}>{place.get('place')}</Text>
            <Image style={style.categoryImg} resizeMode="contain" source={{ uri: place.get('categoryIcon') }} />
          </View>
          <View style={[common.betweenHorizontalSpace]}>
            <Text
              style={style.placeBranch}
            >
              {place.get('branch')}
            </Text>
            <Text
              style={style.placeBranch}
            >
              {`${distance.toFixed(2)} KM`}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

PlaceItem.propTypes = {
  place: ImmutablePropTypes.map.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  isFavorited: getIsFavorite(state, ownProps.place.get(ownProps.placeKey)),
});

const mapDispatchToProps = {
  setFavorite,
  removeFavorite,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceItem);
