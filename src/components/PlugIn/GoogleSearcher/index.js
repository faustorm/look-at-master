import React, { Component } from 'react';
import {
  View,
} from 'react-native';
import {
  func,
  number,
  object,
  string,
  bool,
} from 'prop-types';
import axios, { CancelToken } from 'axios';

import AutocompleteInput from './lib/AutocompleteInput';
import Predictions from './lib/Predictions';
import style from './lib/style';

class GooglePlaceAutocomplete extends Component {
    static propTypes = {
      googleAPIKey: string.isRequired,
      value: string.isRequired,
      debounce: number,
      style: object.isRequired, // eslint-disable-line
      placeholder: string.isRequired,
      onChangeText: func.isRequired,
      onPredictions: func.isRequired,
      onResult: func.isRequired,
      showPredictions: bool,
    }

    static defaultProps = {
      debounce: 250,
      showPredictions: false,
    }

    constructor(props) {
      super(props);
      this.state = {
        value: '',
      };
      this._cancelTokenSource = CancelToken.source();
    }

    componentDidMount() {
      this.setState({ // eslint-disable-line
        value: this.props.value,
      });
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.props.value) {
        this.setState({
          value: nextProps.value,
        });
      }
    }

    _cancelTokenSource;

    _handleChangeText = (value) => {
      this.setState({ value });
      if (this.props.onChangeText) {
        this.props.onChangeText(value);
      }
    }

    _handleChangeTextSettle = () => {
      if (this.state.value.length > 0) {
        this._request('/place/autocomplete', {
          input: this.state.value,
        })
          .then((response) => {
            if (response && response.data) {
              switch (response.data.status) {
                case 'OK':
                case 'ZERO_RESULTS':
                  this._predictions(response.data.predictions);
                  break;
                default:
                  break;
              }
            }
          });
      } else if (this.state.predictions && this.state.predictions.length > 0) {
        this._predictions([]);
      }
    }

    _predictions(predictions) {
      this.setState({ predictions });
      if (this.props.onPredictions) {
        this.props.onPredictions(predictions);
      }
    }

    _handlePressPrediction = (prediction) => {
      this._request('/place/details', {
        placeid: prediction.place_id,
      })
        .then((response) => {
          if (response && response.data) {
            if (response.data.status === 'OK') {
              const { result } = response.data;
              if (this.props.onResult) {
                this.props.onResult(result);
              }
            }
          }
        });
    }

    _request = (url, params) => {
      this._cancelTokenSource.cancel('The "clean slate" protocol');
      this._cancelTokenSource = CancelToken.source();
      params.key = this.props.googleAPIKey;

      return axios({
        url: `${url}/json`,
        method: 'get',
        baseURL: 'https://maps.googleapis.com/maps/api',
        params,
        cancelToken: this._cancelTokenSource.token,
      })
        .catch((error) => {
          if (axios.isCancel(error)) {
            console.log('Request Cancel:', error.message);
          } else {
            throw error;
          }
        });
    }

    render() {
      return (
        <View style={[style.container, this.props.style]}>
          <AutocompleteInput
            value={this.state.value}
            placeholder={this.props.placeholder}
            onChangeText={this._handleChangeText}
            debounce={this.props.debounce}
            onChangeTextSettle={this._handleChangeTextSettle}
          />
          {this.props.showPredictions ?
            <Predictions
              predictions={this.state.predictions}
              onPressPrediction={this._handlePressPrediction}
            />
            :
            undefined
          }
        </View>
      );
    }
}

export default GooglePlaceAutocomplete;
