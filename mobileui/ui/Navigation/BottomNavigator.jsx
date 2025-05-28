import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from "../screens/HomeScreen";
import LibraryScreen from "../screens/LibraryScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ReaderTest from '../screens/TestScreen';
import CreateBookScreen from '../screens/CreateBookScreen';

const Tab = createBottomTabNavigator(); 

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "orange",
        tabBarInactiveTintColor: "black",
        tabBarStyle: { backgroundColor: "#e5e7eb" },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <Icon name="home" size={25} color={focused ? "orange" : "black"} />
          ),
        }}
      />
      <Tab.Screen
        name="library"
        component={LibraryScreen}
        options={{
          tabBarLabel: "Library",
          tabBarIcon: ({ focused }) => (
            <Icon name="library" size={25} color={focused ? "orange" : "black"} />
          ),
        }}
      />
     
      <Tab.Screen
        name="create"
        component={CreateBookScreen}
        options={{
          tabBarLabel: "Create",
          tabBarIcon: ({ focused }) => (
            <Icon name="plus-circle-outline" size={25} color={focused ? "orange" : "black"} />
          ),
        }}
      />
       <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ focused }) => (
            <Icon name="account" size={25} color={focused ? "orange" : "black"} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
