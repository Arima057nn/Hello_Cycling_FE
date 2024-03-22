import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TextInput,
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
        <View>
          {StationInfo.map((station: StationCountAndDistanceInterface) => (
            <Text key={station.station._id}>{station.station.name}</Text>
          ))}
        </View>
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
  },
  input: {
    flex: 1,
    fontSize: 14,
    marginLeft: 8,
    letterSpacing: 1,
    color: Colors.grey,
    fontFamily: "mon",
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
});
