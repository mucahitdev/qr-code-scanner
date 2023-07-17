import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { NativeBaseProvider } from "native-base";
import { Provider } from 'react-redux';
import { store } from 'store/store';

import AppNavigations from 'navigations/AppNavigations';


export default function App() {

  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <Provider store={store}>
          <NavigationContainer>
            <AppNavigations />
          </NavigationContainer>
        </Provider>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}