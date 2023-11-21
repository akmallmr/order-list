import React from 'react';
import RootContext from './RootContext';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Home, Splash} from '../screens';
import Main from './MainNavigator';

const {Navigator, Screen} = createNativeStackNavigator();

const SCREENS = ['Splash', 'Main'];

const cardStyleInterpolator = ({current: {progress}}) => ({
  cardStyle: {
    opacity: progress.interpolate({
      inputRange: [0, 0.5, 0.9, 1],
      outputRange: [0, 0.25, 0.7, 1],
    }),
  },
});

const Root = () => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'SWITCH_NAVIGATE':
          return {
            ...prevState,
            screen: action.screen,
          };
      }
    },
    {screen: 0},
  );

  const rootContext = React.useMemo(
    () => ({
      switchNavigate: async screen => {
        dispatch({
          type: 'SWITCH_NAVIGATE',
          screen: SCREENS.findIndex(i => i === screen),
        });
      },
    }),
    [],
  );

  const getScreen = index => {
    switch (index) {
      case 0:
        return <Screen name={SCREENS[0]} component={Splash} />;
      case 1:
        return <Screen name={SCREENS[1]} component={Main} />;
    }
  };

  return (
    // <GestureHandlerRootView style={{flex: 1}}>
    <RootContext.Provider value={rootContext}>
      <Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator,
        }}>
        {getScreen(state.screen)}
      </Navigator>
    </RootContext.Provider>
    // </GestureHandlerRootView>
  );
};

export default Root;
