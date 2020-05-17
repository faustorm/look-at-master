import React from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Modal,
  Button,
  Picker,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './style';

const PickerInput = (props) => (
  <View style={styles.inputView}>
    {Platform.OS === 'ios' ?
      <View>
        <TouchableOpacity
          style={styles.field}
          onPress={() => props.toggleModal(true)}
        >
          <View style={styles.fieldView}>
            <Text style={styles.inputText}>
              {props.value !== null ? `${props.placeholder}: ${props.value}` : props.placeholder}
            </Text>
          </View>
        </TouchableOpacity>
        <Modal
          transparent
          visible={props.visible}
          animationType="slide"
          onRequestClose={() => props.toggleModal(false)}
        >
          <View style={styles.pickerModal}>
            <View style={styles.pickerView}>
              <View style={styles.pickerButton}>
                <Button
                  onPress={() => props.toggleModal(false)}
                  title="Hecho"
                  accessibilityLabel="Seleccionar opción"
                />
              </View>
              <Picker
                selectedValue={props.value}
                style={styles.picker}
                onValueChange={props.onChange}
                mode="dropdown"
                title
              >
                {props.options.map((option) => (
                  <Picker.Item
                    key={option.value}
                    value={option.value}
                    label={option.text || option.value}
                  />
                ))}
              </Picker>
            </View>
          </View>
        </Modal>
      </View>
      :
      <View style={styles.field}>
        <View style={styles.fieldView}>
          <Picker
            selectedValue={props.value}
            style={[styles.picker, styles.pickerAndroid]}
            onValueChange={props.onChange}
            mode="dropdown"
            title
          >
            {props.options.map((option) => (
              <Picker.Item
                key={option.value}
                value={option.value}
                label={option.text || option.value}
              />
            ))}
          </Picker>
        </View>
      </View>
    }
  </View>
);

PickerInput.defaultProps = {
  placeholder: '',
  visible: false,
};

PickerInput.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  visible: PropTypes.bool,
  options: PropTypes.shape({
    value: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export default PickerInput;
