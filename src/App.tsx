import {ThemeProvider} from '@amazon-devices/kepler-ui-components';
import {NavigationContainer} from '@amazon-devices/react-navigation__native';
import AppStack from './navigation/AppStack';
import React from 'react';
import {Provider} from 'react-redux';
import {store} from './store';
export const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <NavigationContainer>
          <AppStack />
        </NavigationContainer>
      </ThemeProvider>
    </Provider>
  );
};
