import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LibraryScreen from '../screens/LibraryScreen';
import BottomNavigator from './BottomNavigator';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import VerifyOTP from '../screens/OtpScreen';
import ReaderScreen from '../screens/ReaderScreen';

const Stack = createStackNavigator();
const StackNavigator = () => {
  return (
  <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name="splash" component={SplashScreen} options={{headerShown:false}} />
    <Stack.Screen name="bottom" component={BottomNavigator} options={{headerShown:false}} />
    <Stack.Screen name="profile" component={ProfileScreen} options={{headerShown:false}} />
    <Stack.Screen name="library" component={LibraryScreen} options={{headerShown:false}} />
    <Stack.Screen name="login" component={LoginScreen} options={{headerShown:false}} />
    <Stack.Screen name="signup" component={SignupScreen} options={{headerShown:false}} />
    <Stack.Screen name="otp" component={VerifyOTP} options={{headerShown:false}} />
    <Stack.Screen name="read" component={ReaderScreen} options={{headerShown:false}} />
    </Stack.Navigator>

  </NavigationContainer>
  )
}

export default StackNavigator