import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const Register = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" animated={true} />
      <SafeAreaView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
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
        <Text style={styles.titleAuth}>Email Address</Text>
        <TextInput
          placeholder="Enter your email address"
          value="dungpt@gmail.com"
          style={styles.inputAuth}
        ></TextInput>
        <Text style={styles.titleAuth}>Password</Text>
        <TextInput
          placeholder="Enter your password"
          secureTextEntry
          style={styles.inputAuth}
        ></TextInput>

        <TouchableOpacity activeOpacity={0.5} style={styles.btnAuth}>
          <Text
            style={{
              textAlign: "center",
              fontFamily: "mon-b",
              fontSize: 16,
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
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
        <View style={styles.actionContainer}>
          <Text style={{ fontFamily: "mon-sb", color: Colors.lightGrey }}>
            Already have an account?{" "}
          </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => router.push("/login")}
          >
            <Text style={{ fontFamily: "mon-sb", color: Colors.yellow }}>
              Log in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  imageLogo: { width: 240, height: 240, borderRadius: 20 },
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
    backgroundColor: Colors.yellow,
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
});
