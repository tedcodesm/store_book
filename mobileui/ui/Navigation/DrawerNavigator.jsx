import { View, Text, SafeAreaView, Image } from "react-native";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import BottomNavigator from "./BottomNavigator";
import LibraryScreen from "../screens/LibraryScreen";
import ReaderTest from "../screens/TestScreen";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <SafeAreaView>
            <View className="w-full justify-center rounded-br-3xl bg-orange-400 items-center space-y-3 h-80 mb-5">
              <Image
                className="w-24 h-24 rounded-full"
                source={require("../assets/woman.jpeg")}
                resizeMode="contain"
              />
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
        name="Library"
        component={LibraryScreen}
        options={{
          drawerLabel: "Library",
          drawerIcon: ({ color }) => (
            <Icon  className="mr-4" name="book" size={25} color="orange" />
          ),
        }}
      />
      <Drawer.Screen
        name="Test"
        component={ReaderTest}
        options={{
          drawerLabel: "Test Reader",
          drawerIcon: ({ color }) => (
            <Icon className="mr-4" name="book-open" size={25} color="orange" />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
