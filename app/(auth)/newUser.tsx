import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import Colors from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { userApi } from "@/services/user-api";

const NewUser = () => {
  const [name, setName] = useState("");
  const SetNameForUser = async () => {
    try {
      const res = await userApi.createName(name);
      Alert.alert("Success", "Name has been set");
      router.push("/");
    } catch (error) {
      console.log("Error setting name", error);
      Alert.alert("Error", "Error setting name");
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
            marginBottom: 24,
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
        <View>
          <Text style={styles.titleAuth}>Your Name</Text>
          <TextInput
            placeholder="Enter your name"
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.inputAuth}
          ></TextInput>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.btnAuth}
            onPress={() => SetNameForUser()}
          >
            <Text
              style={{
                textAlign: "center",
                fontFamily: "mon-b",
                fontSize: 16,
              }}
            >
              Start
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => router.push("/")}
          >
            <Text
              style={{
                fontFamily: "mon-sb",
                color: Colors.lightGrey,
                fontSize: 16,
              }}
            >
              Skip
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NewUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.purple,
  },
  imageLogo: { width: 240, height: 240, borderRadius: 20 },
  inputContainer: {
    flex: 1,
    backgroundColor: Colors.light,
    padding: 30,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    justifyContent: "space-between",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
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
    justifyContent: "flex-end",
    flexDirection: "row",
    marginTop: 24,
  },
});
