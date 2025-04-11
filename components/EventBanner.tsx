import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType
} from "react-native";

interface EventBannerProps {
  imageUri?: string | ImageSourcePropType;
  title: string;
  description?: string;
  onPress: () => void;
}

const EventBanner: React.FC<EventBannerProps> = ({ 
  imageUri, 
  title, 
  description, 
  onPress 
}) => {
  const defaultImage = require('@/assets/event-banner-upcoming.jpg');

  return (
    <TouchableOpacity 
      style={styles.banner} 
      onPress={onPress}
    >
      <Image
        source={
          typeof imageUri === 'string' 
            ? { uri: imageUri } 
            : imageUri || defaultImage
        }
        style={styles.bannerImage}
        defaultSource={defaultImage}
      />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {description && (
          <Text style={styles.description}>{description}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  banner: {
    height: 150,
    borderRadius: 10,
    marginBottom: 15,
    overflow: "hidden",
  },
  bannerImage: {
    width: "100%",
    height: 150,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    color: "white",
    fontSize: 12,
    opacity: 0.8,
  },
});

export default EventBanner;