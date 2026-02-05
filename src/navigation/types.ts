import {MediaType} from '../constants/Media';

export enum Screens {
  HOME_SCREEN = 'HomeScreen',
  DETAILS_SCREEN = 'DetailsScreen',
  PLAYER_SCREEN = 'PlayerScreen',
  MOVIE_SCREEN = 'MovieScreen',
  APP_DRAWER = 'AppDrawer',
}

export type AppStackParamList = {
  [Screens.HOME_SCREEN]: undefined;
  [Screens.DETAILS_SCREEN]: {
    id: string;
    title: string;
    focusId: string;
    type: MediaType;
  };
  [Screens.PLAYER_SCREEN]: {videoUrl?: string; returnFocusId: string};
  [Screens.MOVIE_SCREEN]: undefined;
  [Screens.APP_DRAWER]: undefined;
};

export enum DrawerType {
  PERMANENT = 'permanent',
  FRONT = 'front',
  SLIDE = 'slide',
  BACK = 'back',
}
