import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LibraryScreen from '../screens/LibraryScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import VerifyOTP from '../screens/OtpScreen';
import ReaderScreen from '../screens/ReaderScreen';
import ReaderTest from '../screens/TestScreen';
import DrawerNavigator from './DrawerNavigator';
import MyBooksScreen from '../screens/RecomendationScreen';
import BookListScreen from '../screens/BookListScreen';
import CreateBookScreen from '../screens/CreateBookScreen';
import ContentScreen from '../screens/ContentScreen';
import InteligentScreen from '../screens/InteligentScreen';

const Stack = createStackNavigator();
const StackNavigator = () => {
  return (
  <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name="splash" component={SplashScreen} options={{headerShown:false}} />
    <Stack.Screen name="bottom" component={DrawerNavigator} options={{headerShown:false}} />
    <Stack.Screen name="profile" component={ProfileScreen} options={{headerShown:false}} />
    <Stack.Screen name="library" component={LibraryScreen} options={{headerShown:false}} />
    <Stack.Screen name="login" component={LoginScreen} options={{headerShown:false}} />
    <Stack.Screen name="signup" component={SignupScreen} options={{headerShown:false}} />
    <Stack.Screen name="otp" component={VerifyOTP} options={{headerShown:false}} />
    <Stack.Screen name="read" component={ReaderScreen} options={{headerShown:false}} />
    <Stack.Screen name="test" component={ReaderTest} options={{headerShown:false}} />
    <Stack.Screen name="mine" component={MyBooksScreen} options={{headerShown:false}} />
    <Stack.Screen name="list" component={BookListScreen} options={{headerShown:false}} />
    <Stack.Screen name="create" component={CreateBookScreen} options={{headerShown:false}} />
    <Stack.Screen name="content" component={ContentScreen} options={{headerShown:false}} />
    <Stack.Screen name="int" component={InteligentScreen} options={{headerShown:false}} />
    </Stack.Navigator>

  </NavigationContainer>
  )
}

export default StackNavigator