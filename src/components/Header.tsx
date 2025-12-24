import React, {useRef} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {IMAGES} from '../constants/Assets';
import {NAV_ITEMS} from '../constants/Navigation';
import NavItem from './NavItem';
import {useNodeHandle} from '../hooks/useNodeHandle';

const Header = () => {
  const navRef0 = useRef(null);
  const navRef1 = useRef(null);

  const navRefs = [navRef0, navRef1];

  const navHandle0 = useNodeHandle(navRef0);
  const navHandle1 = useNodeHandle(navRef1);

  const navHandles = [navHandle0, navHandle1];

  return (
    <View style={styles.container}>
      <Image source={IMAGES.Logo} style={styles.logo} resizeMode="contain" />
      <View style={styles.navContainer}>
        {NAV_ITEMS.map((item, index) => {
          const isFirstItem = index === 0;
          const isLastItem = index === NAV_ITEMS.length - 1;

          return (
            <NavItem
              key={item.id}
              ref={navRefs[index]}
              title={item.title}
              hasTVPreferredFocus={isFirstItem}
              nextFocusRight={
                isLastItem ? navHandles[index] || undefined : undefined
              }
              nextFocusLeft={
                isFirstItem ? navHandles[index] || undefined : undefined
              }
            />
          );
        })}
      </View>
    </View>
  );
};

export default React.memo(Header);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 32,
    gap: 48,
  },
  logo: {
    width: 305,
    height: 60,
  },
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 32,
  },
});
