import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useRef } from "react";
import { useTrips } from "@/contexts/tripsContext";
import { router } from "expo-router";
import Colors from "@/constants/Colors";
import { bookingApi } from "@/services/booking-api";
import { BOOKING_STATUS } from "@/constants/Status";
import { useLocation } from "@/contexts/locationContext";
import { stationApi } from "@/services/station-api";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

const INITIAL_REGION = {
  latitude: 21.03,
  longitude: 105.78,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02,
};

const MyTrip = () => {
  const { onEndTrip, tripState } = useTrips();
  const { coordinate } = useLocation();
  const mapRef = useRef<MapView>();

  async function moveToLocation(latitude: number, longitude: number) {
    if (mapRef.current) {
      const newRegion = {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      mapRef.current.animateToRegion(newRegion);
    }
  }

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
      if (res.status !== 200) {
        Alert.alert(res.data.error);
      } else {
        onEndTrip && onEndTrip();
        Alert.alert("Chuyến đi đã kết thúc");
        router.back();
      }
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
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton={false}
        ref={mapRef as React.RefObject<MapView>}
      ></MapView>

      <View>
        <TouchableOpacity
          activeOpacity={0.6}
          style={{ ...styles.locationBtn, bottom: 124 }}
          onPress={() => {
            if (coordinate?.latitude && coordinate?.longitude) {
              moveToLocation(coordinate.latitude, coordinate.longitude);
            }
          }}
        >
          <Ionicons name="locate" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 60,
          justifyContent: "center",
          width: "100%",
          paddingHorizontal: 24,
        }}
      >
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
    </View>
  );
};

export default MyTrip;

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
