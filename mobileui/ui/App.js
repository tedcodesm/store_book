import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import "./global.css"
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import StackNavigator from './Navigation/StackNavigator';
import BottomNavigator from './Navigation/BottomNavigator';
import VerifyOTP from './screens/OtpScreen';


export default function App() {
  return (
   <StackNavigator/>
  );
}


