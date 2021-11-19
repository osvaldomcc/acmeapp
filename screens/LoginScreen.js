import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  KeyboardAvoidingView,
  useWindowDimensions,
} from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { theme } from "../core/theme";
import { Image } from "react-native";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { breakPoints } from "../core/breakPoints";

const LoginScreen = ({ navigation }) => {
  //Assign new height value each time it changes
  const sHeight = useWindowDimensions().height;
  //Variable to handle if an input is secure or not
  const [isSecureEntry, setisSecureEntry] = useState(true);
  //Variable to handle the login errors
  const [showLoginError, setShowLoginError] = useState(false);
  //Variable to handle the email
  const [email, setEmail] = useState("");
  //Variable to handle the password
  const [password, setPassword] = useState("");
  //Variable to handle the email errors
  const [emailError, setEmailError] = useState("");
  //Variable to handle the password errors
  const [passwordError, setPasswordError] = useState("");

  //Function to validate login creadentials
  const handleLogin = () => {
    setPasswordError("");
    setEmailError("");
    setShowLoginError(false);
    setPasswordError(passwordValidator(password));
    setEmailError(emailValidator(email));
    if (emailError == "" && passwordError == "" && email && password) {
      if (email === "osvaldo@gmail.com") {
        navigation.replace("Dashboard");
      } else {
        setShowLoginError(true);
      }
    }
  };

  //Function to validate password
  const handlePassword = (text) => {
    setPasswordError("");
    setPassword(text);
    setPasswordError(passwordValidator(text));
  };

  //Function to validate email
  const handleEmail = (text) => {
    setEmailError("");
    setEmail(text);
    setEmailError(emailValidator(text));
  };

  return (
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
                <View style={styles.headerForm}>
                  <Image
                    resizeMode="contain"
                    source={require("../assets/images/logo.png")}
                    style={styles.logo}
                  />
                </View>
                <View>
                  <Input
                    key="email"
                    inputStyle={{
                      paddingLeft: 30,
                    }}
                    inputContainerStyle={styles.inputContainer}
                    type="email"
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
                    placeholder="Your Email"
                    value={email}
                    onSubmitEditing={handleLogin}
                    onChangeText={(text) => handleEmail(text)}
                    errorMessage={emailError}
                    renderErrorMessage={true}
                  />
                  <View style={styles.spacer} />
                  <Input
                    key="password"
                    inputStyle={{ paddingLeft: 30 }}
                    leftIcon={
                      <TouchableOpacity>
                        <Icon
                          name="lock"
                          size={20}
                          type="font-awesome"
                          color="lightgray"
                          onPress={() => {
                            setisSecureEntry((prev) => !prev);
                          }}
                        />
                      </TouchableOpacity>
                    }
                    inputContainerStyle={styles.inputContainer}
                    placeholder="Your Password"
                    secureTextEntry={isSecureEntry}
                    value={password}
                    onSubmitEditing={handleLogin}
                    onChangeText={(text) => handlePassword(text)}
                    errorMessage={passwordError}
                    renderErrorMessage={true}
                  />
                </View>
                {showLoginError && (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorMessage}>
                      Credentials are invalid
                    </Text>
                  </View>
                )}
                <View>
                  <Button
                    title="Login"
                    buttonStyle={styles.submitButton}
                    onPress={handleLogin}
                  />
                </View>
                <View style={styles.forgot}>
                  <View style={styles.forgotContainer}>
                    <TouchableOpacity>
                      <Text style={styles.forgotAccount}>Forgot?</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

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
    alignItems: "flex-end",
  },
  forgotAccount: {
    fontSize: 15,
    fontWeight: "bold",
    color: theme.colors.darkGray,
  },
  forgotContainer: {
    width: "20%",
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
    backgroundColor: theme.colors.accent,
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
