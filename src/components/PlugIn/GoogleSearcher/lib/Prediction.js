import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  any,
  func,
  string,
} from 'prop-types';

import style from './style';

class Prediction extends Component {
    static defaultProps = {
      prediction: undefined,
      title: undefined,
      description: undefined,
    }

    static propTypes = {
      prediction: any, // eslint-disable-line
      title: string,
      description: string,
      onPress: func.isRequired,
    }

    _handlePress = () => {
      this.props.onPress(this.props.prediction);
    }

    render() {
      return (
        <TouchableOpacity onPress={this._handlePress}>
          <View style={style.item}>
            <Text style={style.title}>{this.props.title}</Text>
            <Text style={style.description}>{this.props.description}</Text>
          </View>
        </TouchableOpacity>
      );
    }
}

export default Prediction;
