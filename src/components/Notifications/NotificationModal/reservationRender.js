import React, { Component } from 'react';
import { View, Linking, Alert } from 'react-native';
import moment from 'moment';
import { Map as ImmutableMap } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';

import TextIconSection from '../../core/TextIconSection';
import ImageCrumbSection from '../../core/ImageCrumbSection';
import ListItemButton from '../../core/ListItemButton';
import statusImages from '../../../img/order';

class ReservationRender extends Component {
  decideStatus(status) {
    let img = '';
    let text = '';
    switch (status) {
      case 1:
        text = 'El restaurante aún no confirma tu reservación';
        img = statusImages.callingImage;
        break;
      case 2:
        text = 'Tu mesa ya esta reservada';
        img = statusImages.reservatedImage;
        break;
      case 4:
        text = 'Ya ocurrio la reservación';
        img = statusImages.passedImage;
        break;
      case 5:
        text = 'No te presentaste a la reservación';
        img = statusImages.notGoingImage;
        break;
      default:
        text = 'El restaurante no pudo llevar a cabo tu reservación';
        img = statusImages.notProccessImage;
        break;
    }

    return (<ImageCrumbSection title={text} img={img} />);
  }


  goToMap = (address) => {
    const url = `https://maps.google.com/maps?q=${address.get('lat')},${address.get('lng')}`;
    Linking.canOpenURL(url).then((supported) => {
      if (!supported) {
        Alert.alert('Error', 'Lo sentimos, ocurrió un error. Favor de intentar de nuevo más tarde', [{ text: 'OK' }]);
      }

      return Linking.openURL(url);
    }).catch(() => Alert.alert('Error', 'Lo sentimos, ocurrió un error. Favor de intentar de nuevo más tarde', [{ text: 'OK' }]));
  }

  render() {
    const { reservation } = this.props;
    const address = reservation.get('address');
    const reservationTime = moment(reservation.get('reservationTime')).format('dddd, MMMM DD');
    return (
      <View>
        {this.decideStatus(reservation.get('status'))}
        {this.props.children}
        <TextIconSection text={`El día ${reservationTime}`} icon="date-range" />
        <TextIconSection text={`Para ${reservation.get('quantity')} personas`} icon="group" />
        <TextIconSection text={`A las ${reservation.get('hour')}`} icon="access-time" />
        {reservation.get('comments') !== ' ' && <TextIconSection text={`${reservation.get('comments')}`} icon="chat-bubble" /> }
        {address && <ListItemButton
          title={address.get('address')}
          onPress={() => this.goToMap(address)}
          icon="navigation"
        />}
      </View>
    );
  }
}

ReservationRender.defaultProps = {
  reservation: ImmutableMap(),
};

ReservationRender.propTypes = {
  reservation: ImmutablePropTypes.map,
  children: PropTypes.element.isRequired,
};

export default ReservationRender;
