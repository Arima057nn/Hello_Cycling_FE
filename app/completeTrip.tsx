import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router";
import { bookingApi } from "@/services/booking-api";
import { TripDetailInterface } from "@/interfaces/booking";
import { convertDate } from "@/utils/convertDate";
import { Ionicons } from "@expo/vector-icons";
import { calculateDistanceTrip } from "@/utils/calculateDistanceTrip";

const CompleteTrip = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [tripDetail, setTripDetail] = useState<TripDetailInterface>();
  const getTripDetail = async () => {
    const res = await bookingApi.getTripDetail(id);
    if (res.status === 200) {
      setTripDetail(res.data);
    }
  };
  useEffect(() => {
    getTripDetail();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.detailContainer}>
          <View style={styles.succesIcon}>
            <Image
              style={{ width: 52, height: 52 }}
              source={require("@/assets/images/checked.png")}
            />
          </View>
          <View style={styles.detail}></View>
          <Text
            style={{ fontSize: 18, fontWeight: "500", color: Colors.Gray600 }}
          >
            Trả xe thành công
          </Text>
          <View
            style={[
              styles.itemContainer,
              {
                borderBottomWidth: 2,
                borderBottomColor: Colors.Gray200,
                paddingBottom: 10,
              },
            ]}
          >
            <Text
              style={{
                fontFamily: "mon-sb",
                fontSize: 16,
                color: Colors.lightGrey,
              }}
            >
              {tripDetail?.bookingId.cyclingId.code}
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: Colors.Gray600,
              }}
            >
              {tripDetail?.bookingId.ticketId.name}
            </Text>
          </View>
          <View
            style={{
              paddingVertical: 16,
              flexDirection: "row",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <View
              style={{
                borderRadius: 8,
                width: "75%",
                height: 64,
                backgroundColor: Colors.Gray100,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "500",
                  fontFamily: "mon-sb",
                }}
              >
                {tripDetail?.payment} VNĐ
              </Text>
              <Text style={{ fontSize: 12, color: Colors.Gray400 }}>
                Phí trả
              </Text>
            </View>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.info}>Mã chuyến</Text>
            <Text style={styles.info}>{tripDetail?.bookingId._id}</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.info}>Trạm bắt đầu</Text>
            <Text style={styles.info}>
              {tripDetail?.bookingId.startStation.name}
            </Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.info}>Trạm kết thúc</Text>
            <Text style={styles.info}>{tripDetail?.endStation.name}</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.info}>Loại xe</Text>
            <Text style={styles.info}>
              {tripDetail?.bookingId.cyclingId.category.name}
            </Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.info}>Thời gian bắt đầu</Text>
            <Text style={styles.info}>
              {convertDate(tripDetail?.bookingId.createdAt)}
            </Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.info}>Thời gian kết thúc</Text>
            <Text style={styles.info}>
              {convertDate(tripDetail?.createdAt)}
            </Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.info}>Thời gian sử dụng</Text>
            <Text style={styles.info}>{tripDetail?.total} phút</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={styles.info}>Quãng đường di chuyển</Text>
            <Text style={styles.info}>
              {calculateDistanceTrip(tripDetail?.tripHistory)} km
            </Text>
          </View>
          <View style={{ marginTop: 28 }}>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.secondary,
                padding: 14,
                borderRadius: 6,
                marginTop: 16,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => router.back()}
            >
              <Ionicons name="return-down-back" size={20} />
              <Text
                style={{
                  color: Colors.Gray600,
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "500",
                  marginLeft: 4,
                }}
              >
                Quay lại
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.title}>Kết quả trả xe</Text>
      </View>
    </View>
  );
};

export default CompleteTrip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Gray100,
  },
  headerContainer: {
    height: "25%",
    backgroundColor: Colors.secondary,
    paddingHorizontal: 16,
    paddingVertical: 52,
    flexDirection: "column",
    alignItems: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: "mon-sb",
    color: Colors.lightGrey,
  },
  detailContainer: {
    position: "absolute",
    height: 560,
    width: "100%",
    paddingHorizontal: 20,
    backgroundColor: Colors.light,
    top: 132,
    borderRadius: 8,
    alignItems: "center",
  },
  succesIcon: {
    position: "absolute",
    top: -32,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light,
    width: 64,
    height: 64,
    borderRadius: 200,
  },
  detail: {
    marginTop: 40,
  },
  itemContainer: {
    marginTop: 8,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  infoTitle: {
    fontSize: 16,
    color: Colors.Gray400,
  },
  info: {
    fontSize: 16,
    color: Colors.Gray400,
  },
});
