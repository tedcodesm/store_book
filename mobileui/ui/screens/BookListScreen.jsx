import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import { deleteBook, getBooks } from "../api/book";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useIsFocused } from "@react-navigation/native";

export default function BookListScreen({ navigation }) {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const isFocused = useIsFocused();

  const fetchBooks = async (pg = 1) => {
    const res = await getBooks(pg);
    if (pg === 1) {
      setBooks(res.data.books);
      setFilteredBooks(res.data.books); // initial copy
    } else {
      setBooks((prev) => [...prev, ...res.data.books]);
      setFilteredBooks((prev) => [...prev, ...res.data.books]);
    }
    setTotalPages(res.data.totalPages);
  };

  const handleSearch = (text) => {
    setSearch(text);
    if (text.trim() === "") {
      setFilteredBooks(books);
    } else {
      const filtered = books.filter((book) =>
        book.tittle.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  };

  useEffect(() => {
    if (isFocused) {
      setPage(1);
      fetchBooks(1);
    }
  }, [isFocused]);

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor="#fb923c" />

      <View className="flex-row bg-orange-400 rounded-b-xl items-center py-8 justify-between px-2">
        <View className="flex-row items-center space-x-2">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={35} color="white" />
          </TouchableOpacity>
        </View>
        <Text className="text-lg font-bold text-white">Books Screen</Text>
      </View>

      <View className="px-4 py-2">
        <TextInput
          className="bg-gray-200 rounded-full px-4 py-3"
          placeholder="Search book title..."
          value={search}
          onChangeText={handleSearch}
        />
      </View>

      <FlatList
        className="flex-1 py-2 px-2"
        data={filteredBooks}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View
            className="border flex-row justify-between px-2 gap-2 py-2 rounded-xl border-orange-400"
            style={{ marginBottom: 20 }}
          >
            <Image
              className="rounded-xl w-20 h-32"
              source={{ uri: item.image }}
            />

            <View className="flex-1 px-2 gap-3">
              <Text className="text-lg font-bold">{item.tittle}</Text>
              <Text className="text-md font-semibold font-serif text-gray-600">
                {item.caption}
              </Text>
              <View className="flex-row items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Icon
                    key={i}
                    name={i < Math.floor(item.rating) ? "star" : "star-outline"}
                    size={24}
                    color="orange"
                  />
                ))}
              </View>
            </View>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("content", { bookId: item._id })
              }
              className="justify-end bg-orange-400 rounded-full items-center h-8 px-3"
            >
              <Text className="text-lg font-bold font-serif">View</Text>
            </TouchableOpacity>
          </View>
        )}
        onEndReached={() => {
          if (page < totalPages) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchBooks(nextPage);
          }
        }}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
}
