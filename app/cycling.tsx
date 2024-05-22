import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { router, useLocalSearchParams } from "expo-router";
import { stationApi } from "@/services/station-api";
import { CyclingStationInterface } from "@/interfaces/station";
import Animated from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { defaultStyles } from "@/constants/Styles";
import { bookingApi } from "@/services/booking-api";
import { useTrips } from "@/contexts/tripsContext";
import { BOOKING_STATUS } from "@/constants/Status";
import { ticketApi } from "@/services/ticket-api";
import { TicketInterface } from "@/interfaces/ticket";

const Cycling = () => {
  const [cycling, setCycling] = useState<CyclingStationInterface>();
  const [ticket, setTicket] = useState<TicketInterface>();
  const { onStartTrip } = useTrips();
  const { code, cyclingId } = useLocalSearchParams<{
    code: string;
    cyclingId: string;
  }>();
  useEffect(() => {
    findCyclingAtStation();
    selectTicketToUse();
  }, []);

  const findCyclingAtStation = async () => {
    const res = await stationApi.findCyclingAtStation(cyclingId);
    if (res.status === 200) setCycling(res.data);
  };
  const selectTicketToUse = async () => {
    const res = await ticketApi.selectTicket(cyclingId);
    setTicket(res.data);
  };

  const handleBooking = async () => {
    if (cycling) {
      const res = await bookingApi.createBooking(
        cyclingId,
        cycling.stationId._id
      );
      if (res.status === 200) {
        if (onStartTrip !== undefined) {
          onStartTrip(
            res.data._id,
            cyclingId,
            cycling.stationId._id,
            BOOKING_STATUS.ACTIVE
          );
        }

        Alert.alert("Chuyến đi đã bắt đầu");
        router.push("/myTrip");
      } else Alert.alert("Đặt xe thất bại", res.data.error);
    } else {
      Alert.alert("Đã xảy ra lỗi, vui lòng thử lại sau");
    }
  };
  const handleCreateKeeping = async () => {
    if (cycling && ticket) {
      const res = await bookingApi.createKeeping(
        cyclingId,
        cycling.stationId._id,
        ticket._id
      );
      if (res.status === 200) {
        if (onStartTrip) {
          onStartTrip(
            res.data._id,
            cyclingId,
            cycling.stationId._id,
            res.data.status
          );
        }
        Alert.alert("Đặt giữ xe thành công");
        router.push("/myKeeping");
      } else Alert.alert("Đặt xe thất bại", res.data.error);
    } else {
      Alert.alert("Đã xảy ra lỗi, vui lòng thử lại sau");
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" animated={true} />
      <Animated.ScrollView>
        <View style={styles.infoContainer}>
          <Animated.Image
            source={{
              uri: cycling?.stationId.imgae,
            }}
            style={styles.imageStation}
          />
          <View style={styles.stationContainer}>
            <Text style={styles.name}>{cycling?.stationId.name}</Text>
            <Text style={styles.location}>{cycling?.stationId.position}</Text>
          </View>
        </View>
        <View style={styles.cyclingContainer}>
          <View>
            <View style={styles.header}>
              <Ionicons name="bicycle" size={24} />
              <Text
                style={{
                  color: Colors.lightGrey,
                  fontSize: 16,
                  fontFamily: "mon",
                  marginLeft: 8,
                }}
              >
                {cycling?.cyclingId.code}
              </Text>
            </View>
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: Colors.Gray100,
                borderRightWidth: 2,
                borderRightColor: Colors.Gray100,
                borderLeftWidth: 2,
                borderLeftColor: Colors.Gray100,
                alignItems: "center",
              }}
            >
              <Animated.Image
                source={{
                  uri: "https://www.jrccd.co.jp//storage/img/shopinfo/tni12202021014061.png",
                }}
                style={styles.imageCycling}
              />
            </View>
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: Colors.Gray100,
                borderRightWidth: 2,
                borderRightColor: Colors.Gray100,
                borderLeftWidth: 2,
                borderLeftColor: Colors.Gray100,
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  borderRightWidth: 2,
                  borderRightColor: Colors.Gray100,
                  paddingHorizontal: 16,
                  justifyContent: "center",
                }}
              >
                <Text style={{ fontFamily: "mon-b", fontSize: 16 }}>Giá</Text>
              </View>
              <View style={{ flexDirection: "column", flex: 1 }}>
                <View>
                  <Text style={styles.price}>10$ / 30min</Text>
                </View>
                <View
                  style={{
                    borderBottomWidth: 2,
                    borderBottomColor: Colors.Gray100,
                    borderTopWidth: 2,
                    borderTopColor: Colors.Gray100,
                  }}
                >
                  <Text style={styles.price}>+1$ / 15min </Text>
                </View>
                <View>
                  <Text style={styles.price}>30$ / 1day</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
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
              Đặt vé trước 1 giờ
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{ color: Colors.dark }}>Ve su dung : {ticket?.name}</Text>
      </Animated.ScrollView>
      <Animated.View style={defaultStyles.footer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={styles.footerText}>
            <Text style={styles.footerPrice}>Bạn đã sẵn sàng chưa?</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              handleBooking();
            }}
            activeOpacity={0.8}
            style={{
              padding: 16,
              borderRadius: 12,
              backgroundColor: Colors.secondary,
              width: 86,
            }}
          >
            <Text
              style={{
                color: Colors.lightGrey,
                fontFamily: "mon-sb",
                textAlign: "center",
              }}
            >
              Đặt xe
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

export default Cycling;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light,
    flexDirection: "column",
  },
  infoContainer: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray100,
  },
  imageStation: {
    width: 100,
    height: 100,
  },
  stationContainer: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "center",
    marginLeft: 12,
  },
  code: {
    fontSize: 12,
    color: Colors.grey,
    fontFamily: "mon",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "mon-sb",
    color: Colors.lightGrey,
  },
  location: {
    fontSize: 12,
    color: Colors.blue,
    fontFamily: "mon-sb",
    marginTop: 4,
  },
  cyclingContainer: {
    padding: 16,
    flexDirection: "column",
  },
  header: {
    padding: 8,
    backgroundColor: Colors.Gray300,
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  imageCycling: {
    width: 180,
    height: 180,
  },
  price: {
    fontFamily: "mon",
    color: Colors.grey,
    fontSize: 16,
    padding: 16,
    textAlign: "center",
  },
  footerText: {
    height: "100%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footerPrice: {
    fontSize: 16,
    fontFamily: "mon-sb",
  },
});
