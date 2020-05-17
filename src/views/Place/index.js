import React, { Component } from 'react';
import { ScrollView, Text, View, Image, Linking, Alert, TouchableOpacity } from 'react-native';
import { Map as ImmutableMap } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import PropTypes from 'prop-types';

import logo from '../../img/logo.png';
import { setUpPlaceView, openReviewmodal, openReservationModal } from '../../redux/actions/session';
import { getActualPlace } from '../../redux/selectors/places';
import navigationPropTypes from '../../proptypes/navigation';

import Reservate from '../../components/Places/Reservate';
import AddReview from '../../components/Reviews/AddReview';
import Button from '../../components/core/Button';
import Reviews from './Reviews';
import FoursquarePhotos from './Foursquare';
import Promotions from './Promotions';
import { homeGrayIcon, homeRedIcon } from '../../img/tabs';
import common from '../../style/common';
import colors from '../../constants/colors';
import style from './style';

class Place extends Component {
  static navigationOptions = {
    title: 'Home',
    tabBarIcon: ({ tintColor }) => (
      <Image
        style={common.tabIcon.home}
        source={colors.brand === tintColor ? homeRedIcon : homeGrayIcon}
      />
    ),
    headerTitle: (
      <Image source={logo} style={{ width: 100, height: 29 }} />
    ),
    ...common.regularHeaders,
  }

  static defaultProps = {
    navigation: undefined,
    addingReview: false,
    place: ImmutableMap(),
  }

  static propTypes = {
    navigation: navigationPropTypes,
    setUpPlaceView: PropTypes.func.isRequired,
    place: ImmutablePropTypes.map,
    openReviewmodal: PropTypes.func.isRequired,
    addingReview: PropTypes.bool,
    addingReservation: PropTypes.bool.isRequired,
    actualPlaceId: PropTypes.number.isRequired,
  }

  componentDidMount() {
    this.props.setUpPlaceView(this.props.navigation.state.params);
  }

  goToMap = () => {
    const url = `https://maps.google.com/maps?q=${this.props.place.get('lat')},${this.props.place.get('lng')}`;
    Linking.canOpenURL(url).then((supported) => {
      if (!supported) {
        Alert.alert('Error', 'Lo sentimos, ocurrió un error. Favor de intentar de nuevo más tarde', [{ text: 'OK' }]);
      }
      return Linking.openURL(url);
    }).catch(() => Alert.alert('Error', 'Lo sentimos, ocurrió un error. Favor de intentar de nuevo más tarde', [{ text: 'OK' }]));
  }

  render() {
    const { place } = this.props;
    const address = place.get('Address', ImmutableMap({ }));
    const promotions = place.get('Promotions', ImmutableMap({ }));
    const photos = place.get('Photos', ImmutableMap({ }));
    const reviews = place.get('Reviews', ImmutableMap({ }));
    const initialRegion = {
      latitude: address.get('lat'),
      longitude: address.get('lng'),
      latitudeDelta: 0.001,
      longitudeDelta: 0.001,
    };
    return (
      <ScrollView
        style={[
          common.view, common.innerViewPadding, common.highPaddingSection,
        ]}
      >
        <AddReview
          visible={this.props.addingReview}
          place={place}
        />
        <Reservate
          visible={this.props.addingReservation}
          actualPlaceId={this.props.actualPlaceId}
          place={place}
        />
        <Text style={common.viewTitle}>
          {place.get('place')}
        </Text>
        <Text style={style.sectionBody}>
          {place.get('description')}
        </Text>
        <View style={style.serviceTab}>
          {place.get('homeDelivery') === 1 &&
            <View style={[style.touchableService]}>
              <Button
                ownStyle="brandButton"
                text="A Domicilio"
                onPress={() => console.log('eys')}
              />
            </View>
          }
          {place.get('reservation') === 1 &&
            <View style={[style.touchableService]}>
              <Button
                ownStyle="brandButton"
                text="Reservar"
                onPress={this.props.openReservationModal}
              />
            </View>
          }
          {place.get('pickUp') === 1 &&
            <View style={[style.touchableService]}>
              <Button
                ownStyle="brandButton"
                text="Para Llevar"
                onPress={() => console.log('eys')}
              />
            </View>
          }
        </View>
        {photos.size > 0 &&
          <FoursquarePhotos photos={photos} />
        }
        {(reviews.size > 0) &&
          <View>
            <View style={style.parentTextDiv}>
              <Text style={style.sectionTitle}>
                Reseñas
              </Text>
              <TouchableOpacity onPress={this.props.openReviewmodal}>
                <Text style={style.callAction}>
                  Subir reseña
                </Text>
              </TouchableOpacity>
            </View>
            <Reviews
              reviews={reviews}
            />
          </View>
        }
        {(promotions.get('promotions', ImmutableMap({ })).size > 0 || promotions.get('coupons', ImmutableMap({ })).size > 0) &&
          <View>
            <Text style={style.sectionTitle}>Cupones y Promociones</Text>
            <Promotions
              idPlace={place.get('id')}
              data={promotions.get('promotions')}
              coupons={promotions.get('coupons')}
            />
          </View>
        }
        <Text style={style.sectionTitle}>Precio</Text>
        <Text
          style={style.sectionBody}
        >
          {place.get('costAverage')}
        </Text>
        <Text style={style.sectionTitle}>Estacionamiento</Text>
        <Text
          style={style.sectionBody}
        >
          {place.get('parking')}
        </Text>
        <Text style={style.sectionTitle}>Metodos de Pago</Text>
        <Text
          style={style.sectionBody}
        >
          {place.get('payMethods')}
        </Text>
        <Text style={style.sectionTitle}>Horario</Text>
        {place.has('schedules') && place.get('schedules', ImmutableMap({})).map((schedule) => (
          <Text key={schedule.get('id')} style={style.sectionBody}>
            <Text style={style.hourTitle}>{schedule.get('date')} </Text>
            <Text
              style={style.sectionBody}
            >
              {schedule.get('startTime')} - {schedule.get('endTime')}
            </Text>
          </Text>
        ))}
        {place.has('Address') &&
          <View>
            <Text style={style.sectionTitle}>Dirección</Text>
            <MapView
              style={style.map}
              initialRegion={initialRegion}
              zoomEnabled
              rotateEnabled
              scrollEnabled
              pitchEnabled
              liteMode
            >
              <MapView.Marker
                coordinate={{
                  latitude: address.get('lat'),
                  longitude: address.get('lng'),
                }}
                title={place.get('place')}
                description={address.get('address')}
                onPress={() => this.goToMap()}
              />
            </MapView>
          </View>
        }
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => ({
  place: getActualPlace(state),
  addingReview: state.session.get('addingReview'),
  addingReservation: state.session.get('addingReservation', false),
  actualPlaceId: state.place.get('actualId'),
});

const mapDispatchToProps = {
  setUpPlaceView,
  openReviewmodal,
  openReservationModal,
};


export default connect(mapStateToProps, mapDispatchToProps)(Place);
