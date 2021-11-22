import React, { useLayoutEffect, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  View,
  KeyboardAvoidingView,
  useWindowDimensions,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { Icon, Input, Button } from "react-native-elements";
import { theme } from "../core/theme";
import {
  createTicketDB,
  getTicketById,
  updateTicketDB,
} from "../store/ticketsModule";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { emptyValidator } from "../helpers/emptyValidator";
import { breakPoints } from "../core/breakPoints";

const TicketFormScreen = ({ route, navigation }) => {
  //Get the ticket id given by params
  const [ticketId, setTicketId] = useState(0);
  //Assign new height value each time it changes
  const sHeight = useWindowDimensions().height;
  //Variable to show/hide the time picker
  const [showPicker, setShowPicker] = useState(false);
  //Variable to handle if create or update
  const [shouldCreate, setShouldCreate] = useState(true);
  //Variable to change the mode of the time picker date/time
  const [mode, setMode] = useState("date");
  //Variable to handle the date
  const [date, setDate] = useState(new Date());
  //Variable to handle the client name
  const [clientName, setClientName] = useState("");
  //Variable to handle the client name
  const [clientNameError, setClientNameError] = useState(false);
  //Variable to handle the address
  const [address, setAddress] = useState("");
  //Variable to handle the address
  const [addressError, setAddressError] = useState(false);
  const goToRoute = (route) => {
    navigation.navigate(route);
  };
  //Set the Navbar before the screen shows any content
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitleAlign: "center",
      title: "Create Ticket",
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
    });
  }, [navigation]);

  //Hook to know the component's behavior create/update ticket
  useEffect(async () => {
    if (route.params?.ticketId) {
      setShouldCreate(false);
      const ticket = JSON.stringify(route.params?.ticketId);
      setTicketId(ticket);
      await getTicketById(ticket).then((res) => {
        setClientName(res?.client_name);
        setAddress(res?.address);
        setDate(new Date(res?.date));
      });
    }
  }, []);

  //Function to add a new Ticket on Sqlite DB
  const createTicket = async () => {
    setClientNameError("");
    setAddressError("");
    setClientNameError(emptyValidator(clientName));
    setAddressError(emptyValidator(address));
    if (clientNameError == "" && addressError == "" && clientName && address) {
      await createTicketDB(clientName, address, moment(date).toString()).then(
        () => navigation.navigate("Dashboard")
      );
    }
  };

  //Function to update the Ticket on the DB
  const updateTicket = async () => {
    setClientNameError("");
    setAddressError("");
    setClientNameError(emptyValidator(clientName));
    setAddressError(emptyValidator(address));
    if (clientNameError == "" && addressError == "" && clientName && address) {
      await updateTicketDB(
        ticketId,
        clientName,
        address,
        moment(date).toString()
      ).then(() => navigation.navigate("Dashboard"));
    }
  };

  //Function to validate client name
  const handleClientName = (text) => {
    setClientNameError("");
    setClientName(text);
    setClientNameError(emptyValidator(text));
  };

  //Function to validate email
  const handleAddress = (text) => {
    setAddressError("");
    setAddress(text);
    setAddressError(emptyValidator(text));
  };

  //Function to validate date
  const handleDate = (e, selectDate) => {
    setShowPicker(false);
    if (selectDate !== undefined) {
      setDate(selectDate);
    }
  };

  //Function to show the date picker
  const handleShowPicker = (eMode) => {
    setShowPicker(true);
    setMode(eMode);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: theme.colors.backgroundNav,
    },
    content: {
      alignItems: "center",
    },
    errorMessage: {
      color: theme.colors.white,
    },
    errorContainer: {
      marginTop: 10,
      backgroundColor: theme.colors.errorBackground,
      padding: 20,
      borderRadius: 10,
      marginHorizontal: 10,
      textAlign: "center",
    },
    forgot: {
      flex: 1,
      alignItems: "flex-end",
    },
    forgotAccount: {
      fontSize: 15,
      fontWeight: "bold",
      color: theme.colors.darkGray,
      marginRight: 20,
    },
    forgotContainer: {
      width: "20%",
    },
    formTitle: {
      textAlign: "center",
      color: theme.colors.darkGray,
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
    },
    headerForm: {
      marginBottom: 35,
      alignItems: "center",
    },
    inputContainer: {
      borderColor: "lightgray",
      borderWidth: 2,
      borderBottomWidth: 2,
      paddingHorizontal: 10,
      borderRadius: 5,
    },
    logo: {
      width: 250,
      height: 90,
    },
    loginTitle: {
      fontWeight: "bold",
      fontSize: 20,
      marginBottom: 10,
    },
    main: {
      width: "90%",
      maxWidth: 425,
    },
    safeArea: {
      flex: 1,
    },
    subTitle: {
      fontSize: 15,
    },
    submitButton: {
      backgroundColor:
        shouldCreate === true ? theme.colors.accent : theme.colors.warning,
      marginVertical: 15,
      paddingVertical: 10,
      marginHorizontal: 10,
    },
    scroll: {
      flex: 1,
      justifyContent: "center",
    },
    spacer: {
      marginVertical: 5,
    },
  });

  return (
    // Form to create a new Ticket values: client_name, address, date
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={
            sHeight >= breakPoints.heigthToCenter ? styles.scroll : ""
          }
        >
          <KeyboardAvoidingView>
            <View style={styles.content}>
              <View style={styles.main}>
                <Text style={styles.formTitle}>Create New Ticket</Text>
                <View>
                  <Input
                    key="clientName"
                    inputStyle={{
                      paddingLeft: 30,
                    }}
                    inputContainerStyle={styles.inputContainer}
                    type="text"
                    leftIcon={
                      <TouchableOpacity>
                        <Icon
                          name="user"
                          size={20}
                          type="font-awesome"
                          color="lightgray"
                        />
                      </TouchableOpacity>
                    }
                    placeholder="Client Name"
                    value={clientName}
                    onSubmitEditing={
                      shouldCreate === true ? createTicket : updateTicket
                    }
                    onChangeText={(text) => handleClientName(text)}
                    errorMessage={clientNameError}
                    renderErrorMessage={true}
                  />
                  <View style={styles.spacer} />
                  <Input
                    key="address"
                    inputStyle={{ paddingLeft: 30 }}
                    leftIcon={
                      <Icon
                        name="map-marker"
                        size={20}
                        type="font-awesome"
                        color="lightgray"
                      />
                    }
                    inputContainerStyle={styles.inputContainer}
                    placeholder="Address"
                    value={address}
                    onSubmitEditing={
                      shouldCreate === true ? createTicket : updateTicket
                    }
                    onChangeText={(text) => handleAddress(text)}
                    errorMessage={addressError}
                    renderErrorMessage={true}
                  />
                  <TouchableWithoutFeedback
                    onPress={() => handleShowPicker("date")}
                  >
                    <View>
                      <Input
                        key="date"
                        disabled={true}
                        inputStyle={{ paddingLeft: 30 }}
                        leftIcon={
                          <Icon
                            name="calendar"
                            size={20}
                            type="font-awesome"
                            color="lightgray"
                          />
                        }
                        inputContainerStyle={styles.inputContainer}
                        value={moment(date).format("M/D/YYYY")}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    onPress={() => handleShowPicker("time")}
                  >
                    <View>
                      <Input
                        key="clock"
                        disabled={true}
                        inputStyle={{ paddingLeft: 30 }}
                        leftIcon={
                          <Icon
                            name="clock-o"
                            size={20}
                            type="font-awesome"
                            color="lightgray"
                          />
                        }
                        inputContainerStyle={styles.inputContainer}
                        value={moment(date).format("h:mm A")}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                <View>
                  {shouldCreate ? (
                    <Button
                      title="Create Ticket"
                      buttonStyle={styles.submitButton}
                      onPress={createTicket}
                    />
                  ) : (
                    <Button
                      title="Update Ticket"
                      buttonStyle={styles.submitButton}
                      onPress={updateTicket}
                    />
                  )}
                </View>
                {showPicker && (
                  <DateTimePicker
                    display={Platform.OS === "ios" ? "spinner" : "default"}
                    style={{ borderWidth: 2, width: "100%", height: "100%" }}
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    onChange={handleDate}
                  />
                )}
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default TicketFormScreen;
