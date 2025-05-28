// screens/BookListScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, Image, TouchableOpacity } from "react-native";
import { deleteBook, getBooks } from "../api/book";

export default function BookListScreen() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchBooks = async () => {
    const res = await getBooks(page);
    if (page === 1) setBooks(res.data.books);
    else setBooks((prev) => [...prev, ...res.data.books]);
    setTotalPages(res.data.totalPages);
  };

  const handleDelete = async (id) => {
    await deleteBook(id);
    setBooks((prev) => prev.filter((b) => b._id !== id));
  };

  useEffect(() => {
    fetchBooks();
  }, [page]);

  return (
    <FlatList
      data={books}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <View style={{ marginBottom: 20 }}>
          <Image source={{ uri: item.image }} style={{ height: 200 }} />
          <Text>{item.tittle}</Text>
          <Text>{item.caption}</Text>
          <Text>Rating: {item.rating}</Text>
          <TouchableOpacity onPress={() => handleDelete(item._id)}>
            <Text style={{ color: "red" }}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
      onEndReached={() => {
        if (page < totalPages) setPage(page + 1);
      }}
      onEndReachedThreshold={0.5}
    />
  );
}
