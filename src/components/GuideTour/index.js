import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
} from 'react-native';
import PropTypes from 'prop-types';

import Button from '../core/Button';

import slideData from './slideData';
import styles from './style';

class Slides extends Component {
  static propTypes = {
    onComplete: PropTypes.func.isRequired,
  };

  renderLastSlide(index) {
    if (index === slideData.length - 1) {
      return (
        <View style={styles.callButton}>
          <Button
            text="Empezar"
            ownStyle="brandButton"
            onPress={this.props.onComplete}
          />
        </View>
      );
    }
    return undefined;
  }

  renderPositionDots(index) {
    return (
      <View style={styles.masterDot}>
        {slideData.map((slide, renderIndex) => (
          <View
            key={slide.text}
            style={
              [
                styles.positionDot,
                renderIndex <= index ? styles.emptyDot : styles.filledDot,
              ]
            }
          />
        ))}
      </View>
    );
  }

  renderSlides() {
    return slideData.map((slide, index) => (
      <View
        key={slide.text}
        style={styles.slideStyle}
      >
        <Text style={styles.slideText}>{slide.text}</Text>
        <Image
          style={styles.image}
          source={slide.image}
        />
        {this.renderPositionDots(index)}
        {this.renderLastSlide(index)}
      </View>
    ));
  }

  render() {
    return (
      <ScrollView
        horizontal
        style={{ flex: 1 }}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      >
        {this.renderSlides()}
      </ScrollView>
    );
  }
}

export default Slides;
