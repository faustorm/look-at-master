import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Map as ImmutableMap } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './style';

class ReviewCard extends React.Component {
  renderStars = () => {
    const stars = [];
    for (let i = 0; i < this.props.review.get('rate'); i++) {
      stars.push(<Icon key={i} style={styles.star} size={20} flexDirection="column" name="star" />);
    }
    return stars;
  }

  render() {
    const { review } = this.props;
    return (
      <View style={styles.reviewView} >
        <TouchableOpacity>
          <View style={styles.card}>
            <View >
              <Text>
                <Text style={styles.user}>{review.get('User').get('name')}</Text>
              </Text>
              <Text >{this.renderStars()}</Text>
              <Text style={styles.comment} numberOfLines={3}>
                {review.get('comment')}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

ReviewCard.defaultProps = {
  review: ImmutableMap({}),
};

ReviewCard.propTypes = {
  review: ImmutablePropTypes.map,
};

export default ReviewCard;
