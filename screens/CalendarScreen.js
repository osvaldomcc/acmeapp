import moment from "moment";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Calendar } from "react-native-big-calendar";
import { getEventsDB } from "../store/ticketsModule";

const CalendarScreen = () => {
  //Array to store all the tickets about to due
  const [events, setEvents] = useState([]);

  useEffect(async () => {
    await getEventsDB().then((res) => {
      setEvents(res);
    });
  }, []);
  return (
    <View style={styles.container}>
      <Calendar events={events} height={600} swipeEnabled={true} />
    </View>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
  },
});
