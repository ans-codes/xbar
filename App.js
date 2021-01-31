import 'react-native-gesture-handler';
import React, {Component, useEffect} from 'react';
import {StatusBar, LogBox} from 'react-native';
import Routes from './src/routes';
import messaging from '@react-native-firebase/messaging';

import {Provider} from 'react-redux';
import {persistor, store} from './src/redux';
import {PersistGate} from 'redux-persist/integration/react';

LogBox.ignoreAllLogs(true);

const App = () => {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  async function getFcmToken() {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('Your Firebase Token is:', fcmToken);
    } else {
      console.log('Failed', 'No token received');
    }
  }

  useEffect(() => {
    requestUserPermission();
    getFcmToken();
  }, []);

  return (
    <>
      <StatusBar
        backgroundColor={'white'}
        translucent={false}
        barStyle="dark-content"
      />
          <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
        <Routes />
        </PersistGate>
      </Provider>
    </>
  );
};
export default App;
