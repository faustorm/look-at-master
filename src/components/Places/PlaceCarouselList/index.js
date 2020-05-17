import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { ListView, View, ScrollView, LayoutAnimation } from 'react-native';

import PlaceCard from '../PlaceCard';
import SectionHeader from '../../core/SectionHeader';
import common from '../../../style/common';
import styles from './style';
import { navigationPropTypes } from '../../../proptypes';

class PlaceList extends Component {
  componentDidMount() {
    LayoutAnimation.spring();
  }

  componentDidUpdate() {
    LayoutAnimation.spring();
  }

  render() {
    const ds =
      new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <View style={common.sectionView}>
        {this.props.title && <SectionHeader title={this.props.title} />}
        <ScrollView
          style={common.rowContainer}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <ListView
            dataSource={ds.cloneWithRows(this.props.dataSource.toArray())}
            scrollEnabled={false}
            horizontal
            enableEmptySections
            renderRow={(rowData) => (
              <View style={styles.semiFullWidthView}>
                <PlaceCard place={rowData} placeKey="id" navigation={this.props.navigation} />
              </View>
            )}
          />
        </ScrollView>
      </View>
    );
  }
}

PlaceList.defaultProps = {
  title: undefined,
  navigation: undefined,
};

PlaceList.propTypes = {
  navigation: navigationPropTypes,
  dataSource: ImmutablePropTypes.map.isRequired,
  title: PropTypes.string,
};

export default PlaceList;
