import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Animated from "react-native-reanimated";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { StationCountInterface } from "@/interfaces/station";
import { stationApi } from "@/services/station-api";
import { CyclingAtStationInterface } from "@/interfaces/cycling";

interface Props {
  station: StationCountInterface | null;
}

const IMG_HEIGHT = 200;
const StationDetailCycling = ({ station }: Props) => {
  console.log("station", station?.station.name);
  const [cyclings, setCyclings] = useState<CyclingAtStationInterface[]>();
  useEffect(() => {
    getCyclings();
  }, [station]);

  const getCyclings = async () => {
    let res = await stationApi.getCyclingsAtStation(station?.station._id);
    setCyclings(res.data);
  };

  const memoizedStation = useMemo(() => station, [station]);
  return (
    <View style={styles.container}>
      <Animated.Image
        source={{
          uri: memoizedStation?.station.imgae,
        }}
        style={styles.image}
      />
      <Text>{memoizedStation?.station.name}</Text>
      <Animated.ScrollView>
        <View style={styles.infoContainer}>
          {Array.isArray(cyclings) &&
            cyclings.map((cycling: CyclingAtStationInterface) => (
              <View key={cycling.cyclingId._id}>
                <Text style={styles.name}>{cycling.cyclingId.name}</Text>
              </View>
            ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

export default StationDetailCycling;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: "100%",
    height: IMG_HEIGHT,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  infoContainer: {
    padding: 24,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "mon-sb",
  },
  location: {
    fontSize: 18,
    marginTop: 10,
    fontFamily: "mon-sb",
  },
  rooms: {
    fontSize: 16,
    color: Colors.grey,
    marginVertical: 4,
    fontFamily: "mon",
  },
  ratings: {
    fontSize: 16,
    fontFamily: "mon-sb",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.grey,
    marginVertical: 16,
  },
  host: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.grey,
  },
  hostView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  footerText: {
    height: "100%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  footerPrice: {
    fontSize: 18,
    fontFamily: "mon-sb",
  },
  roundButton: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    color: Colors.primary,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: "mon",
  },
});
