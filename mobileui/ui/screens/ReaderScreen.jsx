// ReaderScreen.jsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

const ReaderScreen = ({ route, navigation }) => {
  const { title, formats } = route.params;
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  const getPlainTextUrl = (formats) =>
    formats['text/plain; charset=utf-8'] ||
    formats['text/plain'] ||
    null;

  useEffect(() => {
    const fetchText = async () => {
      const url = getPlainTextUrl(formats);
      if (!url) {
        alert('No plain text version available.');
        navigation.goBack();
        return;
      }

      try {
        const response = await axios.get(url);
        setContent(response.data);
      } catch (error) {
        alert('Failed to load book content.');
        navigation.goBack();
      } finally {
        setLoading(false);
      }
    };

    fetchText();
  }, []);

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-xl font-bold mb-4">{title}</Text>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView className="flex-1">
          <Text className="text-base leading-6 whitespace-pre-wrap">
            {content}
          </Text>
        </ScrollView>
      )}

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="mt-4 bg-orange-500 py-3 rounded-full"
      >
        <Text className="text-center text-white text-lg">Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReaderScreen;
