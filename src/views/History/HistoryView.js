import React, { Component } from 'react';
import { ScrollView, Image } from 'react-native';
import { Map as ImmutableMap } from 'immutable';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';

import { setUpHistoryView, closeNotification } from '../../redux/actions/session';
import { actualNotification } from '../../redux/selectors/user';
import { connect } from 'react-redux';

import NotificationList from '../../components/Notifications/NotificationList';
import NotificationModal from '../../components/Notifications/NotificationModal';
import { historyGrayIcon, historyRedIcon } from '../../img/tabs';
import common from '../../style/common';
import colors from '../../constants/colors';

class History extends Component {
  static navigationOptions = {
    title: 'Historial',
    headerTintColor: colors.gray,
    tabBarIcon: ({ tintColor }) => (
      <Image
        style={common.tabIcon.history}
        source={colors.brand === tintColor ? historyRedIcon : historyGrayIcon}
      />
    ),
  }

  static propTypes = {
    setUpHistoryView: PropTypes.func.isRequired,
    closeNotification: PropTypes.func.isRequired,
    analyzing: PropTypes.bool.isRequired,
    notifications: ImmutablePropTypes.map.isRequired,
    actualNotification: ImmutablePropTypes.map.isRequired,
  }

  componentDidMount() {
    this.props.setUpHistoryView();
  }

  onRefresh() {
    this.props.setUpHistoryView();
  }


  render() {
    return (
      <ScrollView style={common.view}>
        <NotificationModal
          visible={this.props.analyzing}
          close={this.props.closeNotification}
          notification={this.props.actualNotification}
        />
        <NotificationList dataSource={this.props.notifications} />
      </ScrollView>
    );
  }
}


const mapStateToProps = (state) => ({
  notifications: state.user.get('notifications', ImmutableMap({})),
  analyzing: state.session.get('actualNotification').get('analyzing'),
  actualNotification: actualNotification(state),
});

const mapDispatchToProps = {
  setUpHistoryView,
  closeNotification,
};


export default connect(mapStateToProps, mapDispatchToProps)(History);
