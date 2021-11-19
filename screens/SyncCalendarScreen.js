import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { theme } from "../core/theme";
import { Button, Icon } from "react-native-elements";
import * as Calendar from "expo-calendar";
import { getEventsDB } from "../store/ticketsModule";
import { breakPoints } from "../core/breakPoints";
import { Platform } from "react-native";
import {
  createEventDB,
  createEventTable,
  deleteAllFromEvents,
  getAllEvents,
} from "../store/eventModule";

const SyncCalendarScreen = ({ onCloseModal }) => {
  //Assign new height value each time it changes
  const sHeight = useWindowDimensions().height;
  //Variable to get all the calendars
  const [calendarId, setCalendarId] = useState([]);

  //Hook to ask for permissions and get all the calendars
  useEffect(async () => {
    //Call to create events table
    await createEventTable();
    //Get the status of the permissions
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    //Check if the permissions are granted
    if (status === "granted") {
      //Get the Calendar id to sync the events
      if (Platform.OS == "ios") {
        setCalendarId((await Calendar.getDefaultCalendarAsync()).id);
      } else {
        setCalendarId(await findAndroidCalendarId());
      }
    }
  }, []);

  //Function to sync all the events with the calendar selected
  const handleCalendarEvent = async () => {
    await getAllEvents().then(async (res) => {
      if (res.length > 0) {
        res.map(
          async (dbEvent) =>
            await Calendar.deleteEventAsync(dbEvent.calendar_id)
        );
        await deleteAllFromEvents();
      }
    });
    await getEventsDB().then(async (res) => {
      if (res.length > 0) {
        res.forEach(async (val) => {
          const eventId = await Calendar.createEventAsync(calendarId, {
            title: val.title,
            startDate: val.start,
            endDate: val.end,
          });
          await createEventDB(eventId);
        });
      }
    });
    onCloseModal();
  };

  const findAndroidCalendarId = async () => {
    var androidCalendar;
    var foundCal = false;
    // retrieve internal calendars
    var androidCalendars = await Calendar.getCalendarsAsync();
    // iterate through them
    androidCalendars.map((calendar) => {
      if (calendar.title === "ACMECALENDAR") {
        androidCalendar = calendar.id;
        foundCal = true;
      }
    });
    // Check if the calendar exist in case it does not exist create it
    if (foundCal === false) {
      androidCalendar = await createNewCalendar();
    }
    return androidCalendar;
  };

  //Function to create a new Calendar on the Device
  const createNewCalendar = async () => {
    const newCalendarSource =
      Platform.OS === "ios"
        ? await getDefaultCalendarSource()
        : { isLocalAccount: true, name: "Expo Calendar" };

    const newCalendarID = await Calendar.createCalendarAsync({
      title: "ACMECALENDAR",
      color: "green",
      entityType: Calendar.EntityTypes.EVENT,
      sourceId: newCalendarSource.id,
      source: newCalendarSource,
      name: "ACMECALENDAR",
      ownerAccount: "personal",
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
    });

    return newCalendarID;
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={
          sHeight >= breakPoints.heigthToCenter ? styles.scroll : ""
        }
      >
        <View style={styles.container}>
          <Button
            key="syncCalendar"
            title="Sync all your events"
            buttonStyle={{
              borderRadius: 20,
              marginBottom: 20,
              paddingVertical: 15,
              paddingHorizontal: 20,
            }}
            onPress={handleCalendarEvent}
            icon={
              <Icon
                name="undo"
                size={20}
                type="font-awesome"
                color={theme.colors.white}
                style={{ marginRight: 10 }}
              />
            }
          />
          <View style={styles.buttonContainer}>
            <View style={styles.closeModal}>
              <Button
                title="Close Modal"
                buttonStyle={{
                  backgroundColor: theme.colors.danger,
                }}
                onPress={onCloseModal}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SyncCalendarScreen;

const styles = StyleSheet.create({
  calendarText: {
    fontSize: 16,
    marginBottom: 40,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  closeModal: {
    width: 300,
  },
  scroll: {
    flex: 1,
    justifyContent: "center",
  },
});
