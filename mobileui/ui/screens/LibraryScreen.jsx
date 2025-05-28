import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ScrollView,
  StatusBar,
} from "react-native";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

const API_BASE = "http://192.168.100.119:3000/api/books"; // Replace with your backend URL

const LibraryScreen = ({navigation}) => {
  const [savedBooks, setSavedBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [reading, setReading] = useState(false);
  const [readingTitle, setReadingTitle] = useState(null);
  const [bookText, setBookText] = useState(null);

   const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) fetchLibrary();
  }, [isFocused]);

  const fetchLibrary = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/library`);
      setSavedBooks(res.data);
    } catch (e) {
      alert("Failed to load saved books");
    } finally {
      setLoading(false);
    }
  };

  const readBook = async (book) => {
    if (!book.textUrl) return alert("Text unavailable");
    setLoading(true);
    setReading(true);
    setReadingTitle(book.title);
    try {
      const res = await axios.get(`${API_BASE}/${book.id}/text`);
      setBookText(res.data);
    } catch (e) {
      alert("Failed to load book text.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLibrary();
  }, []);

  const renderItem = ({ item }) => (
    <View className="flex-row w-full bg-gray-100 rounded-lg p-3 mb-4">
      <Image
        source={{ uri: item.cover || "https://via.placeholder.com/70x100" }}
        className="w-[70px] h-[100px] mr-3 rounded-md"
      />
      <View className="flex-1">
        <Text className="text-base font-bold">{item.title}</Text>
        <Text className="text-sm text-gray-500">{item.authors || "Unknown"}</Text>
        {item.textUrl && (
          <TouchableOpacity onPress={() => readBook(item)}>
            <Text className="text-blue-500 mt-1">Read In App</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  if (reading && bookText) {
    return (
      <View className="flex-1 bg-white p-4">
        <Text className="text-lg font-bold mb-3">{readingTitle}</Text>
        <ScrollView>
          <Text className="text-base leading-6 whitespace-pre-wrap">{bookText}</Text>
        </ScrollView>
        <TouchableOpacity
          className="bg-orange-500 mt-4 py-3 rounded-full"
          onPress={() => {
            setReading(false);
            setBookText(null);
          }}
        >
          <Text className="text-center text-white text-lg">Close</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-slate-100 py-5 px-4 pt-4">
            <StatusBar barStyle="light-content" backgroundColor="#fb923c" />
      
<View className="mb-4 mt-8 flex-row items-center justify-between w-full">
  <TouchableOpacity
  onPress={() => navigation.goBack()}
  >
    <Icons name="arrow-left" size={24} color="orange" />

  </TouchableOpacity>
        <Text className="text-2xl font-bold text-orange-500 mb-4">My Library</Text>

</View>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : savedBooks.length === 0 ? (
        <Text className="text-center text-gray-500 mt-20">No books saved yet.</Text>
      ) : (
        <FlatList
          data={savedBooks}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

export default LibraryScreen;
