import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../core/theme";

const DropDown = ({ visible, children }) => {
  return <>{visible && <View style={styles.dropdown}>{children}</View>}</>;
};

export default DropDown;

const styles = StyleSheet.create({
  dropdown: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: theme.colors.white,
    paddingHorizontal: 60,
    paddingVertical: 20,
    borderRadius: 10,
    zIndex: 1,
  },
});
