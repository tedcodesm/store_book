import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  TextInput,
  TouchableOpacity,
  Linking,
} from 'react-native';
import axios from 'axios';

const BooksScreen = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('programming');

  const fetchBooks = async (searchTerm = 'programming') => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}&maxResults=20`
      );
      setBooks(response.data.items || []);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(query);
  }, []);

  const handleSearch = () => {
    if (query.trim()) {
      fetchBooks(query);
    }
  };

  const renderItem = ({ item }) => {
    const { title, authors, imageLinks, previewLink } = item.volumeInfo;

    return (
      <View className="flex-row w-full bg-gray-100 rounded-lg p-3 mb-4">
        <Image
          source={{ uri: imageLinks?.thumbnail || 'https://via.placeholder.com/70x100' }}
          className="w-[70px] h-[100px] mr-3 rounded-md"
        />
        <View className="flex-1">
          <Text className="text-base font-bold">{title}</Text>
          <Text className="text-sm text-gray-500">{authors?.join(', ')}</Text>
          <TouchableOpacity onPress={() => Linking.openURL(previewLink)}>
            <Text className="text-blue-500 mt-1">Read Preview</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View className="flex-1 w-full">
      <View className="flex-row p-3 relative bg-gray-100">
        <TextInput
          className="flex-1 border  border-gray-300 bg-white w-80 rounded-full px-3"
          placeholder="Search for books..."
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity className=" absolute right-4 bottom-3 bg-blue-500 px-7 rounded-full py-3 justify-center" onPress={handleSearch}>
          <Text className="text-white">Search</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" className="mt-6" />
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 10 }}
        />
      )}
    </View>
  );
};

export default BooksScreen;
