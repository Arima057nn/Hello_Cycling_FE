import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import Colors from "@/constants/Colors";

const Welcome = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" animated={true} />
      <View
        style={{ flex: 1, justifyContent: "space-around", marginHorizontal: 4 }}
      >
        <Text
          style={{
            color: Colors.light,
            fontSize: 36,
            fontFamily: "mon-b",
            textAlign: "center",
          }}
        >
          Let's Get Started!
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Image
            style={{ width: 240, height: 240, borderRadius: 20 }}
            source={{
              uri: "https://media.istockphoto.com/id/1410277332/vector/man-touching-bike-rental-station-terminal-screen-on-modern-cityscape-street-businessman.jpg?s=612x612&w=0&k=20&c=kNl6-s_GGFj3hNftNqEbGu1Np2Knyzr-ND4rNVXntWo=",
            }}
          />
        </View>
        <View>
          <View>
            <TouchableOpacity
              activeOpacity={0.5}
              style={{
                backgroundColor: Colors.yellow,
                borderRadius: 8,
                paddingVertical: 16,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontFamily: "mon-b",
                  fontSize: 16,
                }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: "center",
              flexDirection: "row",
              marginTop: 8,
            }}
          >
            <Text style={{ fontFamily: "mon-sb", color: Colors.light }}>
              Already have an account?{" "}
            </Text>
            <TouchableOpacity activeOpacity={0.5}>
              <Text style={{ fontFamily: "mon-sb", color: Colors.yellow }}>
                Log in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.secondary,
  },
});
