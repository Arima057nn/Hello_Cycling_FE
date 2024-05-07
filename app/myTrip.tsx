import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { useTrips } from "@/contexts/tripsContext";
import { router } from "expo-router";
import Colors from "@/constants/Colors";
import { bookingApi } from "@/services/booking-api";
import { BOOKING_STATUS } from "@/constants/Status";
import { useLocation } from "@/contexts/locationContext";
import { stationApi } from "@/services/station-api";

const MyTrip = () => {
  const { onEndTrip, tripState } = useTrips();
  const { coordinate } = useLocation();

  const createTripDetail = async () => {
    try {
      const stations = await stationApi.getCountOfAllCyclingAtStation(
        `${coordinate?.latitude},${coordinate?.longitude}`
      );

      if (!stations || !stations.data || !stations.data[0]) {
        throw new Error("No station data found");
      }

      const station = stations.data[0];

      if (station.value < 150) {
        await handleTripEnd(station.station._id);
      } else {
        Alert.alert("Hãy di chuyển xe vào đúng chỗ để kết thúc chuyến đi");
      }
    } catch (error) {
      console.error("Error creating trip detail:", error);
      Alert.alert("Đã xảy ra lỗi, vui lòng thử lại sau");
    }
  };

  const handleTripEnd = async (stationId: string) => {
    try {
      const res = await bookingApi.createTripDetail(
        tripState?.bookingId || "",
        stationId,
        BOOKING_STATUS.CLOSED
      );
      onEndTrip && onEndTrip();
      Alert.alert("Chuyến đi đã kết thúc");
      router.back();
    } catch (error) {
      console.error("Error ending trip:", error);
      Alert.alert("Đã xảy ra lỗi khi kết thúc chuyến đi");
    }
  };

  const handleEndTrip = () => {
    createTripDetail();
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
