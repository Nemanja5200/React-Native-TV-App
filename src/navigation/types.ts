export enum Screens {
  HOME_SCREEN = 'HomeScreen',
  DETAILS_SCREEN = 'DetailsScreen',
  PLAYER_SCREEN = 'PlayerScreen',
  SEARCH_SCREEN = 'SearchScreen',
  SETTINGS_SCREEN = 'SettingsScreen',
}

export type AppStackParamList = {
  [Screens.HOME_SCREEN]: undefined;
  [Screens.DETAILS_SCREEN]: {id: string; title: string};
  [Screens.PLAYER_SCREEN]: {videoUrl: string};
  [Screens.SEARCH_SCREEN]: undefined;
  [Screens.SETTINGS_SCREEN]: undefined;
};
