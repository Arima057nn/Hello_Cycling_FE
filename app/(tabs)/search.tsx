import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { stationApi } from "@/services/station-api";
import { StationCountAndDistanceInterface } from "@/interfaces/station";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated from "react-native-reanimated";
import { useLocation } from "@/contexts/locationContext";

const Search = () => {
  const { coordinate } = useLocation();
  const [StationInfo, setStationInfo] = useState<
    StationCountAndDistanceInterface[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (coordinate) {
      console.log("coord", coordinate.latitude, coordinate.longitude);
      getCyclingsAtStation(+coordinate.latitude, +coordinate.longitude);
    }
  }, []);
  const getCyclingsAtStation = async (latitude: number, longitude: number) => {
    let res = await stationApi.getCountOfAllCyclingAtStation(
      `${latitude},${longitude}`
    );
    setStationInfo(res?.data || []);
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  const filteredStations = StationInfo.filter((station) =>
    station.station.position.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={defaultStyles.container}>
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" animated={true} />

        <View style={styles.containerHeader}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{ marginRight: 8 }}
            onPress={() => router.back()}
          >
            <Ionicons
              name="arrow-back-circle"
              size={30}
              color="gray"
              strokeWidth={3}
            />
          </TouchableOpacity>
          <View style={styles.containerSearch}>
            <TextInput
              placeholder="Search"
              style={styles.input}
              placeholderTextColor={Colors.lightGrey}
              value={searchQuery}
              onChangeText={handleSearch}
            />
            <View>
              <Ionicons name="search" size={20} color="gray" strokeWidth={3} />
            </View>
          </View>
        </View>

        <Animated.ScrollView>
          {Array.isArray(filteredStations) &&
            filteredStations?.map(
              (station: StationCountAndDistanceInterface) => (
                <TouchableOpacity
                  activeOpacity={0.4}
                  key={station.station._id}
                  onPress={() =>
                    router.navigate({
                      pathname: "/",
                      params: {
                        latitude: station.station.latitude,
                        longitude: station.station.longitude,
                      },
                    })
                  }
                >
                  <View style={styles.itemSearch}>
                    <View style={styles.locationIcon}>
                      <Ionicons
                        name="location"
                        size={20}
                        color={Colors.Gray600}
                      />
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
                      <Text
                        style={{ fontSize: 12, fontFamily: "mon", flex: 1 }}
                      >
                        {station.distance}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            )}

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
    paddingTop: 12,
  },
  inputField: {
    flex: 1,
    padding: 10,
  },
  containerHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  containerSearch: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: Colors.Gray100,
    paddingHorizontal: 12,
    paddingVertical: 12,
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
