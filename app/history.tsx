import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Colors from "@/constants/Colors";
import { bookingApi } from "@/services/booking-api";
import { CoordinateInterface } from "@/interfaces/coordinate";
import { set } from "firebase/database";
import Animated from "react-native-reanimated";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
const INITIAL_REGION = {
  latitude: 21.03,
  longitude: 105.78,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02,
};

const History = () => {
  const [history, setHistory] = useState<CoordinateInterface[]>([]);
  const mapRef = useRef<MapView>();
  const getTripDetail = async () => {
    const res = await bookingApi.getTripDetail("661f3701ebe513e1b9fe9ac1");
    setHistory(res.data.tripHistory);
  };
  useEffect(() => {
    getTripDetail();
  }, []);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        ref={mapRef as React.RefObject<MapView>}
      >
        {history.map((coord, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(coord.latitude),
              longitude: parseFloat(coord.longitude),
            }}
          >
            <View style={styles.cycling}></View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.Gray100,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  cycling: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    height: 1,
    width: 1,
    padding: 2,
  },
});
export default History;
