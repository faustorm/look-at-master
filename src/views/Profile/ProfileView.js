import React, { Component } from 'react';
import { ScrollView, Text, Image, Alert, AsyncStorage } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Communications from 'react-native-communications';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import api from '../../api';

import { getUserProfile, analyzingCardList, analyzingAddresses } from '../../redux/selectors/user';
import { addingCard } from '../../redux/selectors/session';

import { userlogOut } from '../../redux/actions/user';
import { inspectCreditCards, inspectAddresses } from '../../redux/actions/session';
import navigationPropTypes from '../../proptypes/navigation';

import ManageAddresses from '../../components/Addresses/ManageAddresses';
import ListItemButton from '../../components/core/ListItemButton';
import ManageCards from '../../components/Cards/ManageCards';
import AddCard from '../../components/Cards/AddCard';
import AddAddress from '../../components/Addresses/AddAddress';
import { profileGrayIcon, profileRedIcon } from '../../img/tabs';
import colors from '../../constants/colors';
import common from '../../style/common';

class Profile extends Component {
  static navigationOptions = {
    title: 'Perfil',
    tabBarIcon: ({ tintColor }) => (
      <Image
        style={common.tabIcon.profile}
        source={colors.brand === tintColor ? profileRedIcon : profileGrayIcon}
      />
    ),
  }

  static defaultProps = {
    navigation: undefined,
    analyzingCards: false,
    analyzingAddresses: false,
    addingAddress: false,
  }

  static propTypes = {
    navigation: navigationPropTypes,
    analyzingAddresses: PropTypes.bool,
    user: ImmutablePropTypes.map.isRequired,
    userlogOut: PropTypes.func.isRequired,
    addingCard: PropTypes.bool.isRequired,
    inspectAddresses: PropTypes.func.isRequired,
    inspectCreditCards: PropTypes.func.isRequired,
    analyzingCards: PropTypes.bool,
    addingAddress: PropTypes.bool,
  }

  suggestLocal = () => {
    Communications.email(['ventas@lookatmobile.com'], null, null, 'Quiero un restaurante en la plataforma', 'lookat - Hola, me gustaria recomendarles el siguiente restaurante: (Nombre, Zona, Tipo de comida)');
  }

  instantCall() {
    Alert.alert(
      '¿Necesitas ayuda?',
      'Alguien siempre esta para ayudarte en lookat, si necesitas ayuda urgente no dudes en hacernos una llamada, de otra forma contestaremos un correo electrónico en unos minutos.',
      [
        { text: 'Llamar', onPress: () => Communications.phonecall('+52 1 8127317050', true) },
        { text: 'Enviar Correo', onPress: () => Communications.email(['contacto@lookatmobile.com'], null, null, 'Necesito ayuda', 'lookat - Hola, he tenido un problema: ') },
        { text: 'Cancelar', style: 'cancel' },
      ],
      { cancelable: false },
    );
  }

  logout() {
    Alert.alert(
      'Alerta',
      '¿Seguro que quieres cerrar sesión?',
      [{
        text: 'Si',
        onPress: () => AsyncStorage.removeItem(api.key, () => {
          this.props.userlogOut();
          this.props.navigation.navigate('auth');
        }),
      },
      { text: 'No' }],
    );
  }

  render() {
    const { user } = this.props;
    return (
      <ScrollView
        style={[
          common.view, common.innerViewPadding, common.highPaddingSection,
        ]}
      >
        <ManageCards
          visible={this.props.analyzingCards}
        />
        <AddCard
          visible={this.props.addingCard}
        />
        <ManageAddresses
          visible={this.props.analyzingAddresses}
        />
        <AddAddress
          visible={this.props.addingAddress}
        />
        <Text style={common.viewTitle}>
          {user.get('name')}
        </Text>
        <ListItemButton
          title="Métodos de Pago"
          onPress={this.props.inspectCreditCards}
          icon="credit-card"
        />
        <ListItemButton
          title="Direcciones"
          onPress={this.props.inspectAddresses}
          icon="place"
        />
        <ListItemButton
          title="Sugerir un nuevo Establecimiento / Restaurante"
          onPress={this.suggestLocal}
          icon="add"
        />
        <ListItemButton
          title="¿Necesitas ayuda?"
          onPress={this.instantCall}
          icon="mail-outline"
        />
        <ListItemButton
          title="Cerrar Sesión"
          onPress={this.instantCall}
          icon="call-missed-outgoing"
        />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  user: getUserProfile(state),
  analyzingCards: analyzingCardList(state),
  addingCard: addingCard(state),
  analyzingAddresses: analyzingAddresses(state),
  addingAddress: state.session.get('addingAddress', false),
});

const mapDispatchToProps = {
  userlogOut,
  inspectCreditCards,
  inspectAddresses,
};


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
