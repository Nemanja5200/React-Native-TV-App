import React from 'react';
import {createStackNavigator} from '@amazon-devices/react-navigation__stack';
import {Screens, AppStackParamList} from './types';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailPage/DetailScreen';

const Stack = createStackNavigator<AppStackParamList>();

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}>
      <Stack.Screen name={Screens.HOME_SCREEN} component={HomeScreen} />
      <Stack.Screen name={Screens.DETAILS_SCREEN} component={DetailsScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
