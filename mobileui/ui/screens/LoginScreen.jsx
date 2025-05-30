import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Ionicons from "react-native-vector-icons/Ionicons"; 

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("kaahenjoroge@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [showPassword, setShowPassword] = useState(false); 
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    try {
      const res = await axios.post("http://192.168.100.121:3000/api/auth/login", {
        email,
        password,
      });

      const token = res.data.token;
     await AsyncStorage.setItem("token", token);
      Alert.alert("Success", res.data.message || "Login successful!");
      navigation.navigate("bottom");
    } catch (error) {
      Alert.alert(
        "Login Failed",
        error.response?.data?.message || "Invalid credentials"
      );
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 items-center bg-lime-500 justify-center">
            <View className="h-56">
              <Image
                className="w-40 h-80 object-cover"
                resizeMode="contain"
                source={require("../assets/bro.png")}
              />
            </View>

            <View className="bg-white w-full flex-1 flex-col space-y-7 gap-7 rounded-t-xl items-center py-4">
              <Text className="text-2xl font-semibold tracking-wider">Login</Text>

              <TextInput
                className="py-4 rounded-full px-4 bg-neutral-200 w-80"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
              />

              <View className="w-80 bg-neutral-200 flex-row items-center rounded-full px-4">
                <TextInput
                  className="flex-1 py-4"
                  placeholder="Password"
                  value={password}
                  secureTextEntry={!showPassword}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={24}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                className="py-4 rounded-full bg-lime-400 items-center text-white w-80"
                onPress={handleLogin}
              >
                <Text className="text-lg text-white font-semibold">Login</Text>
              </TouchableOpacity>

              <View className="flex-row items-center justify-center pt-4">
                <Text className="text-gray-400 text-lg">Don't have an account?</Text>
                <Pressable onPress={() => navigation.navigate("signup")}>
                  <Text className="text-lg font-semibold px-4 text-teal-400">Signup</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
