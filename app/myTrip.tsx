import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { useTrips } from "@/contexts/tripsContext";
import { router } from "expo-router";
import * as Location from "expo-location";
import { LocationSubscription } from "expo-location";
import Colors from "@/constants/Colors";
import { useRef } from "react";
import { bookingApi } from "@/services/booking-api";
import { CoordinateInterface } from "@/interfaces/coordinate";
import { BOOKING_STATUS } from "@/constants/Status";

let watchId: LocationSubscription;

const MyTrip = () => {
  const { onEndTrip, tripState } = useTrips();
  const coordsRef = useRef<CoordinateInterface[]>([]);
  const startWatchingLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission to access location was denied");
        return;
      }
      watchId = await Location.watchPositionAsync(
        { distanceInterval: 2 },
        (location) => {
          const { latitude, longitude } = location.coords;
          console.log("New position:", latitude, longitude);
          coordsRef.current.push({
            latitude: latitude.toString(),
            longitude: longitude.toString(),
          });
        }
      );
    } catch (error) {
      console.log("Error watching position:", error);
    }
  };

  const stopWatchingLocation = () => {
    if (watchId) {
      watchId.remove();
      console.log("Đã dừng theo dõi vị trí");
      console.log(coordsRef.current);
      if (coordsRef.current.length > 0) createTripDetail();
      coordsRef.current = [];
    }
  };

  const createTripDetail = async () => {
    const res = await bookingApi.createTripDetail(
      tripState?.bookingId || "",
      "65fbeea240b7773e46da92be",
      BOOKING_STATUS.CLOSED,
      coordsRef.current
    );
  };

  const handleEndTrip = () => {
    onEndTrip && onEndTrip();
    Alert.alert("Chuyến đi đã kết thúc");
    router.back();
  };
  return (
    <View style={styles.container}>
      <Text>MyTrip</Text>

      <TouchableOpacity
        onPress={() => {
          handleEndTrip();
        }}
        activeOpacity={0.8}
        style={{
          padding: 16,
          borderRadius: 12,
          backgroundColor: Colors.secondary,
        }}
      >
        <Text
          style={{
            color: Colors.lightGrey,
            fontFamily: "mon-sb",
            textAlign: "center",
          }}
        >
          Kết thúc chuyến đi
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          stopWatchingLocation();
        }}
        style={{
          position: "absolute",
          right: 0,
          top: "50%",
          padding: 16,
          borderRadius: 12,
          backgroundColor: Colors.yellow,
        }}
      >
        <Text style={{ color: Colors.lightGrey, fontFamily: "mon-sb" }}>
          Close
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          startWatchingLocation();
        }}
        style={{
          position: "absolute",
          right: 0,
          top: "60%",
          padding: 16,
          borderRadius: 12,
          backgroundColor: Colors.secondary,
        }}
      >
        <Text style={{ color: Colors.lightGrey, fontFamily: "mon-sb" }}>
          Start
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MyTrip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
  },
});
