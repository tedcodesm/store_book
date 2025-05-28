import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  TextInput,
  Alert,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons"; 

const SignupScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("Ted");
  const [email, setEmail] = useState("kaahenjoroge@gmail.com");
  const [password, setPassword] = useState("12345678");
  const [showPassword, setShowPassword] = useState(false); 

  const handleSignup = async () => {
    if (!username || !email || !password) {
      Alert.alert("Error", "All fields are required!");
      return;
    }

    try {
      const res = await axios.post("http://192.168.100.119:3000/api/auth/register", {
        username,
        email,
        password,
      });

      Alert.alert("Success", res.data.message || "Account created!");
      navigation.navigate("otp", { email });
    } catch (error) {
      Alert.alert("Signup Failed", error.response?.data?.message);
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
          <View className="flex-1 items-center bg-lime-500 py-8 justify-center">
            <View className="h-56">
              <Image
                className="w-40 h-60 object-cover"
                resizeMode="contain"
                source={require("../assets/sign.png")}
              />
            </View>

            <View className="bg-white w-full flex-1 flex-col space-y-7 gap-7 rounded-t-xl items-center py-4">
              <Text className="text-2xl font-semibold tracking-wider">Signup</Text>

              <TextInput
                className="py-4 rounded-full px-4 bg-neutral-200 w-80"
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
              />
              <TextInput
                className="py-4 rounded-full px-4 bg-neutral-200 w-80"
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
              />

              {/* Password with Eye Icon */}
              <View className="w-80 bg-neutral-200 flex-row items-center rounded-full px-4">
                <TextInput
                  className="flex-1 py-4"
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  value={password}
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
                onPress={handleSignup}
              >
                <Text className="text-lg text-white font-semibold">Signup</Text>
              </TouchableOpacity>

              <View className="flex-row items-center justify-center pt-4">
                <Text className="text-gray-400 text-lg">Already have an account?</Text>
                <Pressable onPress={() => navigation.navigate("login")}>
                  <Text className="text-lg font-semibold px-4 text-teal-400">Login</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;
