import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Provider } from 'react-redux';
import { store } from 'store/store';

import AppNavigations from 'navigations/AppNavigations';


export default function App() {
  
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <AppNavigations />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}