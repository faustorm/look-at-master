import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import PropTypes from 'prop-types';

import { Button, Input } from '../../../components/core';
import messages from '../../../constants/messages';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: undefined,
      password: undefined,
      confirmPassword: undefined,
      phoneNumber: undefined,
      name: undefined,
    };
  }

  onSubmit = () => {
    const {
      email,
      password,
      name,
      confirmPassword,
      phoneNumber,
    } = this.state;
    const data = {
      email, password, name, confirmPassword, phoneNumber,
    };
    if (data.password === data.confirmPassword) {
      this.props.requestSignUp(data);
    } else {
      Alert.alert(messages.errorHeader, 'Asegurate de que las contraseñas coincidan.', [{ text: 'OK' }]);
    }
  }

  render() {
    return (
      <View>
        <Input
          onChange={(name) => this.setState({ name })}
          title="Nombre"
          placeholder="Escribe tú nombre"
        />
        <Input
          onChange={(email) => this.setState({ email })}
          title="Correo electrónico"
          placeholder="Escribe tú correo"
          keyboard="email-address"
        />
        <Input
          onChange={(password) => this.setState({ password })}
          password
          title="Contraseña"
          placeholder="Escribe tú contraseña"
        />
        <Input
          onChange={(confirmPassword) => this.setState({ confirmPassword })}
          password
          title="Confirmar contraseña"
          placeholder="Escribe de nuevo tú contraseña"
        />
        <Input
          onChange={(phoneNumber) => this.setState({ phoneNumber })}
          title="Número telefónico"
          keyboard="phone-pad"
          placeholder="Escribe tú número celular"
        />
        <Button
          ownStyle="submit"
          text="Crear cuenta"
          onPress={this.onSubmit}
        />
      </View>
    );
  }
}

SignUp.propTypes = {
  requestSignUp: PropTypes.func.isRequired,
};

export default SignUp;
