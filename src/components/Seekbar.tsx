import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SeekBar as KUICSeekbar} from '@amazon-devices/kepler-ui-components';
import {TVFocusGuideView} from '@amazon-devices/react-native-kepler';
import {PlayerRef} from './Player';
import {COLORS} from '../styles/Colors';
import {formatTime} from '../utils/TimeFormat';

const SEEKBAR_STEP = 10;
const STEP_MULTIPLIER_FACTOR = 1;
const STEP_MULTIPLIER_INTERVAL = 1000;
const LONG_PRESS_INTERVAL_DURATION = 200;
const LONG_PRESS_DELAY = 1000;
const MAX_STEP_VALUE = 50;
const ANIMATION_DURATION = 200;

interface SeekBarProps {
  playerRef: React.RefObject<PlayerRef>;
  onSeekStart?: () => void;
  onSeekEnd?: () => void;
}

const Seekbar = ({playerRef, onSeekStart, onSeekEnd}: SeekBarProps) => {
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isSkipping, setIsSkipping] = useState(false);
  const isSkippingRef = useRef(false);
  const seekBarRef = useRef(null);

  // Update progress every second
  useEffect(() => {
    const updateProgress = () => {
      const videoPlayer = playerRef.current?.getVideoPlayer();
      if (videoPlayer && !isSkippingRef.current) {
        setProgress(videoPlayer.currentTime || 0);
        setDuration(videoPlayer.duration || 0);
      }
    };

    const interval = setInterval(updateProgress, 1000);
    return () => clearInterval(interval);
  }, [playerRef]);

  const seek = useCallback(
    (value: number) => {
      const videoPlayer = playerRef.current?.getVideoPlayer();
      if (videoPlayer && typeof videoPlayer.currentTime === 'number') {
        setProgress(value);
        videoPlayer.fastSeek?.(value) || (videoPlayer.currentTime = value);
        videoPlayer.play();
        isSkippingRef.current = false;
        onSeekEnd?.();
      }
    },
    [playerRef, onSeekEnd],
  );

  const pauseVideo = useCallback(() => {
    const videoPlayer = playerRef.current?.getVideoPlayer();
    if (!videoPlayer?.paused) {
      videoPlayer?.pause();
    }
  }, [playerRef]);

  const handleOnSlidingStart = useCallback(() => {
    pauseVideo();
    setIsSkipping(true);
    isSkippingRef.current = true;
    onSeekStart?.();
  }, [pauseVideo, onSeekStart]);

  const handleOnSlidingEnd = useCallback(() => {
    setIsSkipping(true);
    isSkippingRef.current = true;
  }, []);

  const onRewindPressHandler = useCallback(() => {
    pauseVideo();
    setIsSkipping(true);
    isSkippingRef.current = true;
  }, [pauseVideo]);

  const onFastForwardPressHandler = useCallback(() => {
    pauseVideo();
    setIsSkipping(true);
    isSkippingRef.current = true;
  }, [pauseVideo]);

  const onPressSelectButtonHandler = useCallback(
    (value: number) => {
      const videoPlayer = playerRef.current?.getVideoPlayer();
      if (isSkippingRef.current) {
        setIsSkipping(false);
        seek(value);
      } else {
        videoPlayer?.paused ? videoPlayer?.play() : videoPlayer?.pause();
      }
    },
    [playerRef, seek],
  );

  const onPressPlayPauseButtonHandler = useCallback(
    (value: number) => {
      if (isSkippingRef.current) {
        setIsSkipping(false);
        seek(value);
      }
    },
    [seek],
  );

  const getThumbIcon = useCallback(
    ({focused}: {focused: boolean}) => (
      <View style={[styles.thumb, focused && styles.thumbFocused]} />
    ),
    [],
  );

  const getIndicatorColor = useCallback(
    (focused: boolean) => (focused ? '#ED1C24' : '#888888'),
    [],
  );

  const getThumbnailLabel = useCallback(
    (value: number) => formatTime(value),
    [],
  );

  if (!duration) return null;

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <Text style={styles.time}>{formatTime(progress)}</Text>

        <TVFocusGuideView style={styles.seekbar}>
          <KUICSeekbar
            ref={seekBarRef}
            currentValue={progress}
            totalValue={duration}
            disabledWhenNotFocused={true}
            disableThumbnail={!isSkipping}
            step={SEEKBAR_STEP}
            stepMultiplierFactor={STEP_MULTIPLIER_FACTOR}
            stepMultiplierFactorInterval={STEP_MULTIPLIER_INTERVAL}
            longPressIntervalDuration={LONG_PRESS_INTERVAL_DURATION}
            longPressDelay={LONG_PRESS_DELAY}
            maxStepValue={MAX_STEP_VALUE}
            trapFocus
            enableSkipForwardBackwardAcceleration={true}
            enableLongPressAcceleration={true}
            enableAnimations={true}
            animationDuration={ANIMATION_DURATION}
            thumbIcon={getThumbIcon}
            thumbnailLabel={getThumbnailLabel}
            currentValueIndicatorColor={getIndicatorColor}
            onSlidingStart={handleOnSlidingStart}
            onSlidingEnd={handleOnSlidingEnd}
            onFastForwardPress={onFastForwardPressHandler}
            onRewindPress={onRewindPressHandler}
            onPress={onPressSelectButtonHandler}
            onPlayPause={onPressPlayPauseButtonHandler}
            testID="player-seekbar"
          />
        </TVFocusGuideView>

        <Text style={styles.time}>{formatTime(duration)}</Text>
      </View>
    </View>
  );
};

export default memo(Seekbar);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 40,
    paddingHorizontal: 40,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seekbar: {
    flex: 1,
    marginHorizontal: 20,
  },
  time: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    minWidth: 80,
    textAlign: 'center',
  },
  thumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  thumbFocused: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ED1C24',
  },
});
