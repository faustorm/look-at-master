import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, View, LayoutAnimation } from 'react-native';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';

import { setActualNotification } from '../../../redux/actions/session';

import NotificationItem from '../NotificationItem';
import common from '../../../style/common';

class NotificationList extends Component {
  componentDidMount() {
    LayoutAnimation.spring();
  }

  componentDidUpdate() {
    LayoutAnimation.spring();
  }

  render() {
    const ds =
      new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    return (
      <View style={common.sectionView}>
        <ListView
          dataSource={ds.cloneWithRows(this.props.dataSource.toArray())}
          renderRow={(rowData) => (
            <NotificationItem
              notification={rowData}
              onPress={() => this.props.setActualNotification(rowData)}
            />
          )}
        />
      </View>
    );
  }
}

NotificationList.propTypes = {
  dataSource: ImmutablePropTypes.map.isRequired,
  setActualNotification: PropTypes.func.isRequired,
};

export default connect(undefined, { setActualNotification })(NotificationList);
