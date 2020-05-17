import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import PropTypes from 'prop-types';

import messages from '../../../constants/messages';
import { Button, Input } from '../../../components/core';
import { navigationPropTypes } from '../../../proptypes';

class Login extends Component {
  static defaultProps = {
    navigation: null,
  };

  static propTypes = {
    navigation: navigationPropTypes,
    requestLogin: PropTypes.func.isRequired,
  };

  state = {
    email: undefined,
    password: undefined,
  };

  submitLogin = () => {
    const { email, password } = this.state;
    const { navigation } = this.props;
    const data = { email, password };
    if (data.email && data.password) {
      this.props.requestLogin({ data, navigation });
    } else {
      Alert.alert(
        messages.waitHeader,
        'Favor de completar todos los datos.',
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
        <Input
          onChange={(password) => this.setState({ password })}
          password
          title="Contraseña"
          placeholder="Escribe tu contraseña"
        />
        <Button
          ownStyle="submit"
          text="Iniciar Sesión"
          onPress={this.submitLogin}
        />
      </View>
    );
  }
}

export default Login;
