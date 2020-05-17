import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

import { submitCard } from '../../../redux/actions/user';
import { closeAddCardModal } from '../../../redux/actions/session';

import Button from '../../core/Button';
import Modal from '../../core/Modal';
import common from '../../../style/common';
import Input from '../../core/Input';
import Picker from '../../core/Picker';

class AddCard extends Component {
  static defaultProps = {
    visible: false,
  };

  static propTypes = {
    visible: PropTypes.bool,
    submitCard: PropTypes.func.isRequired,
    closeAddCardModal: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit;
    this.state = {
      card: {
        cardNumber: undefined,
        name: undefined,
        expYear: null,
        expMonth: null,
        cvc: undefined,
      },
      isVisibleMonths: false,
      isVisibleYears: false,
    };
  }

  onSubmit = () => {
    const { card } = this.state;
    this.props.submitCard(card);
  }

  showModalMonth = (visible) => {
    this.setState({ isVisibleMonths: visible });
  }

  showModalYears = (visible) => {
    this.setState({ isVisibleYears: visible });
  }

  changeStatus = (position, text) => {
    const { card } = this.state;
    this.setState({ card: { ...card, [position]: text } });
  };

  render() {
    const { card } = this.state;
    return (
      <Modal
        visible={this.props.visible}
        close={this.props.closeAddCardModal}
      >
        <Text style={common.viewTitle}>
          Agrega tu tarjeta
        </Text>
        <View>
          <Input
            title="Número de Tarjeta"
            keyboard="numeric"
            placeholder="48XXXXXXXXXXXX98"
            onChange={(text) => this.changeStatus('cardNumber', text)}
          />
          <Input
            title="Nombre del Tarjetahabiente"
            placeholder="Alfonso de los Ríos"
            onChange={(text) => this.changeStatus('name', text)}
          />
          <Input
            title="CVC (Código Secreto)"
            keyboard="numeric"
            placeholder="123"
            onChange={(text) => this.changeStatus('cvc', text)}
          />
          <Picker
            toggleModal={this.showModalMonth}
            value={card.expMonth}
            onChange={(text) => this.changeStatus('expMonth', text)}
            placeholder="Mes de vencimiento"
            visible={this.state.isVisibleMonths}
            options={[
              { value: '01', text: '01 - Enero' },
              { value: '02', text: '02 - Febrero' },
              { value: '03', text: '03 - Marzo' },
              { value: '04', text: '04 - Abril' },
              { value: '05', text: '05 - Mayo' },
              { value: '06', text: '06 - Junio' },
              { value: '07', text: '07 - Julio' },
              { value: '08', text: '08 - Agosto' },
              { value: '09', text: '09 - Septiembre' },
              { value: '10', text: '10 - Octubre' },
              { value: '11', text: '11 - Noviembre' },
              { value: '12', text: '12 - Diciembre' },
            ]}
          />
          <Picker
            toggleModal={this.showModalYears}
            value={card.expYear}
            onChange={(text) => this.changeStatus('expYear', text)}
            placeholder="Año de vencimiento"
            visible={this.state.isVisibleYears}
            options={[
              { value: '2017' },
              { value: '2018' },
              { value: '2019' },
              { value: '2020' },
              { value: '2021' },
              { value: '2022' },
              { value: '2023' },
              { value: '2024' },
            ]}
          />
          <Button
            ownStyle="submit"
            text="Guardar Tarjeta"
            onPress={this.onSubmit}
          />
        </View>
      </Modal>
    );
  }
}

const mapDispatchToProps = {
  submitCard,
  closeAddCardModal,
};

export default connect(undefined, mapDispatchToProps)(AddCard);
