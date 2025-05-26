import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import axios from "axios";

export default function VerifyOTP({ route, navigation }) {
  const email = route?.params?.email || "";
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleVerify = async () => {
    try {
      const res = await axios.post("http://192.168.100.115:3000/api/auth/verify", {
        email,
        otp,
      });

      setMessage(res.data.message);
      navigation.navigate("login");
    } catch (err) {
      setMessage(err.response?.data?.message || "Verification failed");
      Alert.alert(
        "Error",
        err.response?.data?.message || "Verification failed"
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 justify-center gap-7 items-center p-4">
          <Image className="w-96 h-52" source={require("../assets/otp.png")} />
          <Text className="font-bold text-xl font-serif text-center">
            Enter the OTP sent to your email
          </Text>
          <TextInput
            className="w-[80%] h-12 px-4 border border-gray-300 rounded-md"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
            maxLength={6}
            placeholder="Enter 6-digit OTP"
          />
          <TouchableOpacity
            className="w-[80%] h-12 px-4 bg-green-400 rounded-xl flex items-center justify-center"
            onPress={handleVerify}
          >
            <Text className="text-white font-bold text-xl">Verify OTP</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
