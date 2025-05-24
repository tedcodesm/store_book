import { View, Text ,Pressable,TouchableOpacity,Image,ScrollView} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { StatusBar } from "expo-status-bar";


const ProfileScreen = ({navigation}) => {
  return (
    <View className="flex-1 bg-gray-200">
        <StatusBar style="light"/>
    <View className="flex-row bg-orange-600 py-8 justify-between px-2">
    <View className="flex-row items-center space-x-2">
    <TouchableOpacity
    onPress={(()=>navigation.goBack())}
    >
      <Icon name="chevron-left" size={30} color="white" />
    </TouchableOpacity>
    <Text className="text-lg font-bold text-white">Profile Screen</Text>
    </View>
    <View className="">
    <TouchableOpacity>
        <Icon name='bell-ring' size={30} color="white"/>
     </TouchableOpacity>
    </View>
    </View>
    <ScrollView vertical={true}>

    <View className="items-center justify-center py-8 ">
      <View className="border border-red-600 border-4 rounded-full">
      <Image  className="w-24 h-24 rounded-full  object-fit" source={require("../assets/woman.jpeg")}/>

        </View>            
        <Text className="text-center pt-2 text-lg text-orange-400">Mr Edward Njoroge</Text>
        <Text className="text-center  text-lg ">Kaahenjoroge@gmail.com</Text>
        </View>

        <View className="items-center justify-center space-y-4 pb-8">

        <View className="border border-gray-300 border-2 w-80 h-40 rounded-md bg-white">
        <Text className="text-lg text-orange-400 py-2 px-2 font-bold">Personal info</Text>
        <View className="flex-row justify-between px-4 py-2">
            <View className="flex-row">
                <Icon name='human' size={30} color="orange"/>
                <View className="flex-col px-2"> 
                  <Text className="text-gray-400">sex</Text>
                  <Text>Male</Text>
                </View>

            </View>
            <View className="flex-row">
                <Icon name='cake-variant' size={30} color="orange"/>
                <View className="flex-col px-2"> 
                  <Text className="text-gray-400">Dte of Birth</Text>
                  <Text>Male</Text>
                </View>

            </View>

        </View>
        <View className="flex-row justify-between px-4 py-2">
            <View className="flex-row">
                <Icon name='passport' size={30} color="orange"/>
                <View className="flex-col px-2"> 
                  <Text className="text-gray-400">ID Type</Text>
                  <Text>National Number</Text>
                </View>

            </View>
            <View className="flex-row">
                <Icon name='passport' size={30} color="orange"/>
                <View className="flex-col px-2"> 
                  <Text className="text-gray-400">ID Number</Text>
                  <Text>42176876</Text>
                </View>
</View>

        </View>
        </View>

        <View className="border border-gray-300 border-1 w-80 flex-row items-center justify-start px-4 bg-white h-16 rounded-md ">
         <Icon name='phone' size={30} color="orange"/>
         <View className="flex-col px-2"> 
        <Text className=" text-gray-400 ">Mobile Number</Text>
        <Text className="  ">743080538</Text>
         </View>
         </View>
        <View className="border border-gray-300 border-1 w-80 flex-row items-center justify-start px-4 bg-white h-16 rounded-md ">
         <Icon name='flag' size={30} color="orange"/>
         <View className="flex-col px-2"> 
        <Text className=" text-gray-400 ">Nationality</Text>
        <Text className="  ">Kenyan</Text>
         </View>
         </View>
        <View className="border border-gray-300 border-1 w-80 flex-row items-center justify-start px-4 bg-white h-16 rounded-md ">
         <Icon name='cube' size={30} color="orange"/>
         <View className="flex-col px-2"> 
        <Text className=" text-gray-400 ">Languange</Text>
        <Text className="  ">N/A</Text>
         </View>
         </View>
        <View className="border border-gray-300 border-1  w-80 flex-row items-center justify-start px-4 bg-white h-16 rounded-md ">
         <Icon name='wheelchair-accessibility' size={30} color="orange"/>
         <View className="flex-col px-2"> 
        <Text className=" text-gray-400 ">Disability</Text>
        <Text className="  ">N/A</Text>
         </View>
         </View>

    </View>
    </ScrollView>
 </View>
  )
}

export default ProfileScreen