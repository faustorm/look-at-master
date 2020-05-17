import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import Calendar from 'react-native-calendar';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Map as ImmutableMap } from 'immutable';
import PropTypes from 'prop-types';

import { fetchScheduleByDay, submitReservation } from '../../../redux/actions/places';
import { closeAddReservation } from '../../../redux/actions/session';
import { getScheduleByDay } from '../../../redux/selectors/places';
import { trackEvent } from '../../../modules/Mixpanel';

import Button from '../../core/Button';
import Input from '../../core/Input';
import Picker from '../../core/Picker';
import Modal from '../../core/Modal';

import moment from 'moment';
import style from './style';
import common from '../../../style/common';

class ReservateView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reservationTime: undefined,
      hour: null,
      quantity: 2,
      comments: undefined,
      isVisibleSchedule: false,
      isVisiblePersons: false,
    };
  }

  componentDidMount() {
    trackEvent('Reservate View');
    const formatted = moment().format('YYYY-MM-DD');
    this.searchByDay(formatted);
  }

  postReservation = () => {
    const { state } = this;
    const reservationFormatted = moment(state.reservationTime).format('YYYY-MM-DD');
    const dayNumberFormatted = moment(state.reservationTime).format('DD');
    const monthNumberFormatted = moment(state.reservationTime).format('MMMM');
    const data = {
      quantity: Number(this.state.quantity),
      reservationTime : reservationFormatted,
      hour : state.hour,
      status : 1,
      comments : state.comments,
      idPlace : this.props.actualPlaceId,
      place : this.props.place.get('place'),
      day : dayNumberFormatted,
      month: monthNumberFormatted,
    };
    this.props.submitReservation(data);
    console.log('post', data);
  }

  showModalSchedule = (visible) => {
    this.setState({ isVisibleSchedule: visible });
  }

  showModalPersons = (visible) => {
    this.setState({ isVisiblePersons: visible });
  }

  createSchedulePickers = () => {
    const items = [
      { value: '5', text: '5:00 A.M' },
      { value: '5.5', text: '5:30 A.M' },
      { value: '6', text: '6:00 A.M' },
      { value: '6.5', text: '6:30 A.M' },
      { value: '7', text: '7:00 A.M' },
      { value: '7.5', text: '7:30 A.M' },
      { value: '8', text: '8:00 A.M' },
      { value: '8.5', text: '8:30 A.M' },
      { value: '9', text: '9:00 A.M' },
      { value: '9.5', text: '9:30 A.M' },
      { value: '10', text: '10:00 A.M' },
      { value: '10.5', text: '10:30 A.M' },
      { value: '11', text: '11:00 A.M' },
      { value: '11.5', text: '11:30 A.M' },
      { value: '12', text: '12:00 P.M' },
      { value: '12.5', text: '12:30 P.M' },
      { value: '13', text: '1:00 P.M' },
      { value: '13.5', text: '1:30 P.M' },
      { value: '14', text: '2:00 P.M' },
      { value: '14.5', text: '2:30 P.M' },
      { value: '15', text: '3:00 P.M' },
      { value: '15.5', text: '3:30 P.M' },
      { value: '16', text: '4:00 P.M' },
      { value: '16.5', text: '4:30 P.M' },
      { value: '17', text: '5:00 P.M' },
      { value: '17.5', text: '5:30 P.M' },
      { value: '18', text: '6:00 P.M' },
      { value: '18.5', text: '6:30 P.M' },
      { value: '19', text: '7:00 P.M' },
      { value: '19.5', text: '7:30 P.M' },
      { value: '20', text: '8:00 P.M' },
      { value: '20.5', text: '8:30 P.M' },
      { value: '21', text: '9:00 P.M' },
      { value: '21.5', text: '9:30 P.M' },
      { value: '22', text: '10:00 P.M' },
      { value: '22.5', text: '10:30 P.M' },
      { value: '23', text: '11:00 P.M' },
      { value: '23.5', text: '11:30 P.M' },
      { value: '24', text: '12:00 A.M' },
      { value: '24.5', text: '12:30 A.M' },
      { value: '1', text: '1:00 A.M' },
      { value: '1.5', text: '1:30 A.M' },
      { value: '2', text: '2:00 A.M' },
      { value: '2.5', text: '2:30 A.M' },
      { value: '3', text: '3:00 A.M' },
      { value: '3.5', text: '3:30 A.M' },
      { value: '4', text: '4:00 A.M' },
      { value: '4.5', text: '4:30 A.M' },
    ];
    const data = [];
    if (this.props.schedule.get('maxValue') && this.props.schedule.get('minValue')) {
      data.push({ value: undefined, text: 'Hora' });
      for (let i = 0; i < items.length - 1; i += 1) {
        if (
          items[i].value >= this.props.schedule.get('minValue')
          && items[i].value <= this.props.schedule.get('maxValue')
        ) {
          data.push({ text: items[i].text, value: items[i].text });
        }
      }
    }
    return data;
  }

  createPersonPickers = () => {
    const data = [];
    data.push({ value: undefined, text: 'Número de personas' });
    for (let i = 1; i < 21; i += 1) {
      data.push({ value: i.toString(), text: i.toString() });
    }
    return data;
  }

  searchByDay = (daySearch) => {
    this.setState({
      reservationTime: moment(daySearch).format('YYYY-MM-DD'),
    }, () => {
      this.props.fetchScheduleByDay({ daySearch, id: this.props.place.get('id') });
    });
  }

  render() {
    return (
      <Modal
        visible={this.props.visible}
        close={this.props.closeAddReservation}
      >
        <Text style={common.viewTitle}>
          Reserva tú mesa
        </Text>
        <View>
          <Calendar
            showControls
            style={style.calendar}
            dayHeadings={['D', 'L', 'M', 'M', 'J', 'V', 'S']}
            titleFormat="MMMM YYYY"
            onDateSelect={(date) => this.searchByDay(date)}
            selectedDate={this.state.reservationTime}
            nextButtonText={'>'}
            prevButtonText={'<'}
            customStyle={common.customStyle}
          />
          <Picker
            toggleModal={this.showModalPersons}
            value={this.state.quantity}
            onChange={(text) => this.setState({ quantity: text })}
            placeholder="Número de Personas"
            visible={this.state.isVisiblePersons}
            options={this.createPersonPickers()}
          />
          <Picker
            toggleModal={this.showModalSchedule}
            value={this.state.hour}
            onChange={(text) => this.setState({ hour: text })}
            placeholder="Hora"
            visible={this.state.isVisibleSchedule}
            options={this.createSchedulePickers()}
          />
          <Input
            title="Comentarios especiales"
            placeholder="Poner cerca de la terraza..."
            onChange={(text) => this.setState({ comments: text })}
          />
        </View>
        <Button
          ownStyle="submit"
          text="Agendar Reservación"
          onPress={this.postReservation}
        />
      </Modal>
    );
  }
}

ReservateView.defaultProps = {
  schedule: ImmutableMap({}),
};

ReservateView.propTypes = {
  closeAddReservation: PropTypes.func.isRequired,
  fetchScheduleByDay: PropTypes.func.isRequired,
  schedule: ImmutablePropTypes.map,
  visible: PropTypes.bool.isRequired,
  place: ImmutablePropTypes.map.isRequired,
  actualPlaceId: PropTypes.number.isRequired,
  submitReservation: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
  schedule: getScheduleByDay(state, ownProps),
  visible: state.session.get('addingReservation', false),
});

const mapDispatchToProps = {
  closeAddReservation,
  fetchScheduleByDay,
  submitReservation,
};

export default connect(mapStateToProps, mapDispatchToProps)(ReservateView);
