import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
  SafeAreaView,
  FlatList,
  Modal,
} from "react-native";
import { Icon } from "react-native-elements";
import DropDown from "../components/DropDown";
import DropDownItem from "../components/DropDownItem";
import { breakPoints } from "../core/breakPoints";
import { theme } from "../core/theme";
import { Button } from "react-native-elements";
import TicketListItem from "../components/TicketListItem";
import { getAllTickets, initDB, lasTicketAdded } from "../store/ticketsModule";
import moment from "moment";
import Card from "../components/Card";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import SyncCalendarScreen from "./SyncCalendarScreen";

//Variable to get the tablet dimension
const tablet = breakPoints.tablet;

const DashboardScreen = ({ navigation }) => {
  //Assign new width value each time it changes
  const sWidth = useWindowDimensions().width;
  //Variable to hide/show modal
  const [modal, setModal] = useState(false);
  //Variable to hide/show dropdown
  const [show, setShow] = useState(false);
  //Variable to get all tickets
  const [tickets, setTickets] = useState([]);
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
      headerTitle: () => (
        <View style={styles.titleContainer}>
          <Image
            source={require("../assets/images/logo.png")}
            style={{ width: 100, height: 30 }}
          />
          <View style={styles.dividerTop} />
          <Text style={styles.logoTitle}>DASHBOARD</Text>
        </View>
      ),
      headerShown: true,
      headerTitleAlign: "center",
      headerStyle: { backgroundColor: theme.colors.backgroundNav },
      headerLeft: () =>
        sWidth > tablet && (
          <View style={styles.icons}>
            {tickets.length > 0 && (
              <>
                <TouchableOpacity onPress={() => goToRoute("Calendar")}>
                  <Icon
                    name="calendar"
                    size={20}
                    color={theme.colors.accent}
                    type="font-awesome"
                  />
                  <Text style={styles.iconText}>Calendar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModal(true)}>
                  <Icon
                    name="undo"
                    size={20}
                    color={theme.colors.accent}
                    type="font-awesome"
                  />
                  <Text style={styles.iconText}>Sync</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        ),
      headerRight: () =>
        sWidth >= tablet ? (
          <View style={styles.icons}>
            <TouchableOpacity
              style={styles.ticket}
              onPress={() => goToRoute("TicketForm")}
            >
              <Icon
                name="plus"
                size={20}
                color={theme.colors.accent}
                type="font-awesome"
              />
              <Text style={styles.iconText}>New ticket</Text>
            </TouchableOpacity>
            {tickets.length > 0 && (
              <TouchableOpacity onPress={handleShowDropdown}>
                <Icon
                  name="list"
                  size={20}
                  color={theme.colors.accent}
                  type="font-awesome"
                />
                <Text style={styles.iconText}>Menu</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View>
            {tickets.length > 0 && (
              <TouchableOpacity
                style={styles.ellipsisMenu}
                onPress={handleShowDropdown}
              >
                <Icon
                  name="ellipsis-v"
                  size={20}
                  color={theme.colors.accent}
                  type="font-awesome"
                />
              </TouchableOpacity>
            )}
          </View>
        ),
    });
  }, [navigation, show, sWidth, tickets]);

  //Function to hide the Modal
  const closeModal = () => {
    setModal(false);
    setShow(false);
  };

  //Hook to initialize the DB when the
  //component loads
  useEffect(async () => {
    await initDB().then();
  }, []);

  //Hook to get All tickets from DB
  //the first time and when tickets change
  useEffect(async () => {
    await getAllTickets().then((res) => setTickets(res));
  }, [tickets]);

  return (
    <SafeAreaView>
      {/* Modal */}
      <Modal visible={modal} animationType="fade">
        <SyncCalendarScreen onCloseModal={closeModal} />
      </Modal>
      {/* Dropdown */}
      {tickets.length > 0 && (
        <DropDown visible={show}>
          {sWidth >= tablet ? (
            <>
              <DropDownItem
                iconName="send"
                info="Work Ticket"
                onClick={() => goToRoute("WorkTicket")}
              />

              <DropDownItem
                iconName="send"
                info="Get Directions"
                onClick={() => goToRoute("Directions")}
              />
            </>
          ) : (
            <>
              <DropDownItem
                iconName="calendar"
                info="Calendar"
                onClick={() => goToRoute("Calendar")}
              />

              <TouchableWithoutFeedback onPress={() => setModal(true)}>
                <DropDownItem iconName="undo" info="Sync" />
              </TouchableWithoutFeedback>
              <DropDownItem
                iconName="plus"
                info="New Ticket"
                onClick={() => goToRoute("TicketForm")}
              />

              <DropDownItem
                iconName="send"
                info="Work Ticket"
                onClick={() => goToRoute("WorkTicket")}
              />

              <DropDownItem
                iconName="send"
                info="Get Directions"
                onClick={() => goToRoute("Directions")}
              />
            </>
          )}
        </DropDown>
      )}
      {/* Show Date */}
      <TouchableWithoutFeedback onPress={() => setShow(false)}>
        <View style={styles.dateContainer}>
          <Text style={[styles.date, styles.maxWidthContainer]}>
            {moment().format("MMM D, YYYY")}
          </Text>
        </View>
        {/* List of Tickets */}
        {tickets.length > 0 ? (
          <FlatList
            onTouchStart={() => setShow(false)}
            contentContainerStyle={{ paddingBottom: 120 }}
            data={tickets}
            renderItem={(item) => (
              <TicketListItem
                sWidth={sWidth}
                navigation={navigation}
                ticket={item}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          <Card>
            <View style={styles.listEmpty}>
              <Text style={styles.textNormal}>There are not Tickets</Text>
              <View>
                <Button
                  title="Create Ticket"
                  buttonStyle={{
                    backgroundColor: theme.colors.accent,
                  }}
                  onPress={() => navigation.navigate("TicketForm")}
                />
              </View>
            </View>
          </Card>
        )}
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  date: {
    paddingVertical: 5,
    color: theme.colors.dateText,
    fontWeight: "600",
  },
  dateContainer: {
    backgroundColor: theme.colors.date,
    alignItems: "center",
  },
  dividerTop: {
    width: 2,
    height: "100%",
    backgroundColor: theme.colors.text,
    marginHorizontal: 10,
  },
  ellipsisMenu: {
    marginRight: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 150,
    marginHorizontal: 10,
  },
  iconText: {
    color: theme.colors.accent,
  },
  listEmpty: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  logoTitle: {
    color: theme.colors.darkGray,
    fontWeight: "500",
    letterSpacing: 1,
  },
  maxWidthContainer: {
    width: "90%",
    margin: "auto",
  },
  textNormal: {
    fontSize: 20,
    color: theme.colors.darkGray,
  },
  ticket: {
    marginRight: 5,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
