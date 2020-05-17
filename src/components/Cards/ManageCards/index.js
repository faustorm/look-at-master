import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, Text, Alert } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';

import { getCardsData } from '../../../redux/selectors/user';
import { closeCreditCards, closeMenuOpenAddCard } from '../../../redux/actions/session';
import { deleteCard } from '../../../redux/actions/user';

import Modal from '../../core/Modal';
import ListItemButton from '../../core/ListItemButton';
import common from '../../../style/common';

class ManageCards extends Component {
  deleteAlert = (rowData) => {
    Alert.alert(
      '¿Deseas eliminar esta tarjeta?',
      'Al eliminarla, no podra ser usada de manera permanente dentro de la plataforma',
      [
        { text: 'Eliminar', onPress: () => this.props.deleteCard(rowData) },
        { text: 'Cancelar', style: 'cancel' },
      ],
    );
  }

  render() {
    const ds =
      new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <Modal
        visible={this.props.visible}
        close={this.props.closeCreditCards}
      >
        <Text style={common.viewTitle}>
          Métodos de pago
        </Text>
        <ListView
          dataSource={ds.cloneWithRows(this.props.cards.toArray())}
          renderRow={(rowData) => (
            <ListItemButton
              title={rowData.get('cardName')}
              icon="credit-card"
              onPress={() => this.deleteAlert(rowData)}
            />
          )}
        />
        <ListItemButton
          title="Añadir Tarjeta"
          onPress={this.props.closeMenuOpenAddCard}
          icon="add"
        />
      </Modal>
    );
  }
}

ManageCards.defaultProps = {
  visible: false,
};

ManageCards.propTypes = {
  cards: ImmutablePropTypes.map.isRequired,
  visible: PropTypes.bool,
  closeCreditCards: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  closeMenuOpenAddCard: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cards: getCardsData(state),
});

const mapDispatchToProps = {
  closeMenuOpenAddCard,
  closeCreditCards,
  deleteCard,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCards);
