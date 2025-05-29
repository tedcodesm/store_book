// HomeScreen.jsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StatusBar,
  ScrollView,
  Pressable,
} from "react-native";
import * as Speech from "expo-speech";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import axios from "axios";

const API_BASE = "http://192.168.100.120:3000/api/books"; 

const HomeScreen = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("Gift");
  const [reading, setReading] = useState(false);
  const [readingTitle, setReadingTitle] = useState("");
  const [bookText, setBookText] = useState("");

  const fetchBooks = async (term) => {
    if (!term) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `${API_BASE}?search=${encodeURIComponent(term)}`
      );
      setBooks(res.data);
    } catch (e) {
      alert("Failed to load books");
    } finally {
      setLoading(false);
    }
  };
  const words = bookText.split(" "); // Split text into words

  const readBook = async (book) => {
    if (!book.textUrl) {
      alert("This book does not have a readable text format.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/${book.id}/text`);
      setBookText(res.data);
      setReading(true);
      setReadingTitle(book.title);
    } catch (e) {
      alert("Failed to load book text.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(query);
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchBooks(query.trim());
    }, 500);

    return () => clearTimeout(delay);
  }, [query]);

  const renderItem = ({ item }) => (
    <View className="flex-row w-full bg-white rounded-xl shadow-sm p-4 mb-4">
      <Image
        source={{ uri: item.cover || "https://via.placeholder.com/70x100" }}
        className="w-[70px] h-[100px] mr-4 rounded-md"
      />
      <View className="flex-1">
        <Text className="text-base font-bold text-gray-800">{item.title}</Text>
        <Text className="text-sm text-gray-500 mb-2">
          {item.authors || "Unknown"}
        </Text>
        <View className="w-full mt-3 justify-between flex-row">
          <TouchableOpacity
            className="bg-orange-300  py-1 rounded-full mt-1 w-24"
            onPress={async () => {
              try {
                await axios.post(`${API_BASE}/save`, item);
                alert("Book saved to your library.");
              } catch (err) {
                alert("Failed to save book.");
              }
            }}
          >
            <Text className="text-white text-center text-sm font-md">
              Save Book
            </Text>
          </TouchableOpacity>

          {item.textUrl && (
            <TouchableOpacity
              className="bg-orange-500  bg-opacity-50 py-1 rounded-full w-24"
              onPress={() => readBook(item)}
            >
              <Text className="text-white text-center text-sm font-md">
                Read in App
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  // Book Reader View
  if (reading && bookText) {
    const cleanText = bookText
      .slice(0, 4000)
      .replace(/[.*_,!?;:()\[\]{}'"-]/g, "");
    return (
      <View className="flex-1 mt-8 bg-white px-4 pt-6 pb-2">
        <Text className="text-xl font-bold mb-2">{readingTitle}</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text className="text-base leading-6 text-gray-700 whitespace-pre-line">
            {bookText}
          </Text>
        </ScrollView>

        {/* TTS Controls */}
        <View className="flex-row justify-between mt-4">
          <TouchableOpacity
            className="bg-green-600 py-3 px-4 rounded-full flex- mr-2"
            onPress={() => {
              console.log("Speaking...");
              if (bookText.length > 0) {
                Speech.speak(cleanText, {
                  language: "en-US",
                  rate: 0.9,
                });
              } else {
                console.log("No text to speak.");
              }
            }}
          >
            <Text className="text-white text-center font-bold">Play</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-red-600 py-3 px-4 rounded-full flex- mr-2"
            onPress={() => {
              console.log("Stopping speech...");
              Speech.stop();
            }}
          >
            <Text className="text-white text-center font-bold">stop</Text>
          </TouchableOpacity>
        </View>

        {/* Close Reader Button */}
        <TouchableOpacity
          className="bg-orange-500 py-3 rounded-full mt-4"
          onPress={() => {
            Speech.stop();
            setReading(false);
            setBookText("");
          }}
        >
          <Text className="text-white text-center font-bold">Close Reader</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-100">
      <StatusBar barStyle="light-content" backgroundColor="#fb923c" />
      <View className="bg-orange-400 h-12 w-full" />
      <View className="flex-row bg-orange-400 h-14 rounded-b-xl items-center justify-between px-4">
        <Pressable onPress={() => navigation.openDrawer()}>
          <Icon name="menu" size={30} color="white" />
        </Pressable>
        <Text className="text-xl font-extrabold text-white font-serif">
          Booknest
        </Text>
      </View>

      <View className="flex-row p-3 bg-gray-100">
        <TextInput
          className="flex-1 border border-gray-300 bg-white rounded-full px-4"
          placeholder="Search book "
          value={query}
          onChangeText={setQuery}
        />
        <Icon
          className="absolute right-5 bottom-4"
          name="magnify"
          size={28}
          color="orange"
        />
      </View>

      {loading ? (
        <View className="mt-6">
          <ActivityIndicator size="large" color="orange" />
        </View>
      ) : (
        (
          <FlatList
            data={books}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 12 }}
          />
        ) || (
          <Text className="text-black text-center font-bold">
            Book not found
          </Text>
        )
      )}
    </View>
  );
};

export default HomeScreen;
