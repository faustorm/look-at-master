import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import styles from './style';

const ProductReview = (props) => (
  <TouchableOpacity
    onPress={props.onPress}
  >
    <View style={styles.productItem} >
      <View style={styles.motherView}>
        <Text numberOfLines={2}>
          <Text style={styles.productTitle}>
            {props.product.get('product')}
          </Text>
        </Text>
        <Text style={styles.righted}>
          {props.type !== 'fee' &&
            <Text style={styles.productQuantity}>
              {props.product.get('quantity')} X
            </Text>
          }
          <Text style={styles.productPrice}>
            ${props.product.get('amount') / props.product.get('quantity')} MXN
          </Text>
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

ProductReview.defaultProps = {
  onPress: undefined,
  type: 'Product',
};

ProductReview.propTypes = {
  onPress: PropTypes.func,
  product: ImmutablePropTypes.map.isRequired,
  type: PropTypes.string,
}

export default ProductReview;
