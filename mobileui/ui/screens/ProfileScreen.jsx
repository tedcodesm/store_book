// screens/MyBooksScreen.tsx
import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from "react-native";
import { deleteBook, getMyBooks } from "../api/book";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { useFocusEffect } from "@react-navigation/native";

export default function ProfileScreen({navigation}) {
  const [books, setBooks] = useState([]);

  const handleDelete = async (id) => {
    await deleteBook(id);
    setBooks((prev) => prev.filter((b) => b._id !== id));
  };

  useFocusEffect(
    useCallback(() => {
      getMyBooks().then((res) => setBooks(res.data));
    }, [])
  );

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor="#fb923c" />

      <View className="mb-4 px-4 bg-orange-400 flex-row items-center py-4 justify-between w-full">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-white mb-4">
          Profile Screen
        </Text>
      </View>
    <ScrollView vertical={true}>
        <View className="" style={{ padding: 20 }}>
       <View className="pb-4 w-full items-center">
         <TouchableOpacity onPress={()=>navigation.navigate("login")} className="py-4 rounded-full bg-orange-400 items-center text-white w-80">
          <Text className="text-lg text-white font-semibold">Logout</Text>
        </TouchableOpacity>
       </View>
        {books.map((b) => (
          <View
            className=" border px-2 py-2 flex-row rounded-xl border-orange-400 "
            key={b._id}
            style={{ marginBottom: 20 }}
          >
            <Image className="rounded-xl w-20 h-32" source={{ uri: b.image }} />
            <View className="flex-1 px-2 gap-2">
              <Text className="font-bold text-2xl font-serif">{b.tittle}</Text>
              <Text className="font-semibold text-md font-serif">
                {b.caption}
              </Text>
              <View className="flex-row items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Icons
                    key={i}
                    name={i < Math.floor(b.rating) ? "star" : "star-outline"}
                    size={24}
                    color="orange"
                  />
                ))}
              </View>
            </View>
            <TouchableOpacity
              onPress={() => handleDelete(b._id)}
              className="justify-start pt-1"
            >
              <Icons name="trash-can" size={24} color="red" />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
    </View>
  );
}
