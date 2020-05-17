import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, Text, Alert } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';

import { getAddressData } from '../../../redux/selectors/user';
import { closeAddressManager, closeAddressMenuOpenAdd } from '../../../redux/actions/session';
import { deleteAddress } from '../../../redux/actions/user';

import AddressCard from '../AddressCard';
import Modal from '../../core/Modal';
import Button from '../../core/Button';
import common from '../../../style/common';

class ManageAddresses extends Component {
  deleteAlert = (rowData) => {
    Alert.alert(
      '¿Deseas eliminar esta dirección?',
      'No podra ser usada para proximos pedidos.',
      [
        { text: 'Eliminar', onPress: () => this.props.deleteAddress(rowData) },
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
        close={this.props.closeAddressManager}
      >
        <Text style={common.viewTitle}>
          Direcciones
        </Text>
        <Button
          ownStyle="submit"
          text="Agregar Dirección"
          onPress={this.props.closeAddressMenuOpenAdd}
        />
        <ListView
          dataSource={ds.cloneWithRows(this.props.addresses.toArray())}
          renderRow={(rowData) => (
            <AddressCard
              address={rowData}
              onPress={() => this.deleteAlert(rowData)}
            />
          )}
        />
      </Modal>
    );
  }
}

ManageAddresses.defaultProps = {
  visible: false,
};

ManageAddresses.propTypes = {
  addresses: ImmutablePropTypes.map.isRequired,
  visible: PropTypes.bool,
  closeAddressManager: PropTypes.func.isRequired,
  deleteAddress: PropTypes.func.isRequired,
  closeAddressMenuOpenAdd: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  addresses: getAddressData(state),
});

const mapDispatchToProps = {
  closeAddressMenuOpenAdd,
  closeAddressManager,
  deleteAddress,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAddresses);
