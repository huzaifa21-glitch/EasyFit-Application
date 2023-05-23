import React from 'react';
import { Text, StyleSheet } from 'react-native';

const TruncatedText = ({ text, maxLength, style }) => {
  if (text.length <= maxLength) {
    return <Text style={style}>{text}</Text>;
  }

  // Truncate the text and add an ellipsis at the end
  const truncatedText = text.substring(0, maxLength) + '...';

  return <Text style={style}>{truncatedText}</Text>;
};

export default TruncatedText;
