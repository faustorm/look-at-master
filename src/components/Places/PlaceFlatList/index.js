import React, { Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { ListView, View, LayoutAnimation } from 'react-native';

import PlaceItem from '../PlaceItem';
import SectionHeader from '../../core/SectionHeader';
import common from '../../../style/common';

class PlaceFlatList extends Component {
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
        <ListView
          dataSource={ds.cloneWithRows(this.props.dataSource.toArray())}
          renderRow={(rowData) => <PlaceItem place={rowData} placeKey="idPlace" />}
        />
      </View>
    );
  }
}

PlaceFlatList.defaultProps = {
  title: undefined,
};

PlaceFlatList.propTypes = {
  dataSource: ImmutablePropTypes.map.isRequired,
  title: PropTypes.string,
};

export default PlaceFlatList;
