import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import Color from 'common/color';

// Icons
import { FontAwesome } from '@expo/vector-icons';

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
  const { saveHistory, saveLocalStorage } = useSelector((state: any) => state.auth)
  return (
    <Tab.Navigator screenOptions={
      {
        headerShown: false,
        tabBarActiveTintColor: Color.primary,
        tabBarInactiveTintColor: Color.gray,
      }
    }>
      <Tab.Screen name="Tara" component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="qrcode" size={size} color={color} />
          ),
        }}
      />
      {saveHistory &&
        <Tab.Screen name="Geçmiş" component={SettingsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="history" size={size} color={color} />
            ),
          }}
        />
      }
      {saveLocalStorage &&
        <Tab.Screen name="Kayıtlar" component={SettingsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="save" size={size} color={color} />
            ),
          }}
        />
      }
      <Tab.Screen name="Ayarlar" component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="cog" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}