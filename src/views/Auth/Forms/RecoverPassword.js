import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import PropTypes from 'prop-types';

import messages from '../../../constants/messages';
import { Button, Input } from '../../../components/core';

class RecoverPassword extends Component {
  static propTypes = {
    requestRecoverPassword: PropTypes.func.isRequired,
  };

  state = {
    email: undefined,
  };

  submitRecoverPassword = () => {
    const { email } = this.state;
    if (email) {
      this.props.requestRecoverPassword(email);
    } else {
      Alert.alert(
        messages.waitHeader,
        'Favor de poner tu correo electrónico para enviar link de recuperación.',
        [{ text: 'OK' }],
      );
    }
  }

  render() {
    return (
      <View>
        <Input
          onChange={(email) => this.setState({ email })}
          title="Correo electrónico"
          placeholder="Escribe tu correo"
          keyboard="email-address"
        />
        <Button
          ownStyle="submit"
          text="Enviar correo de recuperación"
          onPress={this.submitRecoverPassword}
        />
      </View>
    );
  }
}

export default RecoverPassword;
