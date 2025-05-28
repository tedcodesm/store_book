// screens/MyBooksScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { getMyBooks } from "../api/book";

export default function MyBooksScreen() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getMyBooks().then((res) => setBooks(res.data));
  }, []);

  return (
    <View style={{ padding: 20 }}>
      {books.map((b) => (
        <View key={b._id} style={{ marginBottom: 20 }}>
          <Image source={{ uri: b.image }} style={{ height: 100, borderRadius: 10 }} />
          <Text>{b.tittle}</Text>
        </View>
      ))}
    </View>
  );
}
