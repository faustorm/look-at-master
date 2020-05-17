import React, { Component } from 'react';
import { ScrollView, Image } from 'react-native';
import { Map as ImmutableMap } from 'immutable';

import navigationPropTypes from '../../proptypes/navigation';
import { checkUserLogin } from '../../redux/actions/user';
import { locationChanged } from '../../redux/actions/location';
import { setUpHomeView } from '../../redux/actions/session';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';

import logo from '../../img/logo.png';
import { homeGrayIcon, homeRedIcon } from '../../img/tabs';
import { PlaceList, PlaceCarouselList } from '../../components/Places';
import { CategoriesCarousel } from '../../components/Categories';
import common from '../../style/common';
import colors from '../../constants/colors';

class Home extends Component {
  static navigationOptions = {
    title: 'Inicio',
    headerTitle: (
      <Image source={logo} style={{ width: 100, height: 29 }} />
    ),
    headerLeft: null,
    tabBarIcon: ({ tintColor }) => (
      <Image
        style={common.tabIcon.home}
        source={colors.brand === tintColor ? homeRedIcon : homeGrayIcon}
      />
    ),
  }

  static defaultProps = {
    navigation: undefined,
  };

  static propTypes = {
    navigation: navigationPropTypes,
    setUpHomeView: PropTypes.func.isRequired,
    favorites: ImmutablePropTypes.map.isRequired,
    places: ImmutablePropTypes.map.isRequired,
    categories: ImmutablePropTypes.map.isRequired,
  };

  componentDidMount() {
    this.props.setUpHomeView();
  }

  onRefresh() {
    this.props.setUpHomeView();
  }

  navigateCategory = (id) => {
    this.props.navigation.navigate('search', { keyValue: 'idCategory', value: id });
  }

  render() {
    return (
      <ScrollView
        style={common.view}
      >
        {this.props.categories.size > 0 &&
          <CategoriesCarousel
            categories={this.props.categories}
            onSelect={this.navigateCategory}
          />
        }
        {this.props.favorites.size > 0 &&
          <PlaceCarouselList
            title="Favoritos"
            navigation={this.props.navigation}
            dataSource={this.props.favorites}
          />
        }
        {this.props.places.size > 0 &&
          <PlaceList
            title="Cerca de ti"
            navigation={this.props.navigation}
            dataSource={this.props.places}
          />
        }
      </ScrollView>
    );
  }
}

const mapStateToProps = ({ location, place }) => ({
  favorites: place.get('favorites', ImmutableMap({})),
  places: place.get('near', ImmutableMap({})),
  categories: place.get('categories', ImmutableMap({})),
  place,
  location,
});

const mapDispatchToProps = {
  locationChanged,
  checkUserLogin,
  setUpHomeView,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
