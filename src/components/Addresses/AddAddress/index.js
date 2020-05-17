import React, { Component } from 'react';
import { Text, View } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import MapView from 'react-native-maps';
import { connect } from 'react-redux';

import { closeAddAddress } from '../../../redux/actions/session';
import { submitAddress } from '../../../redux/actions/user';
import locationPropTypes from '../../../proptypes/location';

import Modal from '../../core/Modal';
import constants from '../../../constants/keys';
import common from '../../../style/common';
import Input from '../../core/Input';
import styles from './style';
import GooglePlaceAutocomplete from '../../PlugIn/GoogleSearcher';
import Button from '../../core/Button';
import api from '../../../api';

class AddAddress extends Component {
  static defaultProps = {
    location: ImmutablePropTypes.map.isRequired,
  };

  static propTypes = {
    location: locationPropTypes,
    submitAddress: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.inputAddressFromGeo = this.inputAddressFromGeo.bind(this);
    this.state = {
      address: {
        name : undefined,
        address : undefined,
        lat : props.location.get('coords').get('lat'),
        lng : props.location.get('coords').get('lng'),
        zipCode : undefined,
        idCity : undefined,
      },
      indications: undefined,
      initialRegion: {
        latitude: props.location.get('coords').get('lat'),
        longitude: props.location.get('coords').get('lng'),
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      },
      showingPredictions: true,
    };
  }

  componentWillMount() {
    this.inputAddressFromGeo(this.props.location.get('coords').get('lat'), this.props.location.get('coords').get('lng'));
  }

  onSubmit = () => {
    const requester = this.state.address;
    requester.indications = this.state.indications;
    this.props.submitAddress(requester);
  }

  inputAddressFromText = (result) => {
    const zipCodeAnnotate = result.address_components.length - 1;
    const newAddress = {
      name: `${result.address_components[0].long_name},${result.address_components[1].long_name}`,
      address: result.formatted_address,
      lat: result.geometry.location.lat,
      lng: result.geometry.location.lng,
      zipCode:  Number(result.address_components[zipCodeAnnotate].long_name),
      idCity: 1,
    };
    const initialRegion = {
      latitude: result.geometry.location.lat,
      longitude: result.geometry.location.lng,
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    };
    this.setState({
      address: newAddress,
      showingPredictions: false,
      initialRegion,
    });
  }

  inputAddressFromGeo = (latitude, longitude) => {
    api.location.googleLocation({ latitude, longitude })
      .then((response) => response.json())
      .then((rjson) => {
        const result = rjson.results[0];
        const zipCodeAnnotate = result.address_components.length - 1;
        const newAddress = {
          name: `${result.address_components[0].long_name}, ${result.address_components[1].long_name}`,
          address: result.formatted_address,
          lat: result.geometry.location.lat,
          lng: result.geometry.location.lng,
          zipCode: Number(result.address_components[zipCodeAnnotate].long_name),
          idCity: 1,
        };
        const initialRegion = {
          latitude: result.geometry.location.lat,
          longitude: result.geometry.location.lng,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        };
        this.setState({
          address: newAddress,
          showingPredictions: false,
          initialRegion,
        });
      });
  }

  decideNext = () => {
    if (this.state.showingPredictions === false) {
      this.setState({ showingPredictions: true });
    }
  }

  render() {
    return (
      <Modal
        visible={this.props.visible}
        close={this.props.close}
      >
        <Text style={common.viewTitle}>
          Agrega tu dirección
        </Text>
        <View>
          <GooglePlaceAutocomplete
            googleAPIKey={constants.googleSearch}
            onResult={this.inputAddressFromText}
            placeholder="Escribe tu dirección..."
            value={this.state.address.name}
            onChangeText={this.decideNext}
            showPredictions={this.state.showingPredictions}
          />
          <MapView
            style={styles.map}
            region={this.state.initialRegion}
            zoomEnable
            rotateEnabled
            scrollEnabled
            pitchEnabled
          >
            <MapView.Marker
              coordinate={{
                latitude: this.state.address.lat,
                longitude: this.state.address.lng,
              }}
              draggable
              onDragEnd={(e) =>
                this.inputAddressFromGeo(
                  e.nativeEvent.coordinate.latitude,
                  e.nativeEvent.coordinate.longitude,
                )
              }
              title="Guardar Aquí"
            />
          </MapView>
          <Input
            title="Indicaciones"
            placeholder="Apartamento #3"
            onChange={(text) => this.setState({ indications: text })}
          />
          <Button
            ownStyle="submit"
            text="Guardar Dirección"
            onPress={this.onSubmit}
          />
        </View>
      </Modal>
    );
  }
}

const mapStateToProps = ({ location }) => ({
  location,
});

const mapDispatchToProps = {
  close: closeAddAddress,
  submitAddress,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAddress);
