import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { useTrips } from "@/contexts/tripsContext";
import { router } from "expo-router";
import Colors from "@/constants/Colors";
import { bookingApi } from "@/services/booking-api";
import { BOOKING_STATUS } from "@/constants/Status";

const MyTrip = () => {
  const { onEndTrip, tripState } = useTrips();

  const createTripDetail = async () => {
    const res = await bookingApi.createTripDetail(
      tripState?.bookingId || "",
      "65fbf25d35e7132ec24403b7",
      BOOKING_STATUS.CLOSED
    );
  };

  const handleEndTrip = () => {
    createTripDetail();
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
