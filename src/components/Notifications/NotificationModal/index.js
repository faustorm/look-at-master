import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Communications from 'react-native-communications';
import { Text, Alert } from 'react-native';

import style from './style';
import Modal from '../../core/Modal';
import ListItemButton from '../../core/ListItemButton';
import OrderRender from './orderRender';
import ReservationRender from './reservationRender';
import common from '../../../style/common';

class NotificationModal extends Component {
  instantCall = (place) => {
    Alert.alert(
      '¿A quien quieres llamar?',
      'Alguien siempre esta para ayudarte en lookat, si necesitas ayuda urgente no dudes en hacernos una llamada, de otra forma puedes comunicarte directamente con el restaurante.',
      [
        { text: 'Llamar a lookat', onPress: () => Communications.phonecall('+52 1 8127317050', true) },
        { text: `Llamar a ${place.get('place')}`, onPress: () => Communications.phonecall(`${place.get('phoneNumber')}`, true) },
        { text: 'Cancelar', style: 'cancel' },
      ],
      { cancelable: false },
    );
  }

  render() {
    const { notification } = this.props;
    const order = this.props.notification.get('order');
    const reservation = this.props.notification.get('reservation');
    const place = notification.get('Place');
    const type = notification.get('type');
    return (
      <Modal
        visible={this.props.visible}
        close={this.props.close}
      >
        <Text style={common.viewTitle}>
          {type === 'order' && 'Tu orden'}
          {type === 'reservation' && 'Tu reservación'}
        </Text>
        <Text style={style.status}>{notification.get('notification')}</Text>
        {notification.get('type') === 'order' &&
          <OrderRender order={order}>
            <ListItemButton
              title="Llamar"
              onPress={() => this.instantCall(place)}
              icon="call"
            />
          </OrderRender>
        }
        {reservation !== undefined && notification.get('type') === 'reservation' &&
          <ReservationRender reservation={reservation}>
            <ListItemButton
              title="Llamar"
              onPress={() => this.instantCall(place)}
              icon="call"
            />
          </ReservationRender>
        }
      </Modal>
    );
  }
}

NotificationModal.defaultProps = {
  visible: false,
};

NotificationModal.propTypes = {
  visible: PropTypes.bool,
  close: PropTypes.func.isRequired,
  notification: ImmutablePropTypes.map.isRequired,
};

export default NotificationModal;
