import React, { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as Speech from 'expo-speech';

const ReaderTest = () => {
  const testText = "hakuna matata, what a wonderful phrase. Hakuna matata, ain't no passing craze. It means no worries for the rest of your days. It's our problem-free philosophy, hakuna matata.";

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
