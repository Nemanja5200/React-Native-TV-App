import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import Header from './Header';

type Props = {
  children: React.ReactNode;
  showHeader?: boolean;
  focusHeaderOnMount?: boolean;
};

const Layout = ({
  children,
  showHeader = true,
  focusHeaderOnMount = false,
}: Props) => {
  return (
    <View style={styles.container}>
      {showHeader && <Header />}
      <View style={styles.content}>{children}</View>
    </View>
  );
};
export default memo(Layout);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
