import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { theme } from "../core/theme";

const DropDownItem = ({ iconName, info, onClick }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropItem} onPress={onClick}>
        <Icon
          name={iconName}
          size={15}
          color={theme.colors.accent}
          type="font-awesome"
        />
        <Text style={styles.iconText}>{info}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DropDownItem;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    height: 35,
  },
  dropItem: {
    paddingTop: 5,
    flexDirection: "row",
    alignItems: "center",
    width: 120,
  },
  iconText: {
    color: theme.colors.accent,
    marginLeft: 10,
  },
});
