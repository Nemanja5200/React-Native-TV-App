import {ThemeProvider} from '@amazon-devices/kepler-ui-components';
import {NavigationContainer} from '@amazon-devices/react-navigation__native';
import AppStack from './navigation/AppStack';
import React from 'react';
export const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </ThemeProvider>
  );
};
