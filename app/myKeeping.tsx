import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";

import Colors from "@/constants/Colors";
import { useTrips } from "@/contexts/tripsContext";
import { bookingApi } from "@/services/booking-api";
import { BookingOnKeepingInterface } from "@/interfaces/booking";
import { router } from "expo-router";
import { BOOKING_STATUS } from "@/constants/Status";

const MyKeeping = () => {
  const { tripState, onEndTrip, onStartTrip } = useTrips();
  const [trip, setTrip] = useState<BookingOnKeepingInterface>();

  const findTripById = async () => {
    if (tripState?.bookingId) {
      const res = await bookingApi.findTripById(tripState?.bookingId);
      if (res.status === 200) {
        setTrip(res.data);
      }
    }
  };

  const handleCreateKeeping = async () => {
    if (tripState && trip) {
      const res = await bookingApi.startFromKeeping(tripState?.bookingId);
      if (res.status === 200) {
        console.log("res.status", res.data);
        if (onStartTrip !== undefined) {
          onStartTrip(
            res.data._id,
            res.data.cyclingId,
            res.data.startStation,
            BOOKING_STATUS.ACTIVE
          );
        }
        Alert.alert("Bắt đầu chuyến đi thành công");
        router.push("/myTrip");
      } else Alert.alert("Bắt đầu chuyến đi thất bại", res.data.error);
    }
  };

  const cancelKeeping = async () => {
    if (tripState && trip) {
      const res = await bookingApi.cancelKeeping(
        tripState?.bookingId,
        trip?.cyclingId?.category._id
      );
      if (res.status === 200) {
        onEndTrip && onEndTrip();
        Alert.alert("Hủy giữ chỗ thành công");
        router.back();
      } else Alert.alert("Hủy giữ chỗ thất bại");
    }
  };
  useEffect(() => {
    findTripById();
  }, []);
  return (
    <View style={styles.container}>
      <Text>Keeping</Text>
      <Text>{tripState?.bookingId}</Text>
      <Text>{tripState?.cyclingId}</Text>
      <Text>{tripState?.startStation}</Text>
      <Text>{trip?.cyclingId?.category._id}</Text>
      <View
        style={{
          justifyContent: "center",
          width: "100%",
          paddingHorizontal: 24,
        }}
      >
        <TouchableOpacity
          onPress={() => handleCreateKeeping()}
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
            Bắt đầu chuyến đi
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => cancelKeeping()}
          activeOpacity={0.8}
          style={{
            padding: 16,
            borderRadius: 12,
            backgroundColor: Colors.secondary,
            marginTop: 16,
          }}
        >
          <Text
            style={{
              color: Colors.lightGrey,
              fontFamily: "mon-sb",
              textAlign: "center",
            }}
          >
            Hủy giữ chỗ
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyKeeping;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  locationBtn: {
    position: "absolute",
    right: 20,
    backgroundColor: Colors.light,
    padding: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.32,
    shadowRadius: 8,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});
