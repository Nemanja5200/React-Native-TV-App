import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import Header from './Header';

type Props = {
  children: React.ReactNode;
  showHeader?: boolean;
};

const Layout = ({showHeader = true, children}) => {
  return (
    <View style={styles.container}>
      {children}

      <View style={[styles.headerOverlay, !showHeader && styles.hidden]}>
        <Header />
      </View>
    </View>
  );
};

export default memo(Layout);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  hidden: {
    opacity: 0,
    pointerEvents: 'none',
  },
});
