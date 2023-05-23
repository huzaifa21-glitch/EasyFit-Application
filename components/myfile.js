import React from 'react';
import { Button, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
const handleVideoUpload = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (status !== 'granted') {
    console.error('Permission denied');
    return;
  }

  const video = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    allowsEditing: true,
    quality: 1,
  });

  if (!video.cancelled) {
    const formData = new FormData();
    formData.append('file', {
      uri: video.uri,
      name: 'video',
      type: 'video/mp4',
    });
console.log("SELECTED VIDEO: "+JSON.stringify(formData));
    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dbzfjwhnw/video/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          params: {
            upload_preset: 'videopreset',
          },
        }
      );

      console.log(response.data.url); // Retrieve the uploaded video URL here
    } catch (error) {
      console.error(error);
    }
  }
};
export default function App1() {
  return (
    <View>
      <Button title="Upload Video" onPress={handleVideoUpload} />
    </View>
  );
}
