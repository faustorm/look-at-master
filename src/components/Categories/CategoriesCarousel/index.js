import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { ListView, View, ScrollView } from 'react-native';

import CategoryCard from '../CategoryCard';
import common from '../../../style/common';

const CategoriesCarousel = (props) => {
  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  return (
    <View style={common.sectionView}>
      <ScrollView
        style={common.rowContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <ListView
          dataSource={ds.cloneWithRows(props.categories.toArray())}
          scrollEnabled={false}
          horizontal
          enableEmptySections
          renderRow={(rowData) => <CategoryCard category={rowData} onSelect={props.onSelect} />}
        />
      </ScrollView>
    </View>
  );
};

CategoriesCarousel.propTypes = {
  categories: ImmutablePropTypes.map.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default CategoriesCarousel;
