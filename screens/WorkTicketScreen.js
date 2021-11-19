import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { Icon, Button } from "react-native-elements";
import Card from "../components/Card";
import DropDown from "../components/DropDown";
import DropDownItem from "../components/DropDownItem";
import TabNavigation from "../components/TabNavigation";
import { theme } from "../core/theme";
import { breakPoints } from "../core/breakPoints";
import {
  deleteTicket,
  getTicketById,
  lastTicketAdded,
} from "../store/ticketsModule";
import moment from "moment";

//Variable to get the tablet dimension
const tablet = breakPoints.tablet;
//Variable to get the desktop dimension
const desktop = breakPoints.desktop;

const WorkTicketScreen = ({ route, navigation }) => {
  //Get the ticket id given by params
  let ticketId;
  //Assign new width value each time it changes
  const sWidth = useWindowDimensions().width;
  //Variable to hide/show dropdown
  const [show, setShow] = useState(false);
  //Variable to handle the Ticket
  const [ticket, setTicket] = useState(null);
  //Function to Show and Hide Dropdown
  const handleShowDropdown = () => setShow(!show);
  //Function to navigate to Other Screen
  const goToRoute = (route) => {
    navigation.navigate(route);
    setShow(false);
  };
  //Set the Navbar before the screen shows any content
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitleAlign: "center",
      title: "Work Ticket",
      headerStyle: { backgroundColor: theme.colors.backgroundNav },
      headerTitleStyle: { color: theme.colors.darkGray },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => goToRoute("Dashboard")}
          style={{ marginLeft: 20 }}
        >
          <Icon
            name="chevron-left"
            size={20}
            color={theme.colors.accent}
            type="font-awesome"
          />
          <Text style={{ color: theme.colors.accent }}>Dashboard</Text>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={styles.icons}>
          <TouchableOpacity onPress={handleShowDropdown}>
            <Icon
              name="list"
              size={20}
              color={theme.colors.accent}
              type="font-awesome"
            />
            <Text style={styles.iconText}>Menu</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, show]);

  //Function to delete the ticket from database
  const handleDeleteTicket = async () => {
    await deleteTicket(ticket?.ticket_id).then(() => {
      navigation.navigate("Dashboard");
    });
  };

  //Function to go to the ticket update
  const handleUpdateTicket = () => {
    navigation.navigate("TicketForm", { ticketId: ticket?.ticket_id });
  };

  //Hook to get the ticket id by params and get the ticket from DB
  // in case it doesn't appear get the last ticket added
  useEffect(async () => {
    if (!route.params?.ticketId) {
      await lastTicketAdded().then((res) => {
        setTicket(res);
      });
      return;
    }
    ticketId = JSON.stringify(route.params?.ticketId);
    await getTicketById(ticketId).then((res) => setTicket(res));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DropDown visible={show}>
        <DropDownItem
          iconName="send"
          info="Dashboard"
          onClick={() => goToRoute("Dashboard")}
        />
        <DropDownItem
          iconName="send"
          info="Get Directions"
          onClick={() => goToRoute("Directions")}
        />
        {sWidth <= tablet && (
          <>
            <DropDownItem iconName="send" info="Overview" />
            <DropDownItem iconName="send" info="Work Details" />
            <DropDownItem iconName="send" info="Purchasing" />
            <DropDownItem iconName="send" info="Finishing Up" />
            <DropDownItem iconName="camera" info="Camera" />
          </>
        )}
      </DropDown>
      <ScrollView onTouchStart={() => setShow(false)}>
        <View style={styles.container}>
          <Card>
            {/* User Info */}
            <View
              style={
                sWidth >= tablet
                  ? [styles.header, { flexDirection: "row" }]
                  : styles.header
              }
            >
              <View
                style={
                  sWidth >= tablet
                    ? [styles.headerFirstColumn, { paddingLeft: 20 }]
                    : styles.headerFirstColumn
                }
              >
                <Text style={styles.headerTitle}>Customer Info</Text>
                <View style={styles.headerSecondRow}>
                  <Text style={styles.headerSubtitle}>
                    {ticket?.client_name}
                  </Text>
                  <View style={styles.headerIcon}>
                    <View style={styles.iconRounded}>
                      <Icon
                        name="phone"
                        size={15}
                        color={theme.colors.accent}
                        type="font-awesome"
                      />
                    </View>
                    <View style={styles.phoneNumber}>
                      <Text style={styles.phoneNumber}>5197338787</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={
                  sWidth >= tablet
                    ? [styles.headerSecondColumn, { paddingLeft: 20 }]
                    : styles.headerSecondColumn
                }
              >
                <Text style={styles.headerTitle}>Scheduled For:</Text>
                <Text style={styles.headerSubtitle}>
                  {/* Date */}
                  {moment(ticket?.date).format("dddd, MMM D, YYYY, h:mm:ss a")}
                </Text>
              </View>
            </View>
            {/* Directions and Notes */}
            <View
              style={
                sWidth >= tablet
                  ? [styles.subHeader, { flexDirection: "row" }]
                  : styles.subHeader
              }
            >
              <View
                style={
                  sWidth >= tablet
                    ? [
                        styles.subHeaderFirstColumn,
                        { borderRightWidth: 1, borderBottomWidth: 0 },
                      ]
                    : styles.subHeaderFirstColumn
                }
              >
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Icon
                      name="map-marker"
                      size={18}
                      color={theme.colors.text}
                      type="font-awesome"
                      style={{ marginRight: 10 }}
                    />
                    <Text style={styles.headerTitle}>Job Site Address:</Text>
                  </View>
                  <Text
                    style={[
                      styles.headerSubtitle,
                      { maxWidth: 150, marginLeft: 5, marginTop: 5 },
                    ]}
                  >
                    {ticket?.address}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 20,
                    }}
                  >
                    <Icon
                      name="send"
                      size={18}
                      color={theme.colors.text}
                      type="font-awesome"
                      style={{ marginRight: 10 }}
                    />
                    <Text style={styles.headerTitle}>Distance:</Text>
                  </View>
                  <Text
                    style={[
                      styles.headerSubtitle,
                      { maxWidth: 150, marginLeft: 5, marginTop: 5 },
                    ]}
                  >
                    Aprox 17 Minutes
                  </Text>
                  <Text style={styles.miles}>11.9 Miles</Text>
                </View>
                <View>
                  <Button
                    title="Get Directions"
                    buttonStyle={styles.directionButton}
                    onPress={() => goToRoute("Directions")}
                  />
                </View>
              </View>
              {/* Notes */}
              <View style={styles.subHeaderSecondColumn}>
                <View style={[styles.notesFirstRow, { marginBottom: 20 }]}>
                  <View style={styles.notesHeader}>
                    <Icon
                      name="book"
                      size={18}
                      color={theme.colors.text}
                      type="font-awesome"
                      style={{ marginRight: 5 }}
                    />
                    <Text style={styles.headerTitle}>Dispatch Note:</Text>
                  </View>
                  <View style={styles.notesParagraph}>
                    <Text style={[styles.headerSubtitle, { fontSize: 16 }]}>
                      $89 Diagnostic Fee
                    </Text>
                    <Text style={[styles.headerSubtitle, { fontSize: 16 }]}>
                      Air Handler Horizontal in the Attic, Condenser in back
                      yard Unit turns on and blows warm air
                    </Text>
                  </View>
                  <View style={styles.notesParagraph}>
                    <Text style={[styles.headerSubtitle, { fontSize: 16 }]}>
                      Air Handler Horizontal in the Attic, Condenser in back
                      yard Unit turns on and blows warm air
                    </Text>
                  </View>
                </View>
                <View
                  style={
                    sWidth >= desktop
                      ? [
                          styles.notesFirstRow,
                          { flexDirection: "row", marginTop: 30 },
                        ]
                      : [styles.notesFirstRow, { marginTop: 30 }]
                  }
                >
                  <View style={styles.notesFooter}>
                    <Text style={styles.headerTitle}>Dept Class:</Text>
                    <Text style={[styles.headerSubtitle, { marginLeft: 5 }]}>
                      Plumbing
                    </Text>
                  </View>
                  <View style={styles.notesFooter}>
                    <Text style={styles.headerTitle}>Service Type:</Text>
                    <Text style={[styles.headerSubtitle, { marginLeft: 5 }]}>
                      Call Back
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </Card>
          <View
            style={
              sWidth >= tablet
                ? [styles.reasonContainer, { marginBottom: 120 }]
                : styles.reasonContainer
            }
          >
            <Card>
              <View
                style={
                  sWidth >= tablet
                    ? [styles.reason, { flexDirection: "row" }]
                    : styles.reason
                }
              >
                <View
                  style={
                    sWidth >= tablet
                      ? { padding: 10, marginHorizontal: 30 }
                      : ""
                  }
                >
                  <Text style={styles.headerTitle}>Reason For Call:</Text>
                </View>
                <View style={styles.reasonMiddleColumn}>
                  <Text style={[styles.headerTitle, { fontSize: 14 }]}>
                    Reason For Call:
                  </Text>
                  <Text style={[styles.headerTitle, { fontSize: 14 }]}>
                    Reason For Call:
                  </Text>
                  <Text style={[styles.headerTitle, { fontSize: 14 }]}>
                    Reason For Call:
                  </Text>
                </View>
                <View style={styles.reasonLastColumn}>
                  <View style={styles.reasonLastColumnTicket}>
                    <Text style={styles.miles}>
                      Ticket #{ticket?.ticket_id}
                    </Text>
                  </View>
                </View>
              </View>
            </Card>
            <View style={styles.containerButton}>
              <Button
                title="Delete Ticket"
                buttonStyle={{
                  backgroundColor: theme.colors.danger,
                  width: "100%",
                  padding: 10,
                }}
                onPress={handleDeleteTicket}
              />
            </View>
            <View style={styles.containerButton}>
              <Button
                title="Update Ticket"
                buttonStyle={{
                  backgroundColor: theme.colors.warning,
                  width: "100%",
                  padding: 10,
                }}
                onPress={handleUpdateTicket}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      {/* Navigation Tabs */}
      <TabNavigation />
    </SafeAreaView>
  );
};

