import React from 'react';
import { Image, ListView, Text, View, ScrollView } from 'react-native';
import { Map as ImmutableMap } from 'immutable';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import moment from 'moment';

import { postCoupon } from '../../../redux/actions/user';

import styles from './style';
import Button from '../../../components/core/Button';
import common from '../../../style/common';

class Promotions extends React.Component {
  renderCoupons = (rowData) => {
    const expiration = moment(rowData.get('expirationDate')).fromNow();
    return (
      <View style={styles.columnTouchable}>
        <View style={[styles.rowContainer, common.shadow]}>
          <Image style={styles.thumb} source={{ uri: rowData.get('image') }} />
          <View style={[styles.bodyView, common.semiBorder, common.shadow]}>
            <Text>
              <Text style={styles.couponTitle}>{rowData.get('coupon')}</Text>
            </Text>
            <Text style={styles.expirationDate}>Vence {expiration}.</Text>
            <Button
              ownStyle="submit"
              text="Obtener Cupón"
              onPress={() => this.props.postCoupon({ idPlace: this.props.idPlace, idCoupon: rowData.get('id')})}
            />
          </View>
        </View>
      </View>
    );
  }

  renderPromotions = (rowData) => {
    const expiration = moment(rowData.get('expirationDate')).fromNow();
    return (
      <View style={styles.columnTouchable}>
        <View style={[styles.rowContainer, common.shadow]}>
          <Image style={styles.thumb} source={{ uri: rowData.get('promotion') }} />
          <View style={[styles.bodyView, common.semiBorder, common.shadow]}>
            <Text style={styles.couponTitle} numberOfLines={2}>
              {rowData.get('description')}
            </Text>
            <Text style={styles.expirationDate}>Vence {expiration}.</Text>
          </View>
        </View>
      </View>
    );
  }

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
          dataSource={ds.cloneWithRows(this.props.coupons.toArray())}
          renderRow={this.renderCoupons}
          enableEmptySections
        />
        <ListView
          horizontal
          dataSource={ds.cloneWithRows(this.props.data.toArray())}
          renderRow={this.renderPromotions}
          enableEmptySections
        />
      </ScrollView>
    );
  }
}

Promotions.defaultProps = {
  data: ImmutableMap({}),
  coupons: ImmutableMap({}),
};

Promotions.propTypes = {
  data: ImmutablePropTypes.map,
  coupons: ImmutablePropTypes.map,
  idPlace: PropTypes.number.isRequired,
  postCoupon: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  postCoupon,
};

export default connect(undefined, mapDispatchToProps)(Promotions);
