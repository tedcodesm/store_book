import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { contentBook } from "../api/book"; // make sure this function exists
import { useRoute, useNavigation } from "@react-navigation/native";

const ContentScreen = () => {
  const { params } = useRoute();
  const navigation = useNavigation();
  const { bookId } = params;

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBook = async () => {
    try {
      const res = await contentBook(bookId);
      setBook(res.data);
    } catch (error) {
      console.log("Error fetching book:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBook();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }

  if (!book) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-lg text-gray-600">Book not found</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-white px-4">
      <StatusBar barStyle="light-content" backgroundColor="#fb923c" />

      <View className="flex-row items-center justify-between pt-12 pb-2">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={28} color="orange" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-orange-500">{book.tittle}</Text>
        <View style={{ width: 28 }} />
      </View>

    

      <Text className="text-2xl font-bold mb-1"></Text>
      <Text className="text-sm text-gray-500 italic">
        Posted by: {book.user?.username}
      </Text>
      <Text className="text-base text-gray-600 mb-2">{book.caption}</Text>

      

      <Text className="text-base leading-6 text-gray-700 mb-6">
        {book.content}
      </Text>

      
    </ScrollView>
  );
}

export default ContentScreen