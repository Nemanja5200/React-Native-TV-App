import React from 'react';
import {createStackNavigator} from '@amazon-devices/react-navigation__stack';
import {Screens, AppStackParamList} from './types';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailPage/DetailScreen';
import MovieScreen from '../screens/MovieScreen';
import Layout from '../components/Layout';
import {useNavigationState} from '@amazon-devices/react-navigation__native';
import PlayerScreen from '../screens/PlayerScreen';

const Stack = createStackNavigator<AppStackParamList>();

const ROUTES_WITHOUT_HEADER = [Screens.DETAILS_SCREEN, Screens.PLAYER_SCREEN];

const AppStack = () => {
  const currentScreen = useNavigationState(
    (state) => state?.routes?.[state.index]?.name,
  );

  const shouldShowHeader = !ROUTES_WITHOUT_HEADER.includes(currentScreen);

  const navigationOptions = {
    headerShown: false,
    animationEnabled: false,
    detachInactiveScreens: false,
  };

  return (
    <Layout showHeader={shouldShowHeader}>
      <Stack.Navigator screenOptions={navigationOptions}>
        <Stack.Screen name={Screens.HOME_SCREEN} component={HomeScreen} />
        <Stack.Screen name={Screens.DETAILS_SCREEN} component={DetailsScreen} />
        <Stack.Screen name={Screens.MOVIE_SCREEN} component={MovieScreen} />
        <Stack.Screen name={Screens.PLAYER_SCREEN} component={PlayerScreen} />
      </Stack.Navigator>
    </Layout>
  );
};

export default AppStack;
