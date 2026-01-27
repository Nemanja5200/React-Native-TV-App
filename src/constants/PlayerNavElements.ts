import {ICONS_IMAGES} from './Icons';

export const PLAYER_CONTROLS = {
  REWIND_BACKWARD: 'rewindBackward',
  PLAY_PAUSE: 'playPause',
  MOVE_FORWARD: 'moveForward',
} as const;

export type PlayerControleType =
  (typeof PLAYER_CONTROLS)[keyof typeof PLAYER_CONTROLS];

export interface PlayerControlItem {
  id: PlayerControleType;
  icon: any;
  size: number;
  width: number;
  height: number;
}

export const PLAYER_CONTROL_ITEMS: PlayerControlItem[] = [
  {
    id: PLAYER_CONTROLS.REWIND_BACKWARD,
    icon: ICONS_IMAGES.MOVE_BACKWARDS,
    size: 24,
    width: 56,
    height: 56,
  },
  {
    id: PLAYER_CONTROLS.PLAY_PAUSE,
    icon: ICONS_IMAGES.PAUSE,
    size: 32,
    width: 80,
    height: 80,
  },
  {
    id: PLAYER_CONTROLS.MOVE_FORWARD,
    icon: ICONS_IMAGES.MOVE_FORWARDS,
    size: 24,
    width: 56,
    height: 56,
  },
];
