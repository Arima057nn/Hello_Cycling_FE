import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { TripInterface } from "@/interfaces/booking";
import { bookingApi } from "@/services/booking-api";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { BOOKING_STATUS } from "@/constants/Status";

const Trips = () => {
  const [trips, setTrips] = useState<TripInterface[]>([]);

  const getTripsCurrent = async () => {
    const res = await bookingApi.getTripsCurrent();
    if (res.status === 200) setTrips(res.data);
  };

  useEffect(() => {
    getTripsCurrent();
  }, []);

  const handleFinishTrip = async (trip: TripInterface) => {
    console.log("trip", trip.cyclingId.code);
    if (trip.status === BOOKING_STATUS.ACTIVE) {
      const res = await bookingApi.createTripDetail(
        trip._id,
        "65fbeeed40b7773e46da92c1"
      );
      if (res.status === 200) {
        Alert.alert("Kết thúc chuyến đi thành công");
        getTripsCurrent();
      } else {
        Alert.alert("Kết thúc chuyến đi thất bại", res.data.error);
      }
    }
  };

  const handleCancelKeepingTrip = async (trip: TripInterface) => {
    console.log("trip", trip.cyclingId.code);
    if (trip.status === BOOKING_STATUS.KEEPING) {
      const res = await bookingApi.cancelKeeping(
        trip._id,
        trip.cyclingId.category._id
      );
      if (res.status === 200) {
        Alert.alert("Hủy giữ xe thành công");
        getTripsCurrent();
      } else {
        Alert.alert("Hủy giữ xe thất bại", res.data.error);
      }
    }
  };

  const handleStartFromKeepingTrip = async (trip: TripInterface) => {
    console.log("trip", trip.cyclingId.code);
    if (trip.status === BOOKING_STATUS.KEEPING) {
      const res = await bookingApi.startFromKeeping(trip._id);
      if (res.status === 200) {
        Alert.alert("Bắt đầu chuyến đi thành công");
        getTripsCurrent();
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Xe đang sử dụng</Text>

      {trips.map((trip) => (
        <View style={styles.card} key={trip._id}>
          <View style={{}}>
            <Text
              style={{
                fontFamily: "mon-sb",
                fontSize: 16,
                color: Colors.lightGrey,
              }}
            >
              {trip.cyclingId.code} - {trip.ticketId.name}
            </Text>
            {trip.status === BOOKING_STATUS.ACTIVE && (
              <Text style={{ color: Colors.green }}>Đang di chuyển</Text>
            )}

            {trip.status === BOOKING_STATUS.KEEPING && (
              <Text style={{ color: Colors.secondary }}>Đang giữ xe</Text>
            )}
          </View>
          <View>
            {trip.status === BOOKING_STATUS.ACTIVE && (
              <TouchableOpacity
                onPress={() => handleFinishTrip(trip)}
                activeOpacity={0.8}
                style={styles.actionBtn}
              >
                <Ionicons name="stop" size={16} style={styles.icon} />
              </TouchableOpacity>
            )}
            {trip.status === BOOKING_STATUS.KEEPING && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  onPress={() => handleCancelKeepingTrip(trip)}
                  activeOpacity={0.8}
                  style={styles.actionBtn}
                >
                  <Ionicons name="close" size={16} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleStartFromKeepingTrip(trip)}
                  activeOpacity={0.8}
                  style={styles.actionBtn}
                >
                  <Ionicons
                    name="caret-forward"
                    size={16}
                    style={styles.icon}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      ))}
    </View>
  );
};

export default Trips;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.Gray100,
  },
  card: {
    padding: 16,
    backgroundColor: Colors.light,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 4,
    marginBottom: 8,
    flexDirection: "row",
  },
  title: {
    marginBottom: 24,
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "mon-sb",
    color: Colors.lightGrey,
  },
  actionBtn: {
    borderRadius: 100,
    padding: 6,
    backgroundColor: Colors.red,
  },
  icon: {
    color: Colors.light,
  },
});
