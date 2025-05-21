import { Text, View, Image, TouchableOpacity, Pressable } from "react-native";
import "../global.css";
import { StatusBar } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 relative bg-white h-screen">
      <StatusBar barStyle="light-content" backgroundColor="red" />
        {/* <Image className="object-fit relative" source={require("../assets/images/lib.jpeg")}/> */}
        <Text className="text-blue-400">Hello</Text>
       <View className="absolute bottom-0 z-4">
         <TouchableOpacity className="py-4 rounded-full  bg-green-300 items-center text-white w-80">
               <Text className="text-lg text-lime- font-semibold">Login</Text>
            </TouchableOpacity>
       
       </View>
    </View>
  );
}
