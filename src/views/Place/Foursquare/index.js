import React from 'react';
import { ScrollView, ListView, TouchableHighlight, Image } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map as ImmutableMap } from 'immutable';

import styles from './style';

class FoursquarePhotos extends React.Component {
  renderPhotos = (rowData) => (
    <TouchableHighlight style={styles.columnTouchable}>
      <Image
        style={styles.thumb}
        source={{ uri: `${rowData.get('prefix')}height${rowData.get('height')}${rowData.get('suffix')}` }}
      />
    </TouchableHighlight>
  );

  render() {
    const ds =
      new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.columnContainer}
      >
        <ListView
          horizontal
          dataSource={ds.cloneWithRows(this.props.photos.toArray())}
          renderRow={this.renderPhotos}
          enableEmptySections
        />
      </ScrollView>
    );
  }
}

FoursquarePhotos.defaultProps = {
  photos: ImmutableMap({ }),
};

FoursquarePhotos.propTypes = {
  photos: ImmutablePropTypes.map,
};

export default FoursquarePhotos;
