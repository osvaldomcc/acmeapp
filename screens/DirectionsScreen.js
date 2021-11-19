import React, { useLayoutEffect } from "react";
import {
  StyleSheet,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import TabNavigation from "../components/TabNavigation";
import { Icon } from "react-native-elements";
import { theme } from "../core/theme";
import MapView from "react-native-maps";
import { useHeaderHeight } from "@react-navigation/elements";
const DirectionsScreen = ({ navigation }) => {
  //Assign new width value each time it changes
  const headerHeight = useHeaderHeight();
  //Assign new width value each time it changes
  const { width: sWidth, height: sHeight } = useWindowDimensions();
  //Function to navigate to Other Screen
  const goToRoute = (route) => {
    navigation.navigate(route);
  };
  //Set the Navbar before the screen shows any content
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitleAlign: "center",
      title: "Get Directions",
      headerStyle: { backgroundColor: theme.colors.backgroundNav },
      headerTitleStyle: { color: theme.colors.darkGray },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => goToRoute("WorkTicket")}
          style={{ marginLeft: 20 }}
        >
          <Icon
            name="chevron-left"
            size={20}
            color={theme.colors.accent}
            type="font-awesome"
          />
          <Text style={{ color: theme.colors.accent }}>Ticket</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.white,
    },
    map: {
      width: sWidth,
      height: sHeight - headerHeight,
      borderColor: theme.colors.white,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <MapView style={styles.map} />
      {/* Navigation Tabs */}
      <TabNavigation />
    </SafeAreaView>
  );
};

export default DirectionsScreen;
