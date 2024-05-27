import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import auth from "@react-native-firebase/auth";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { userApi } from "@/services/user-api";

const Register = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult>();

  const signInWithPhoneNumber = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      console.log("confirmation", confirmation);
      setConfirm(confirmation);
    } catch (error) {
      console.log("Error sending code", error);
    }
  };

  const register = async () => {
    const res = await userApi.register();
  };

  const confirmCode = async () => {
    try {
      const userCredential = await confirm?.confirm(code);
      const user = userCredential?.user;
      if (userCredential?.additionalUserInfo?.isNewUser) {
        register();
        router.navigate("/(auth)/newUser");
      } else {
        console.log("User credential", userCredential);
        router.navigate("/");
      }
    } catch (error) {
      console.log("Invalid code", error);
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" animated={true} />
      <SafeAreaView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 24,
          }}
        >
          <Image
            style={styles.imageLogo}
            source={{
              uri: "https://media.istockphoto.com/id/1410277332/vector/man-touching-bike-rental-station-terminal-screen-on-modern-cityscape-street-businessman.jpg?s=612x612&w=0&k=20&c=kNl6-s_GGFj3hNftNqEbGu1Np2Knyzr-ND4rNVXntWo=",
            }}
          />
        </View>
      </SafeAreaView>
      <View style={styles.inputContainer}>
        {!confirm ? (
          <View>
            <Text style={styles.titleAuth}>Phone Number</Text>
            <TextInput
              placeholder="e.g., +1234567890"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              style={styles.inputAuth}
            ></TextInput>

            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.btnAuth}
              onPress={signInWithPhoneNumber}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "mon-b",
                  fontSize: 16,
                }}
              >
                Send Code
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <Text style={styles.titleAuth}>
              Enter the code sent to your phone
            </Text>
            <TextInput
              placeholder="e.g., +1234567890"
              value={code}
              onChangeText={setCode}
              style={styles.inputAuth}
            ></TextInput>

            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.btnAuth}
              onPress={confirmCode}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "mon-b",
                  fontSize: 16,
                }}
              >
                Confirm Code
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ----------------------------------------------------- */}
        <Text
          style={{
            fontFamily: "mon-b",
            color: Colors.lightGrey,
            textAlign: "center",
            fontSize: 18,
          }}
        >
          Or
        </Text>
        <View style={styles.iconContainer}>
          <View style={styles.iconBtn}>
            <Ionicons name="logo-facebook" size={30} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.purple,
  },
  imageLogo: { width: 200, height: 200, borderRadius: 20 },
  inputContainer: {
    flex: 1,
    backgroundColor: Colors.light,
    padding: 30,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  iconBtn: {
    padding: 8,
    backgroundColor: Colors.Gray100,
    borderRadius: 18,
  },
  btnAuth: {
    backgroundColor: Colors.secondary,
    borderRadius: 16,
    paddingVertical: 16,
    marginVertical: 24,
  },
  inputAuth: {
    backgroundColor: Colors.Gray100,
    padding: 16,
    borderRadius: 16,
    color: Colors.lightGrey,
    fontSize: 14,
    fontFamily: "mon",
    marginTop: 8,
    marginBottom: 16,
  },
  titleAuth: {
    color: Colors.lightGrey,
    fontFamily: "mon-sb",
    fontSize: 14,
  },
  actionContainer: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 24,
  },
  forgotPassword: {},
});
