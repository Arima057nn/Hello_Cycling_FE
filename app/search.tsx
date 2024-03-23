import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { stationApi } from "@/services/station-api";
import { StationCountAndDistanceInterface } from "@/interfaces/station";

const Search = () => {
  const [myLocation, setMyLocation] = useState<any>(null);
  const [StationInfo, setStationInfo] = useState<
    StationCountAndDistanceInterface[]
  >([]);
  useEffect(() => {
    getLocationPermission();
  }, []);
  async function getLocationPermission() {
    let location = await Location.getCurrentPositionAsync({});
    const currentLocation = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    console.log(`${currentLocation.latitude},${currentLocation.longitude}`);
    getCyclingsAtStation(currentLocation.latitude, currentLocation.longitude);
  }
  const getCyclingsAtStation = async (latitude: number, longitude: number) => {
    let res = await stationApi.getCountOfAllCyclingAtStation(
      `${latitude},${longitude}`
    );
    setStationInfo(res.data);
  };
  return (
    <SafeAreaView style={defaultStyles.container}>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" animated={true} />
        <View style={styles.dragArea}>
          <View style={styles.dragHandle}></View>
        </View>
        <View style={styles.containerSearch}>
          <TextInput
            placeholder="Search"
            style={styles.input}
            placeholderTextColor={Colors.lightGrey}
          />
          <View>
            <Ionicons name="search" size={20} color="gray" strokeWidth={3} />
          </View>
        </View>
        <Animated.ScrollView>
          {StationInfo.map((station: StationCountAndDistanceInterface) => (
            <TouchableOpacity activeOpacity={0.4}>
              <View style={styles.itemSearch}>
                <View style={styles.locationIcon}>
                  <Ionicons name="location" size={20} color={Colors.Gray600} />
                </View>
                <View
                  style={{
                    justifyContent: "space-between",
                    flexDirection: "row",
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <View style={{ flex: 6 }}>
                    <Text style={{ fontFamily: "mon-sb" }}>
                      {station.station.code} - {station.station.name}
                    </Text>
                    <Text style={{ fontSize: 10, paddingVertical: 2 }}>
                      {station.station.position}
                    </Text>
                  </View>
                  <Text style={{ fontSize: 12, fontFamily: "mon", flex: 1 }}>
                    {station.distance}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          <View style={styles.itemSearch} />
        </Animated.ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Search;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  inputField: {
    flex: 1,
    padding: 10,
  },
  containerSearch: {
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: Colors.Gray100, // Màu nền trắng nhạt
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    fontSize: 14,
    marginLeft: 8,
    letterSpacing: 1,
    color: Colors.Gray600,
    fontFamily: "mon-sb",
  },
  dragArea: {
    width: 100,
    height: 32,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  dragHandle: {
    width: 60,
    height: 6,
    backgroundColor: Colors.grey,
    borderRadius: 10,
  },
  itemSearch: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.Gray100,
  },
  locationIcon: {
    padding: 4,
    backgroundColor: Colors.secondary,
    borderRadius: 16,
    marginRight: 16,
  },
});
