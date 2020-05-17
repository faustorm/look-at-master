import React, { Component } from 'react';
import {
  func,
  number,
  object,
} from 'prop-types';
import debounce from 'lodash.debounce';

import Input from '../../../core/Input';

class AutocompleteInput extends Component {
    static defaultProps = {
      custom: undefined,
      debounce: undefined,
    };

    static propTypes = {
      custom: object, // eslint-disable-line
      debounce: number,
      onChangeText: func.isRequired,
      onChangeTextSettle: func.isRequired,
    }

    _handleChangeText = (value) => {
      this.props.onChangeText(value);
      this._settle();
    }

    _settle = debounce(() => {
      this.props.onChangeTextSettle();
    }, this.props.debounce);

    render() {
      return (
        <Input
          title="Dirección"
          placeholder="Boulevard Buenos Aires ....."
          onChange={this._handleChangeText}
        />
      );
    }
}

export default AutocompleteInput;
