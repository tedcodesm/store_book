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
} from "react-native";
import { createBook } from "../api/book";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function CreateBookScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
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
      await createBook({ tittle: title, caption, rating, image:imageBase64 });
      Alert.alert("Book created!","Your book has been successfully created.");
    } catch (err) {
      Alert.alert("Error", err.response?.data?.message || err.message);
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
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
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
    <View className="flex-1 justify- gap-6 items- w-full pt-8">
      <StatusBar style="light" />
      <View className="flex-row bg-orange-400 rounded-b-xl items-center py-8 justify-between px-2">
        <View className="flex-row items-center space-x-2">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <Text className="text-lg font-bold text-white">Create screen</Text>
      </View>
      <ScrollView vertical={true}>
        <View className="flex-1 justify- gap-6 items- w-full px-4">
        <View>
          <Text className="text-lg font-bold ps-4">Book tittle</Text>{" "}
          <TextInput
            className="w-full py-4 px-4 bg-gray-200 rounded-full ps-4"
            placeholder="Enter book Title"
            value={title}
            onChangeText={setTitle}
          />
        </View>{" "}
        <View>
          <Text className="text-lg font-bold ps-4">Write a caption</Text>

          <TextInput
            className="w-full py-4 px-4 bg-gray-200 rounded-full ps-4"
            placeholder="Write Caption"
            value={caption}
            onChangeText={setCaption}
          />
        </View>
        <View>
          <Text className="text-lg font-bold ps-4">Your Ratings</Text>

          {renderRatingPicker()}
        </View>
        <View>
          <Text className="text-lg font-bold ps-4">Pick an Image</Text>

          <TouchableOpacity
            onPress={handlePickImage}
            className="w-full h-40  justify-center bg-orange-200 rounded-xl items-center"
          >
           {image ? (
            <Image className="flex-1 rounded-xl h-40 w-full object-contain" source={{uri: image}}/>
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
    </View>
  );
}
