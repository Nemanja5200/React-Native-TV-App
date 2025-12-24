import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DetailScreen from './screens/DetailPage/DetailScreen';
import HomeScreen from './screens/HomeScreen';
import { ThemeProvider } from '@amazon-devices/kepler-ui-components';


const queryClient = new QueryClient();

export const App = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <HomeScreen />
      </QueryClientProvider>
    </ThemeProvider>
  );
};