export default WorkTicketScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerButton: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
  directionButton: {
    backgroundColor: theme.colors.accent,
  },
  ellipsisMenu: {
    marginRight: 30,
  },
  header: {
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.text,
    paddingBottom: 30,
  },
  headerFirstColumn: {
    flex: 1,
  },
  headerIcon: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  headerSecondColumn: {
    flex: 1,
  },
  headerSecondRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerSubtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors.darkestGray,
  },
  headerTitle: {
    fontSize: 15,
    color: theme.colors.darkGray,
    fontWeight: "bold",
  },
  iconRounded: {
    borderWidth: 1,
    borderColor: theme.colors.accent,
    width: 23,
    height: 23,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 5,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 50,
    marginHorizontal: 20,
  },
  iconText: {
    color: theme.colors.accent,
  },
  miles: {
    marginTop: 5,
    color: theme.colors.darkGray,
    marginLeft: 5,
  },
  notesFirstRow: {
    flex: 1,
    paddingBottom: 20,
  },
  notesFooter: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  notesHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  notesSecondRow: {
    borderTopWidth: 1,
    borderColor: theme.colors.text,
    paddingVertical: 10,
    marginTop: 10,
  },
  notesParagraph: {
    marginTop: 8,
  },
  phoneNumber: {
    color: theme.colors.darkGray,
    fontWeight: "bold",
  },
  reason: {
    justifyContent: "space-between",
    paddingLeft: 10,
  },
  reasonContainer: {
    marginTop: 20,
    marginBottom: 50,
  },
  reasonMiddleColumn: {
    flex: 1,
  },
  reasonLastColumn: {
    flex: 1,
  },
  reasonLastColumnTicket: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  subHeader: {
    justifyContent: "space-between",
  },
  subHeaderFirstColumn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: theme.colors.text,
  },
  subHeaderSecondColumn: {
    flex: 1,
    padding: 10,
  },
});
