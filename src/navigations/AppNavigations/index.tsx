import { View, Text } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import Color from 'common/color';

// Screens
import { ScanScreen } from 'screens/index';

// Icons
import { FontAwesome } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

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
        tabBarStyle: {
          backgroundColor: Color.secondary,
          height: 50
        },
        tabBarLabelStyle: {
          paddingBottom: 5
        }

      }}
      sceneContainerStyle={{
        backgroundColor: Color.secondary,
      }}

    >
      <Tab.Screen name="Scan" component={ScanScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="qrcode" size={size} color={color} />
          ),
        }}
      />
      {saveHistory &&
        <Tab.Screen name="History" component={SettingsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="history" size={size} color={color} />
            ),
          }}
        />
      }
      {saveLocalStorage &&
        <Tab.Screen name="Records" component={SettingsScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="save" size={size} color={color} />
            ),
          }}
        />
      }
      <Tab.Screen name="Settings" component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="cog" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}