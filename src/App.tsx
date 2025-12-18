import HomeScreen from './screens/HomeScreen';
import {ThemeProvider} from '@amazon-devices/kepler-ui-components';

export const App = () => {
  return (
    <ThemeProvider>
      <HomeScreen />
    </ThemeProvider>
  );
};
