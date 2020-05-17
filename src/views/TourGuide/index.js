import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';

import navigationPropTypes from '../../proptypes/navigation';

import Slides from '../../components/GuideTour';
import constants from '../../constants';

class WelcomeScreen extends Component {
  static defaultProps = {
    navigation: undefined,
  };

  static propTypes = {
    navigation: navigationPropTypes,
  };

  async componentDidMount() {
    const tourGuideShowed =
      await AsyncStorage.getItem(constants.tourGuideShowed);
    if (tourGuideShowed) {
      this.props.navigation.navigate('auth');
    }
  }

  onSlidesComplete = async () => {
    AsyncStorage.setItem(constants.tourGuideShowed, 'true');
    this.props.navigation.navigate('auth');
  };

  render() {
    return (
      <Slides
        onComplete={this.onSlidesComplete}
      />
    );
  }
}

export default WelcomeScreen;
