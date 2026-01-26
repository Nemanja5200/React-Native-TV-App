import {memo, useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  useWindowDimensions,
  Platform,
  BackHandler,
} from 'react-native';
import {
  VideoPlayer,
  KeplerVideoSurfaceView,
  KeplerCaptionsView,
} from '@amazon-devices/react-native-w3cmedia';
import {
  ShakaPlayer,
  ShakaPlayerSettings,
} from '../mediaPlayer/shakaplayer/ShakaPlayer';
import {
  useNavigation,
  useRoute,
  RouteProp,
} from '@amazon-devices/react-navigation__native';
import {AppStackParamList, Screens} from '../navigation/types';
import {StackNavigationProp} from '@amazon-devices/react-navigation__stack';

const AUTOPLAY = true;
const DEFAULT_ABR_WIDTH: number = Platform.isTV ? 3840 : 1919;
const DEFAULT_ABR_HEIGHT: number = Platform.isTV ? 2160 : 1079;

type PlayerScreenNavigationProp = StackNavigationProp<AppStackParamList>;
type PlayerScreenRouteProp = RouteProp<
  AppStackParamList,
  Screens.PLAYER_SCREEN
>;

const PlayerScreen = () => {
  const navigation = useNavigation<PlayerScreenNavigationProp>();
  const route = useRoute<PlayerScreenRouteProp>();
  const {width: deviceWidth, height: deviceHeight} = useWindowDimensions();

  // Get video URI from route params or use default
  const videoUri =
    route.params?.uri ??
    'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';
  const drmScheme = route.params?.drmScheme ?? '';
  const drmLicenseUri = route.params?.drmLicenseUri ?? '';

  const currShakaPlayerSettings = useRef<ShakaPlayerSettings>({
    secure: false,
    abrEnabled: true,
    abrMaxWidth: DEFAULT_ABR_WIDTH,
    abrMaxHeight: DEFAULT_ABR_HEIGHT,
  });

  const player = useRef<any>(null);
  const videoPlayer = useRef<VideoPlayer | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [playerSettings] = useState<ShakaPlayerSettings>(
    currShakaPlayerSettings.current,
  );

  const content = {
    secure: 'false',
    uri: videoUri,
    drm_scheme: drmScheme,
    drm_license_uri: drmLicenseUri,
  };

  const cleanupPlayer = useCallback(async () => {
    console.log('PlayerScreen: cleaning up player');
    if (player.current) {
      player.current.unload();
      player.current = null;
    }
    if (videoPlayer.current) {
      videoPlayer.current.removeEventListener('ended', onEnded);
      videoPlayer.current.removeEventListener('error', onError);
      await videoPlayer.current.deinitialize();
      // @ts-ignore
      global.gmedia = null;
      videoPlayer.current = null;
    }
  }, []);

  const navigateBack = useCallback(async () => {
    await cleanupPlayer();
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.navigate(Screens.HOME_SCREEN);
    }
    return true;
  }, [navigation, cleanupPlayer]);

  const onEnded = useCallback(async () => {
    console.log('PlayerScreen: video ended');
    await navigateBack();
  }, [navigateBack]);

  const onError = useCallback((error: any) => {
    console.log('PlayerScreen: error occurred', error);
  }, []);

  const setUpEventListeners = useCallback(() => {
    console.log('PlayerScreen: setting up event listeners');
    videoPlayer.current?.addEventListener('ended', onEnded);
    videoPlayer.current?.addEventListener('error', onError);
  }, [onEnded, onError]);

  const initializeShaka = useCallback(() => {
    console.log('PlayerScreen: initializing Shaka player');
    if (videoPlayer.current !== null) {
      player.current = new ShakaPlayer(videoPlayer.current, playerSettings);
    }
    if (player.current !== null) {
      player.current.load(content, AUTOPLAY);
    }
  }, [playerSettings, content]);

  const initializeVideoPlayer = useCallback(async () => {
    console.log('PlayerScreen: initializing video player');
    videoPlayer.current = new VideoPlayer();
    // @ts-ignore
    global.gmedia = videoPlayer.current;
    await videoPlayer.current.initialize();
    setUpEventListeners();
    videoPlayer.current.autoplay = AUTOPLAY;
    initializeShaka();
    setIsReady(true);
  }, [setUpEventListeners, initializeShaka]);

  const onSurfaceViewCreated = useCallback((surfaceHandle: string) => {
    console.log('PlayerScreen: surface created');
    videoPlayer.current?.setSurfaceHandle(surfaceHandle);
    videoPlayer.current?.play();
  }, []);

  const onSurfaceViewDestroyed = useCallback((surfaceHandle: string) => {
    console.log('PlayerScreen: surface destroyed');
    videoPlayer.current?.clearSurfaceHandle(surfaceHandle);
  }, []);

  const onCaptionViewCreated = useCallback((captionsHandle: string) => {
    console.log('PlayerScreen: caption view created');
    videoPlayer.current?.setCaptionViewHandle(captionsHandle);
  }, []);

  // Initialize player on mount
  useEffect(() => {
    console.log('PlayerScreen: mounting');
    initializeVideoPlayer();

    return () => {
      console.log('PlayerScreen: unmounting');
      cleanupPlayer();
    };
  }, []);

  // Handle back button
  useEffect(() => {
    if (Platform.isTV) {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        navigateBack,
      );
      return () => backHandler.remove();
    }
  }, [navigateBack]);

  return (
    <View style={styles.container}>
      <KeplerVideoSurfaceView
        style={[styles.surfaceView, {width: deviceWidth, height: deviceHeight}]}
        onSurfaceViewCreated={onSurfaceViewCreated}
        onSurfaceViewDestroyed={onSurfaceViewDestroyed}
      />
      <KeplerCaptionsView
        onCaptionViewCreated={onCaptionViewCreated}
        style={styles.captionView}
      />
    </View>
  );
};

export default memo(PlayerScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  surfaceView: {
    zIndex: 0,
    backgroundColor: '#000000',
  },
  captionView: {
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    position: 'absolute',
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 2,
  },
});
