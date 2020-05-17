import React from 'react';
import { ListView, ScrollView } from 'react-native';
import { Map as ImmutableMap } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';

import styles from './style';
import ReviewCard from '../../../components/Reviews/ReviewCard';

class Reviews extends React.Component {
  renderReviews = (rowData) => (
    <ReviewCard review={rowData} />
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
          dataSource={ds.cloneWithRows(this.props.reviews.toArray())}
          renderRow={this.renderReviews}
          enableEmptySections
        />
      </ScrollView>
    );
  }
}

Reviews.defaultProps = {
  reviews: ImmutableMap({}),
};

Reviews.propTypes = {
  reviews: ImmutablePropTypes.map,
};

export default Reviews;
