import { View, StyleSheet, StatusBar, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { stationApi } from "@/services/station-api";
import { CyclingStationInterface } from "@/interfaces/station";

const Cycling = () => {
  const [cycling, setCycling] = useState<CyclingStationInterface>();
  const { code, cyclingId } = useLocalSearchParams<{
    code: string;
    cyclingId: string;
  }>();

  useEffect(() => {
    findCyclingAtStation();
  }, []);

  const findCyclingAtStation = async () => {
    const res = await stationApi.findCyclingAtStation(cyclingId);
    setCycling(res.data);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" animated={true} />
      <Text>Có phải bạn muốn thuê xe này {cycling?.cyclingId.name}</Text>
    </View>
  );
};

export default Cycling;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.light,
  },
});
