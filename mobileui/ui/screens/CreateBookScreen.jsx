// screens/CreateBookScreen.js
import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  Alert,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { createBook } from "../api/book";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function CreateBookScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [imageBase64, setImageBase64] = useState(null);
  const handlePickImage = async () => {
    const base64 = await pickImage();
    if (base64) setImage(base64);
  };

  const handleSubmit = async () => {
    if (!title || !caption || !rating || !image) {
      Alert.alert("Please fill all fields");
      return;
    }

    try {
      await createBook({
        tittle: title,
        caption,
        rating,
        image: imageBase64,
        content,
      });
      Alert.alert("Book created!", "Your book has been successfully created.");
    } catch (error) {
      Alert.alert("Error", error.response?.data?.message || error.message);
    }
  };

  const renderRatingPicker = () => {
    const star = [];
    for (let i = 1; i <= 5; i++) {
      star.push(
        <TouchableOpacity
          key={i}
          onPress={() => setRating(i.toString())}
          className={`p-2 ${rating >= i ? "text-yellow-500" : "text-gray-400"}`}
        >
          <Icon
            name={i <= rating ? "star" : "star-outline"}
            size={40}
            color={i <= rating ? "#f4b400" : "orange"}
          />
        </TouchableOpacity>
      );
    }
    return <View className="flex-row space-x-2">{star}</View>;
  };

  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Permission denied");
        return null;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        base64: true,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5, // reduce size
      });

      if (result.canceled) return;

      const asset = result.assets[0];

      // For preview
      setImage(asset.uri);

      // For backend (base64 string)
      if (asset.base64) {
        setImageBase64(`data:image/jpeg;base64,${asset.base64}`);
        console.log("Base64 Preview:", asset.base64.slice(0, 30));
      } else {
        const base64 = await FileSystem.readAsStringAsync(asset.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        setImageBase64(`data:image/jpeg;base64,${base64}`);
        console.log("Base64 Fallback:", base64.slice(0, 30));
      }
    } catch (error) {
      console.error("Image picking error:", error);
      return null;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
      className="flex-1"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
         contentContainerStyle={{ paddingBottom: 300 }}
  keyboardShouldPersistTaps="handled"
        >
          <StatusBar barStyle="light-content" backgroundColor="#fb923c" />
          <View className="bg-orange-400 rounded-b-xl py-8 px-2 flex-row items-center justify-between">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="chevron-left" size={30} color="white" />
            </TouchableOpacity>
            <Text className="text-lg font-bold text-white">Create screen</Text>
          </View>

          <View className="px-4 py-6 gap-6">
            {/* TITLE */}
            <View>
              <Text className="text-lg font-bold ps-4">Book title</Text>
              <TextInput
                className="w-full py-4 px-4 bg-gray-200 rounded-full"
                placeholder="Enter book Title"
                value={title}
                onChangeText={setTitle}
              />
            </View>

            {/* CAPTION */}
            <View>
              <Text className="text-lg font-bold ps-4">Write a caption</Text>
              <TextInput
                className="w-full py-4 px-4 bg-gray-200 rounded-full"
                placeholder="Write Caption"
                value={caption}
                onChangeText={setCaption}
              />
            </View>

            {/* RATING */}
            <View>
              <Text className="text-lg font-bold ps-4">Your Ratings</Text>
              {renderRatingPicker()}
            </View>

            {/* IMAGE PICKER */}
            <View>
              <Text className="text-lg font-bold ps-4">Pick book cover</Text>
              <TouchableOpacity
                onPress={handlePickImage}
                className="w-full h-40 justify-center bg-orange-200 rounded-xl items-center"
              >
                {image ? (
                  <Image
                    className="rounded-xl h-40 w-full"
                    resizeMode="cover"
                    source={{ uri: image }}
                  />
                ) : (
                  <View className="flex-1 items-center justify-center">
                    <Icon name="image" size={24} color="orange" />
                    <Text className="text-md font-semibold text-white">
                      Tap to select image
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>

            {/* CONTENT */}
            <View>
              <Text className="text-lg font-bold ps-4">Book Content</Text>
              <TextInput
                className="w-full h-40 py-4 px-4 bg-gray-200 rounded-xl"
                placeholder="Full content"
                value={content}
                onChangeText={setContent}
                multiline
              />
            </View>

            {/* SUBMIT */}
            <TouchableOpacity
              onPress={handleSubmit}
              className="w-full py-4 px-4 bg-orange-400 rounded-full items-center"
            >
              <Text className="text-white font-bold text-xl font-serif">
                Create
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
