import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Location from "expo-location";
import { LocationSubscription } from "expo-location";
import Colors from "@/constants/Colors";
import { useRef } from "react";
import { bookingApi } from "@/services/booking-api";
import { CoordinateInterface } from "@/interfaces/coordinate";

let watchId: LocationSubscription;

export default function Booking() {
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
      createTripDetail();
      coordsRef.current = [];
    }
  };

  const createTripDetail = async () => {
    const res = await bookingApi.createTripDetail(
      "6607afaf9ed275d7705ccf1a",
      "65fbf1da35e7132ec24403b2",
      2,
      coordsRef.current
    );
    console.log("Create trip detail:", res.data);
  };

  return (
    <View style={styles.container}>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
