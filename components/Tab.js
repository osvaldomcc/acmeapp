import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import { theme } from "../core/theme";

const Tab = ({ active, iconTab, title }) => {
  return (
    <TouchableOpacity
      style={active ? [styles.tab, styles.tabActive] : styles.tab}
      activeOpacity={0.5}
    >
      <View style={styles.container}>
        {iconTab ? (
          <Icon
            name={title}
            size={20}
            color={active ? theme.colors.accent : theme.colors.text}
            type="font-awesome"
          />
        ) : (
          <Text
            style={
              active
                ? [styles.tabTitle, styles.tabTitleActive]
                : styles.tabTitle
            }
          >
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Tab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tab: {
    flex: 1,
    borderTopWidth: 3,
    borderTopColor: theme.colors.text,
    backgroundColor: theme.colors.background,
  },
  tabActive: {
    borderTopColor: theme.colors.accent,
  },
  tabTitle: {
    fontSize: 15,
    color: theme.colors.darkGray,
    fontWeight: "bold",
  },
  tabTitleActive: {
    color: theme.colors.accent,
  },
});
