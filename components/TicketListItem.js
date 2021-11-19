import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../core/theme";
import { Button } from "react-native-elements";
import { breakPoints } from "../core/breakPoints";
import moment from "moment";

//Variable to get the tablet dimension
const tablet = breakPoints.tablet;

const TicketListItem = ({ sWidth, navigation, ticket }) => {
  return (
    <View style={styles.listParent}>
      <View
        style={
          sWidth >= tablet
            ? [
                styles.list,
                {
                  flexDirection: "row",
                  maxHeight: 150,
                  alignItems: "center",
                  height: "90%",
                },
                styles.maxWidthContainer,
              ]
            : [styles.list, styles.maxWidthContainer]
        }
      >
        <View style={styles.listContainer}>
          <View>
            <Text style={styles.titleHighligth}>
              {moment(ticket.item.date).format("h:mm A")}
            </Text>
            <Text style={styles.textNormal}>
              {moment(ticket.item.date).format("M/D/YY")}
            </Text>
          </View>
          <Text style={[styles.listTicket, styles.textNormal]}>
            Ticket #{ticket.item.ticket_id}
          </Text>
        </View>
        <View
          style={
            sWidth >= tablet
              ? [styles.divider, { display: "flex" }]
              : styles.divider
          }
        />
        <View>
          <View>
            <Text style={styles.titleHighligth}>{ticket.item.client_name}</Text>
            <Text
              style={
                sWidth >= tablet
                  ? [{ maxWidth: 120 }, styles.textNormal]
                  : styles.textNormal
              }
            >
              {ticket.item.address}.
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View>
            <Button
              title="View Ticket"
              buttonStyle={{
                backgroundColor: theme.colors.accent,
                paddingHorizontal: 20,
                paddingVertical: 10,
              }}
              onPress={() =>
                navigation.navigate("WorkTicket", {
                  ticketId: ticket.item.ticket_id,
                })
              }
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default TicketListItem;

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    marginTop: 10,
    position: "absolute",
    right: 20,
  },
  listParent: {
    alignItems: "center",
  },
  list: {
    padding: 20,
    backgroundColor: theme.colors.white,
    marginTop: 20,
    borderRadius: 10,
  },
  maxWidthContainer: {
    width: "90%",
    margin: "auto",
  },
  divider: {
    display: "none",
    width: 2,
    height: "100%",
    backgroundColor: theme.colors.text,
    marginHorizontal: 10,
  },
  listContainer: {
    marginRight: 10,
  },
  listTicket: {
    marginTop: 10,
  },
  titleHighligth: {
    color: theme.colors.textHeader,
    fontWeight: "600",
    fontSize: 18,
  },
  textNormal: {
    color: theme.colors.textOnWhite,
  },
});
