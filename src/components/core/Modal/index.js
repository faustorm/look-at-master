import React from 'react';
import { Modal, ScrollView, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import PropTypes from 'prop-types';

import styles from './style';
import colors from '../../../constants/colors';

const ModalView = (props) => (
  <Modal
    animationType="slide"
    transparent={false}
    onRequestClose={props.close}
    visible={props.visible}
  >
    <ScrollView style={styles.scroller}>
      {props.children}
    </ScrollView>
    <TouchableOpacity onPress={props.close} style={styles.close}>
      <View>
        <Icon
          name="close"
          backgroundColor={colors.regularBackground}
          color={colors.gray}
          size={30}
        />
      </View>
    </TouchableOpacity>
  </Modal>
);

ModalView.defaultProps = {
  visible: false,
};

ModalView.propTypes = {
  visible: PropTypes.bool,
  close: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default ModalView;
