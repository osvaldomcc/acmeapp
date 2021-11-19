import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../core/theme";

const Card = ({ children }) => {
  return <View style={styles.card}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.white,
    borderRadius: 5,
    padding: 10,
  },
});
