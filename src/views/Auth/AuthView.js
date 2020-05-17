import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, ScrollView, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import { key } from '../../api';

import { navigationPropTypes } from '../../proptypes';

import tabs from '../../constants/tabs';
import authImage from '../../img/auth.jpeg';
import whitelogo from '../../img/whiteLogo.png';

import { getAuthTab } from '../../redux/selectors/session';
import { changeAuthTab } from '../../redux/actions/session';
import { requestLogin, requestSignUp, requestRecoverPassword, requestFacebookLogin } from '../../redux/actions/user';

import { Tabs, TextButton } from '../../components/core';
import { Login, SignUp, RecoverPassword, FacebookForm } from './Forms';
import common from '../../style/common';
import styles from './style';

class AuthView extends Component {
  static defaultProps = {
    navigation: null,
  };

  static propTypes = {
    navigation: navigationPropTypes,
    requestRecoverPassword: PropTypes.func.isRequired,
    changeAuthTab: PropTypes.func.isRequired,
    requestSignUp: PropTypes.func.isRequired,
    requestFacebookLogin: PropTypes.func.isRequired,
    activeTab: PropTypes.string.isRequired,
    requestLogin: PropTypes.func.isRequired,
  };

  state = {
    options: [{
      label: 'Iniciar Sesión',
      value: tabs.LOGIN_TAB,
    }, {
      label: 'Crear cuenta',
      value: tabs.SIGNUP_TAB,
    }],
  };

  async componentDidMount() {
    const loggedIn =
      await AsyncStorage.getItem(key);
    if (loggedIn) {
      this.props.navigation.navigate('home');
    }
  }

  render() {
    const { state } = this;
    return (
      <View style={common.view}>
        <Image
          style={styles.cover}
          source={authImage}
        />
        <ScrollView
          style={[common.overlay, common.viewPadding, styles.scrollView]}
        >
          <Image
            style={styles.logo}
            source={whitelogo}
          />
          <FacebookForm
            navigation={this.props.navigation}
            requestFacebookLogin={this.props.requestFacebookLogin}
          />
          <View
            style={[
              styles.authBox,
              common.semiFullWidthCentered,
              common.regularChildViewPadding,
            ]}
          >
            <Tabs
              onPress={(activeTab) => this.props.changeAuthTab(activeTab)}
              options={state.options}
              activeTab={this.props.activeTab}
            />
            {this.props.activeTab === tabs.LOGIN_TAB &&
              <Login
                navigation={this.props.navigation}
                requestLogin={this.props.requestLogin}
              />
            }
            {this.props.activeTab === tabs.SIGNUP_TAB &&
              <SignUp
                requestSignUp={this.props.requestSignUp}
              />
            }
            {this.props.activeTab === tabs.RECOVER_TAB ?
              <RecoverPassword
                requestRecoverPassword={this.props.requestRecoverPassword}
              />
              :
              <TextButton
                ownStyle="brand"
                text="Recupera tu contraseña"
                onPress={() => this.props.changeAuthTab(tabs.RECOVER_TAB)}
              />
            }
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  activeTab: getAuthTab(state),
});

const mapDispatchToProps = {
  requestLogin,
  changeAuthTab,
  requestSignUp,
  requestRecoverPassword,
  requestFacebookLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthView);
