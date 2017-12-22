import React from 'react';
import PropTypes from 'prop-types';
import { Text, ScrollView, Image, tabBarIcon } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions, addNavigationHelpers, StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import { Touchable } from './components/Base'
import resources from './config/resources.js'


import ExampleScreen from './screens/_Example';

const MainNavigator = TabNavigator({
  Weather: {
    screen: ExampleScreen,
    navigationOptions: {
      tabBarLabel: 'Tab 1',
    }
  },
  FishSpec: {
    screen: ExampleScreen,
    navigationOptions: {
      tabBarLabel: 'Tab 2',
    }
  },
  Discovery: {
    screen: ExampleScreen,
    navigationOptions: {
      tabBarLabel: 'Tab 3',
    }
  },
  UserCenter: {
    screen: ExampleScreen,
    navigationOptions: {
      tabBarLabel: 'Tab 3',
    }
  },
}, {
}, {
});

export const AppNavigator = StackNavigator({
  Main: { screen: MainNavigator },
  Login: { screen: ExampleScreen },
}, {
  // cardStyle: {backgroundColor: '#ffffff'},
});

const AppWithNavigationState = ( store ) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch: store.dispatch, state: store.nav })} screenProps={store} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

export default connect((store) => (store))(AppWithNavigationState);
