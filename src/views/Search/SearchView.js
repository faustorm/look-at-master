import React, { Component } from 'react';
import { Map as ImmutableMap } from 'immutable';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';
import { ScrollView, Image } from 'react-native';

import navigationPropTypes from '../../proptypes/navigation';
import { setUpSearchView } from '../../redux/actions/session';
import { searchQuery } from '../../redux/actions/places';
import { getQueriedPlaces } from '../../redux/selectors/places';

import PlaceFlatList from '../../components/Places/PlaceFlatList';
import MainInput from '../../components/core/MainInput';
import { searchGrayIcon, searchRedIcon } from '../../img/tabs';
import common from '../../style/common';
import colors from '../../constants/colors';

class Search extends Component {
  static navigationOptions = {
    title: 'Buscar',
    tabBarIcon: ({ tintColor }) => (
      <Image
        style={common.tabIcon.home}
        source={colors.brand === tintColor ? searchRedIcon : searchGrayIcon}
      />
    ),
  }
  static defaultProps = {
    places: ImmutableMap(),
    navigation: undefined,
  };

  static propTypes = {
    navigation: navigationPropTypes,
    places: ImmutablePropTypes.map,
    setUpSearchView: PropTypes.func.isRequired,
    searchQuery: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.setUpSearchView();
  }

  sendSearchQuery = (text) => {
    if (
      this.props.navigation.state.params
      &&
      this.props.navigation.state.params.keyValue
    ) {
      this.props.navigation.setParams({ keyValue: undefined });
    }
    this.props.searchQuery(text);
  }

  render() {
    return (
      <ScrollView style={common.view}>
        <MainInput
          placeholder="Busca un restaurante"
          onChange={this.sendSearchQuery}
        />
        {this.props.places.size > 0 &&
          <PlaceFlatList
            dataSource={this.props.places}
          />
        }
      </ScrollView>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  places: getQueriedPlaces(state, ownProps.navigation.state.params),
});

const mapDispatchToProps = {
  setUpSearchView,
  searchQuery,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
