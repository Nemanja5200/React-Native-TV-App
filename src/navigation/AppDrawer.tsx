import {GestureHandlerRootView} from '@amazon-devices/react-native-gesture-handler';
import {
  createDrawerNavigator,
  DrawerContent,
} from '@amazon-devices/react-navigation__drawer';
import {memo} from 'react';
import {COLORS_AMAZON} from '../styles/Colors';
import {scaleUxToDp} from '../utils/pixelUtils';
import {DrawerType, Screens} from './types';
import React from 'react';
import {StyleSheet} from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import MovieScreen from '../screens/MovieScreen';

const AppDrawer = () => {
  const Drawer = createDrawerNavigator();
  return (
    <GestureHandlerRootView
      testID="gesture-handler-root-view"
      style={styles.container}>
      <Drawer.Navigator
        initialRouteName={Screens.HOME_SCREEN}
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{
          drawerType: DrawerType.PERMANENT,
          drawerStyle: styles.drawer,
          headerShown: false,
        }}
        backBehavior="history">
        <Drawer.Screen name={Screens.HOME_SCREEN} component={HomeScreen} />
        <Drawer.Screen name={Screens.MOVIE_SCREEN} component={MovieScreen} />
      </Drawer.Navigator>
    </GestureHandlerRootView>
  );
};

export default memo(AppDrawer);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS_AMAZON.BLACK,
  },
  drawer: {
    backgroundColor: COLORS_AMAZON.TRANSPARENT,
    borderRightColor: COLORS_AMAZON.TRANSPARENT,
    width: scaleUxToDp(100),
  },
  imageIcon: {
    width: scaleUxToDp(30),
    height: scaleUxToDp(30),
    tintColor: COLORS_AMAZON.SMOKE_WHITE,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS_AMAZON.BLACK,
  },
});
