import React, {memo, useCallback, useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from '@amazon-devices/react-linear-gradient';
import PlayerButton from '../components/button/PlayerButton';
import Player, {PlayerRef} from '../components/Player';
import PlayerControls from '../components/PlayerControls';
import {ICONS_IMAGES} from '../constants/Icons';
import {useNavigation} from '@amazon-devices/react-navigation__native';
import {Screens} from '../navigation/types';

const PlayerScreen = () => {
  const [showControls] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const navigation = useNavigation<any>();
  const playerRef = useRef<PlayerRef>(null);

  const handlePlayPause = useCallback(() => {
    if (isPlaying) {
      playerRef.current?.pause();
    } else {
      playerRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const handleSeekForward = useCallback(() => {
    playerRef.current?.seekFront();
  }, []);

  const handleSeekBackward = useCallback(() => {
    playerRef.current?.seekBack();
  }, []);

  const handleBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate(Screens.HOME_SCREEN);
    }
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Player ref={playerRef} />

      {showControls && (
        <View style={styles.overlay}>
          {/* Bottom gradient */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']}
            locations={[0, 0.5, 1]}
            style={styles.bottomGradient}
            pointerEvents="none"
          />

          <View style={styles.playerControls}>
            <View style={styles.backButton}>
              <PlayerButton
                onClick={handleBack}
                icon={ICONS_IMAGES.BACK}
                width={80}
                height={80}
                radius={40}
                size={32}
                color="rgba(0,0,0,0.7)"
                borderColor="rgba(255,255,255,0.3)"
                hasTVPreferredFocus
              />
            </View>

            <View style={styles.navButtons}>
              <PlayerControls
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
                onSeekForward={handleSeekForward}
                onSeekBackward={handleSeekBackward}
              />
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default memo(PlayerScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
  },

  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
  },

  playerControls: {
    ...StyleSheet.absoluteFillObject,
  },

  backButton: {
    position: 'absolute',
    top: 848,
    left: 121,
  },

  navButtons: {
    position: 'absolute',
    top: 836,
    left: 804,
    flexDirection: 'row',
    gap: 40,
  },
});
