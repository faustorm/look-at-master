import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import reducers from './src/redux/reducers';
import sagas from './src/redux/sagas';

import TourView from './src/views/TourGuide';
import AuthView from './src/views/Auth';
import PlaceView from './src/views/Place';
import HomeView from './src/views/Home';
import SearchView from './src/views/Search';
import HistoryView from './src/views/History';
import ProfileView from './src/views/Profile';
import colors from './src/constants/colors';

const App = () => {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  || compose;
  const sagaMiddleware = createSagaMiddleware();
  const store =
  createStore(
    reducers, {},
    composeEnhancers(applyMiddleware(sagaMiddleware, ReduxThunk, logger)),
  );
  sagaMiddleware.run(sagas);
  const MainNavigator = TabNavigator({
    tour: { screen: TourView },
    auth: { screen: AuthView },
    main: {
      screen: TabNavigator({
        home: StackNavigator({
          home: { screen: HomeView },
          place: { screen: PlaceView },
        }),
        search: { screen: SearchView },
        history: StackNavigator({
          history: { screen: HistoryView },
        }),
        profile: StackNavigator({
          profile: { screen: ProfileView },
        }),
      }, {
        lazy: true,
        animationEnabled: true,
        tabBarOptions: {
          style: { backgroundColor: 'white' },
          labelStyle: { fontSize: 12 },
          indicatorStyle: { backgroundColor: colors.brand },
          activeTintColor: colors.brand,
          inactiveTintColor: colors.gray,
        },
      }),
    },
  }, {
    navigationOptions: {
      swipeEnabled: false,
      tabBarVisible: false,
    },
  });
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
};

export default App;
