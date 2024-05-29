import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { bookingApi } from "@/services/booking-api";
import { TripDetailInterface } from "@/interfaces/booking";
import { convertDate } from "@/utils/convertDate";
import { calculateDistanceTrip } from "@/utils/calculateDistanceTrip";

const INITIAL_REGION = {
  latitude: 21.03,
  longitude: 105.78,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02,
};

const HistoryDetail = () => {
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
            Thông tin chi tiết
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
        </View>
        <Text style={styles.title}>Lich sử chuyến đi</Text>
      </View>
    </View>
  );
};

export default HistoryDetail;

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
    height: 680,
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
  info: {
    fontSize: 16,
    color: Colors.Gray400,
  },
});
