import { View, Text, SafeAreaView, Image } from "react-native";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import BottomNavigator from "./BottomNavigator";
import LibraryScreen from "../screens/LibraryScreen";
import ReaderTest from "../screens/TestScreen";
import BookListScreen from "../screens/BookListScreen";
import CreateBookScreen from "../screens/CreateBookScreen";
import MyBooksScreen from "../screens/RecomendationScreen";
import InteligentScreen from "../screens/InteligentScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <SafeAreaView>
            <View className="w-full justify-center rounded-br-3xl bg-orange-400 items-center space-y-3 h-40 mb-5">
              
            </View>
            <DrawerItemList {...props} />
          </SafeAreaView>
        );
      }}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: "#f0f0f0",
        drawerActiveTintColor: "#000",
        drawerInactiveTintColor: "#888",
        drawerLabelStyle: { marginLeft: -20, fontSize: 16 },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={BottomNavigator}
        options={{
          drawerLabel: "Home",
          drawerIcon: ({ color }) => (
            <Icon className="mr-4" name="home" size={25} color="orange" />
          ),
        }}
      />
      <Drawer.Screen
        name="list"
        component={BookListScreen}
        options={{
          drawerLabel: "View Books",
          drawerIcon: ({ color }) => (
            <Icon className="mr-4" name="book-open" size={25} color="orange" />
          ),
        }}
      />
      <Drawer.Screen
        name="int"
        component={InteligentScreen}
        options={{
          drawerLabel: "Ai summary",
          drawerIcon: ({ color }) => (
            <Icon className="mr-4" name="chat" size={25} color="orange" />
          ),
        }}
      />
      <Drawer.Screen
        name="create"
        component={CreateBookScreen}
        options={{
          drawerLabel: "Create Book",
          drawerIcon: ({ color }) => (
            <Icon className="mr-4" name="book-plus" size={25} color="orange" />
          ),
        }}
      />
      <Drawer.Screen
        name="library"
        component={LibraryScreen}
        options={{
          drawerLabel: "My Library",
          drawerIcon: ({ color }) => (
            <Icon className="mr-4" name="library" size={25} color="orange" />
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        component={ProfileScreen}
        options={{
          drawerLabel: "Profile",
          drawerIcon: ({ color }) => (
            <Icon className="mr-4" name="account" size={25} color="orange" />
          ),
        }}
      />
    
      
      
      
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
