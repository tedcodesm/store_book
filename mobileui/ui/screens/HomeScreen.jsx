import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import React from "react";

const HomeScreen = ({ navigation }) => {
  return (
    <View className="flex-1 flex-col items-start h-screen justify-start bg-black font-serif">
      <StatusBar barStyle="light-content" backgroundColor="#fb923c" />
      <View className="bg-orange-400 justify-between  h-12  w-full px-2"></View>
      <View className="flex-1 items-center h-12 justify-start py- px- w-full bg-slate-100 font-serif">
        <View className="flex-row bg-orange-400  h-14 rounded-b-xl items-center justify-between w-full">
          <Pressable
            onPress={() => navigation.navigate("library")}
            className=" py-3 px-4"
          >
            <Icon name="menu" size={30} color="white" />
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("library")}
            className=" py-3 px-4"
          >
            <Text className="text-xl font-extrabold  text-white font-serif">Booknest</Text>
          </Pressable>
        </View>
        <View className="w-full mt-4 px-2">
          <TextInput
            className="py-3 px-4 rounded-full bg-gray-200"
            placeholder="search book"
          />
        </View>
        <View className="flex-1 flex-row flex-wrap justify-between px-2 w-full mt-5">
          <View className="h-40 w-[48%] rounded-2xl py-2 px-2 bg-red-700 mb-4">
            <Text>Book 1</Text>
            <Icon name="book" size={30} color="white" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
