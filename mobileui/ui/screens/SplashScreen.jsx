import { View, Text ,Image, Pressable,TouchableOpacity, ImageBackground, } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native";


const SplashScreen = ({navigation}) => {
  return (
  <View className="flex-1 relative justify-center items-center">
    <ImageBackground
      className="flex-1 w-full justify-center  items-center"
      source={require("../assets/md.jpeg")}
      resizeMode="cover"
    >
      
     
      
     

<TouchableOpacity 
onPress={()=>navigation.navigate("login")}
className="px-4 py-4 rounded-full justify-center absolute items-center bottom-10 bg-lime-400  w-full ">
  <Text className="text-white font-bold text-xl ">Welcome </Text>
  </TouchableOpacity>   
   </ImageBackground>
  </View>
  )
}

export default SplashScreen