import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@amazon-devices/react-navigation__native';
import {
  Platform,
  useHideSplashScreenCallback,
  usePreventHideSplashScreen,
} from '@amazon-devices/react-native-kepler';
import {Provider} from 'react-redux';
import {store} from './store';
import AppStack from './navigation/AppStack';

export const App = () => {
  const isTv = Platform.isTV;
  const preventHideSplashScreen = usePreventHideSplashScreen;
  const hideSplashScreen = useHideSplashScreenCallback();

  if (isTv) {
    console.log('Here');
    preventHideSplashScreen();
  }

  if (__DEV__) {
    console.log('Hidding here');
    hideSplashScreen();
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </Provider>
  );
};
