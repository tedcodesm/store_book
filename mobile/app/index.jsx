import { Text, View, Image, TouchableOpacity, Pressable } from "react-native";
import "../global.css";
import { StatusBar } from "react-native";
import { Link } from "expo-router";

export default function Index({navigation}) {
  return (
    <View className="flex-1 relative bg-white h-screen">
      <StatusBar barStyle="light-content" backgroundColor="lime" />
      
        <Image className="object-fit relative" source={require("../assets/images/lib.jpeg")}/>
        <Text className="text-blue-400">Hello</Text>
       <View className="absolute bottom-14 right-16 z-4">
         <TouchableOpacity 
         onPress={() => navigation.navigate("(auth)")}
         className="py-4 rounded-full  bg-green-300 items-center text-white w-80">
               <Link href="/(auth)" className="text-lg text-lime- font-semibold">Continue</Link>
            </TouchableOpacity>
       
       </View>
    </View>
  );
}
