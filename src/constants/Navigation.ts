import {Screens} from '../navigation/types';

export const NAV_ITEMS = [
  {id: '1', title: 'HOME', route: 'Home'},
  {id: '2', title: 'MOVIES', route: 'Movies'},
] as const;

export type NavRoute = (typeof NAV_ITEMS)[number]['route'];

export const NAV_ITEM_TO_SCREEN: Record<NavRoute, Screens> = {
  Home: Screens.HOME_SCREEN,
  Movies: Screens.MOVIE_SCREEN,
};
