import React from "react";
import { useWindowDimensions, StyleSheet, View } from "react-native";
import { breakPoints } from "../core/breakPoints";
import Tab from "./Tab";

//Variable to get the tablet dimension
const tablet = breakPoints.tablet;

const TabNavigation = () => {
  //Assign new width value each time it changes
  const sWidth = useWindowDimensions().width;
  return (
    <View
      style={
        sWidth >= tablet
          ? [styles.container, { position: "absolute", display: "flex" }]
          : styles.container
      }
    >
      <View style={styles.tabs}>
        <Tab active title="Overview" />
        <View style={styles.spacer}></View>
        <Tab title="Work Details" />
        <View style={styles.spacer}></View>
        <Tab title="Purchasing" />
        <View style={styles.spacer}></View>
        <Tab title="Finishing Up" />
        <View style={styles.spacer}></View>
        <Tab iconTab title="camera" />
      </View>
    </View>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({
  container: {
    bottom: 0,
    right: 0,
    left: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    height: 100,
    display: "none",
  },
  tabs: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  spacer: {
    padding: 4,
  },
});
