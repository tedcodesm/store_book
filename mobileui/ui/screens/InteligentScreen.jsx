import { useState } from "react";
import { KeyboardAvoidingView, TextInput, Text, View, Platform, TouchableOpacity, FlatList } from "react-native";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: "" });

const chatMessages = [
  { sender: 'you', message: 'Hello Gemini' },
  { sender: 'AI', message: 'My name is not Gemini, I am just AI' }
];

function ChatMessage({ item }) {
  const isYou = item.sender === 'you';

  return (
    <View
      className={`max-w-[70%] rounded-xl px-4 py-2 my-1 ${isYou ? "self-end bg-orange-500" : "self-start bg-gray-300"}`}
    >
      <Text className="text-xs font-semibold text-gray-700 mb-1">{item.sender}</Text>
      <Text className={`text-base ${isYou ? "text-white" : "text-black"}`}>{item.message}</Text>
    </View>
  );
}

export default function InteligentScreen() {
  const [messages, setMessages] = useState(chatMessages);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const makeAiInference = async () => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-lite",
        contents: inputText.trim() 
      });

      setLoading(false);

      const text = response.text;
      const aiResponse = {
        sender: 'AI',
        message: text,
      };
      setMessages([aiResponse, ...messages]);
    } catch (error) {
      console.error("AI error:", error);
      setLoading(false);
    }
  };

  const sendPrompt = () => {
    const trimmed = inputText.trim();
    if (trimmed.length === 0) return;

    const newMessage = {
      sender: 'you',
      message: trimmed,
    };

    setMessages([newMessage, ...messages]);
    setInputText('');
    setLoading(true);
    makeAiInference();
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-100"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <FlatList
        data={messages}
        renderItem={ChatMessage}
        keyExtractor={(_, index) => index.toString()}
        inverted
        contentContainerStyle={{ padding: 10, flexGrow: 1, justifyContent: 'flex-end' }}
      />

      {loading && <Text className="text-center text-gray-600 mb-2">Please Wait ...</Text>}

      <View className="flex-row items-center p-2 border-t border-gray-300 bg-white">
        <TextInput
          className="flex-1 px-4 py-2 bg-slate-200 rounded-full text-base"
          placeholder="Type a message"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity onPress={sendPrompt} className="ml-2 bg-orange-500 px-4 py-2 rounded-full">
          <Text className="text-white font-bold">Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
