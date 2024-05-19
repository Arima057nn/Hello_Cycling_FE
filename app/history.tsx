import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Colors from "@/constants/Colors";
import { bookingApi } from "@/services/booking-api";
import Animated from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { TripHistoryInterface } from "@/interfaces/booking";
import { convertDate } from "@/utils/convertDate";
const INITIAL_REGION = {
  latitude: 21.03,
  longitude: 105.78,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02,
};

const History = () => {
  const [history, setHistory] = useState<TripHistoryInterface[]>([]);
  const getTripDetail = async () => {
    const res = await bookingApi.getTripHistory();
    setHistory(res.data);
  };
  useEffect(() => {
    getTripDetail();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" animated={true} />
      <Text style={styles.title}>Lịch sử chuyến đi</Text>
      <Animated.ScrollView>
        <View style={styles.actionContainer}>
          {Array.isArray(history) &&
            history.map((item) => (
              <TouchableOpacity activeOpacity={0.5} key={item._id}>
                <View style={styles.actionItem}>
                  <View style={styles.locationIcon}>
                    <Ionicons
                      name="bicycle-outline"
                      size={20}
                      color={Colors.Gray600}
                    />
                  </View>
                  <View
                    style={{
                      alignItems: "flex-start",
                      width: "80%",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "mon-sb",
                        fontSize: 16,
                      }}
                    >
                      {convertDate(item.bookingId.createdAt)}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginLeft: 8,
                        marginTop: 4,
                      }}
                    >
                      <Ionicons name="time-outline" size={16} />
                      <Text
                        style={{
                          fontSize: 12,
                          color: Colors.Gray600,
                          marginLeft: 4,
                        }}
                      >
                        {item.total} phút
                      </Text>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} />
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.Gray100,
  },
  title: {
    marginBottom: 16,
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "mon-sb",
    color: Colors.lightGrey,
  },
  actionContainer: {
    backgroundColor: Colors.light,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  actionItem: {
    paddingVertical: 18,
    paddingHorizontal: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: Colors.Gray100,
    alignItems: "center",
  },
  locationIcon: {
    padding: 4,
    backgroundColor: Colors.light,
    borderRadius: 16,
    borderColor: Colors.secondary,
    borderWidth: 2,
    marginRight: 16,
  },
});
export default History;
