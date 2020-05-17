import React from 'react';
import { View } from 'react-native';
import {
  array,
  func,
} from 'prop-types';

import Prediction from './Prediction';
import style from './style';

const Predictions = (props) => (
  <View style={style.container}>
    {
      props.predictions.map((prediction) => (
        <Prediction
          key={prediction.place_id}
          prediction={prediction}
          title={prediction.structured_formatting.main_text}
          description={prediction.structured_formatting.secondary_text}
          onPress={props.onPressPrediction}
        />
      ))
    }
  </View>
);

Predictions.defaultProps = {
  onPressPrediction: undefined,
  predictions: [],
};

Predictions.propTypes = {
  predictions: array, // eslint-disable-line
  onPressPrediction: func,
};

export default Predictions;
