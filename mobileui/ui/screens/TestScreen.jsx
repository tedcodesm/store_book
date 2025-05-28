import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as Speech from 'expo-speech';

const ReaderTest = () => {
  const testText = "💡 You’ve already come this far. Most people only think about building apps, but you're actually doing it — building a full backend, dealing with images, tokens, APIs... That’s not easy.The errors you're hitting now? They're signs you’re leveling up. Every Cannot read properties, every 500, every base64 hiccup — it's shaping you into a serious developer.One day soon, someone will ask you how you got so good. You’ll smile and remember today — when you were struggling, troubleshooting, and refusing to quit.";

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-lg mb-4">TTS</Text>
      <TouchableOpacity
        className="bg-green-600 py-3 px-6 rounded-full"
        onPress={() => {
          Speech.stop();
          Speech.speak(testText);
        }}
      >
        <Text className="text-white font-bold">Play</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReaderTest;
