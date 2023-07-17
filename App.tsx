import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


import { NativeBaseProvider } from "native-base";
import { Provider } from 'react-redux';
import { store } from 'store/store';

import AppNavigations from 'navigations/AppNavigations';
import Color from 'common/color';


export default function App() {

  return (
    <GestureHandlerRootView style={{ flex: 1 }} >
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: Color.secondary }}>
          <NativeBaseProvider>
            <Provider store={store}>
              <NavigationContainer>
                <AppNavigations />
              </NavigationContainer>
            </Provider>
          </NativeBaseProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}