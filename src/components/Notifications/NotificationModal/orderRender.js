import React, { Component } from 'react';
import { View, ListView, Text } from 'react-native';
import { Map as ImmutableMap, fromJS } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';

import statusImages from '../../../img/order';
import TextIconSection from '../../core/TextIconSection';
import ImageCrumbSection from '../../core/ImageCrumbSection';
import ProductReview from '../../Order/ProductReview';
import style from './style';

class OrderRender extends Component {
  decideStatus(status) {
    let img;
    let text = '';
    switch (status) {
      case 1:
        text = 'Tu orden aún no ha sido confirmada';
        img = statusImages.callingImage;
        break;
      case 2:
        text = 'Tu orden ya fue confirmada';
        img = statusImages.confirmedImage;
        break;
      case 4:
        text = 'Tu orden ya fue entregada';
        img = statusImages.deliveredImage;
        break;
      default:
        text = 'El restaurante no pudo llevar a cabo tu orden';
        img = statusImages.sadImage;
        break;
    }

    return (<ImageCrumbSection title={text} img={img} />);
  }

  decideExchange(idCard, exchange) {
    if (idCard !== null) {
      return (
        <TextIconSection text="Se pagara a través de la plataforma, no necesitaras efectivo." icon="credit-card" />
      );
    }

    return (
      <TextIconSection
        text={`El restaurante contara con cambio de $${exchange} MXN.`}
        icon="attach-money"
      />
    );
  }

  renderTime(type, time, hour) {
    if (type === 'homeDelivery') {
      return (
        <TextIconSection
          text={`La comida se entregara en aproximadamente ${time}`}
          icon="hourglass-empty"
        />
      );
    }

    return (
      <TextIconSection text={`Podras pasar por ella a las ${hour}`} icon="shopping-basket" />
    );
  }

  renderOption(rowData) {
    const productRender = {
      product: rowData.get('Product').get('product'),
      quantity: rowData.get('quantity'),
      amount: rowData.get('amount'),
    };

    return (
      <ProductReview
        product={fromJS(productRender)}
      />
    );
  }

  renderDetailList = (products) => {
    const ds =
      new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <View>
        <Text style={style.productSection}>Detalles</Text>
        <ListView
          horizontal={false}
          dataSource={ds.cloneWithRows(products.toArray())}
          renderRow={this.renderOption}
          enableEmptySections
        />
      </View>
    );
  }

  render() {
    const { order } = this.props;
    const type = order.get('type');
    return (
      <View>
        {this.decideStatus(order.get('status'))}
        {this.props.children}
        {this.decideExchange(order.get('idCard'), order.get('exchange'))}
        {this.renderTime(type, order.get('time'), order.get('hour'))}
        {type === 'homeDelivery' && order.hasIn(['Address', 'address']) &&
          <TextIconSection text={order.get('Address', ImmutableMap({})).get('address', '')} icon="pin-drop" />
        }
        {order.get('promoted') === 1 &&
          <TextIconSection text={`La orden tiene un descuento de ${order.get('discountDescription')}`} icon="card-giftcard" />
        }
        {order.get('reply') !== null &&
          <TextIconSection text={order.get('reply')} icon="announcement" />
        }
        {order.has('products') && order.get('products').size > 0 && this.renderDetailList(order.get('products', ImmutableMap({})))}
      </View>
    );
  }
}

OrderRender.defaultProps = {
  order: ImmutableMap({ products: ImmutableMap({ }) }),
  children: null,
};

OrderRender.propTypes = {
  order: ImmutablePropTypes.map,
  children: PropTypes.element,
};

export default OrderRender;
