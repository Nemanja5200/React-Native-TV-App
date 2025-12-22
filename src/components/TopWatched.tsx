import React from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {FONTS} from '../constants/Fonts';
import {COLORS} from '../styles/Colors';

type Channel = {
  id: string;
  name: string;
  logo: ImageSourcePropType;
};

const CHANNELS: Channel[] = [
  {id: '1', name: 'Channel1', logo: require('../assets/ChannelLogo.png')},
  {id: '2', name: 'Channel2', logo: require('../assets/ChannelLogo.png')},
  {id: '3', name: 'Channel3', logo: require('../assets/ChannelLogo.png')},
  {id: '4', name: 'Channel4', logo: require('../assets/ChannelLogo.png')},
  {id: '5', name: 'Channel5', logo: require('../assets/ChannelLogo.png')},
];

const TopWatched = () => {
  const renderChannel = ({item}: {item: Channel}) => (
    <Pressable style={styles.channelCard}>
      <View style={styles.cardContent}>
        <Image source={item.logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.channelName}>{item.name}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Top 5 Channels</Text>

      <FlatList
        data={CHANNELS}
        renderItem={renderChannel}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default React.memo(TopWatched);

const styles = StyleSheet.create({
  container: {
    width: 312,
    height: 873,
    borderRadius: 16,
    backgroundColor: COLORS.BLACK,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 12,
  },

  heading: {
    fontFamily: FONTS.BOLD,
    fontSize: 24,
    marginBottom: 16,
    color: 'white',
  },

  listContent: {
    gap: 16,
  },

  channelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 280,
    height: 136,
    backgroundColor: COLORS.DARK_GREY,
    borderRadius: 16,
    padding: 12,
    gap: 12,
  },
  logo: {
    width: 40,
    height: 40,
  },
  channelName: {
    color: '#FFFFFF',
    fontSize: 16,
  },

  cardContent: {
    flex: 1,
    gap: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
