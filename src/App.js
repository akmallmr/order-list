import React from 'react';
import {StatusBar, StyleSheet, Text, View, Platform} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {persistor, store} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';

import Router from './router/router';

const MainApp = () => {
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <>
      <StatusBar
        backgroundColor="#000"
        barStyle={Platform.OS === 'android' ? 'light-content' : 'dark-content'}
      />
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <MainApp />
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
