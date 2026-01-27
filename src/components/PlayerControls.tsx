// components/PlayerControls.tsx
import React, {memo, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import PlayerButton from './button/PlayerButton';

import {ICONS_IMAGES} from '../constants/Icons';
import {
  PlayerControleType,
  PLAYER_CONTROLS,
  PLAYER_CONTROL_ITEMS,
} from '../constants/PlayerNavElements';

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onSeekForward: () => void;
  onSeekBackward: () => void;
}

const PlayerControls = ({
  isPlaying,
  onPlayPause,
  onSeekForward,
  onSeekBackward,
}: PlayerControlsProps) => {
  const getOnPress = useCallback(
    (id: PlayerControleType) => {
      switch (id) {
        case PLAYER_CONTROLS.PLAY_PAUSE:
          return onPlayPause;
        case PLAYER_CONTROLS.MOVE_FORWARD:
          return onSeekForward;
        case PLAYER_CONTROLS.REWIND_BACKWARD:
          return onSeekBackward;
        default:
          return () => {};
      }
    },
    [onPlayPause, onSeekForward, onSeekBackward],
  );

  const getIcon = useCallback(
    (item: (typeof PLAYER_CONTROL_ITEMS)[0]) => {
      if (item.id === PLAYER_CONTROLS.PLAY_PAUSE) {
        return isPlaying ? ICONS_IMAGES.PAUSE : ICONS_IMAGES.PLAY;
      }
      return item.icon;
    },
    [isPlaying],
  );

  return (
    <View style={styles.container}>
      {PLAYER_CONTROL_ITEMS.map((item, index) => (
        <PlayerButton
          key={item.id}
          onClick={getOnPress(item.id)}
          icon={getIcon(item)}
          size={item.size}
          width={item.width}
          height={item.height}
          radius={item.width / 2}
          color="rgba(0,0,0,0.7)"
          borderColor="rgba(255,255,255,0.3)"
          hasTVPreferredFocus={item.id === PLAYER_CONTROLS.PLAY_PAUSE}
        />
      ))}
    </View>
  );
};

export default memo(PlayerControls);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 40,
  },
});
