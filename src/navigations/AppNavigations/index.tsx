import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View>
      <Text>SettingsScreen</Text>
    </View>
  );
}

export default function AppNavigations() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  )
}