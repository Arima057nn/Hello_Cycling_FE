import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import Animated from "react-native-reanimated";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { StationCountInterface } from "@/interfaces/station";
import { stationApi } from "@/services/station-api";
import { CyclingAtStationInterface } from "@/interfaces/cycling";
import { defaultStyles } from "@/constants/Styles";

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
      <View style={styles.dragArea}>
        <View style={styles.dragHandle}></View>
      </View>
      <Animated.View style={styles.infoContainer}>
        <Text style={styles.code}>St No.{memoizedStation?.station.code}</Text>
        <Text style={styles.name}>{memoizedStation?.station.name}</Text>
        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}
        >
          <Ionicons name="location" size={16} color={Colors.blue} />
          <Text style={styles.location}>
            {memoizedStation?.station.position}
          </Text>
        </View>
      </Animated.View>
      <View></View>
      <Animated.ScrollView style={styles.containerCycling}>
        {Array.isArray(cyclings) &&
          cyclings.map((cycling: CyclingAtStationInterface) => (
            <View style={styles.cycling}>
              <Image
                style={styles.cyclingImage}
                source={{
                  uri: "https://www.jrccd.co.jp//storage/img/shopinfo/tni12202021014061.png",
                }}
              />
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Text
                  style={{
                    fontFamily: "mon",
                    color: Colors.grey,
                    fontSize: 12,
                  }}
                >
                  10$/30min
                </Text>
                <Text
                  style={{
                    fontFamily: "mon",
                    color: Colors.grey,
                    fontSize: 10,
                    marginVertical: 4,
                  }}
                >
                  (+1$/15min)
                </Text>
                <Text
                  style={{
                    fontFamily: "mon",
                    color: Colors.grey,
                    fontSize: 12,
                  }}
                >
                  30$/1day
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: Colors.grey,
                    fontFamily: "mon-sb",
                    marginBottom: 6,
                  }}
                >
                  {cycling.cyclingId.code}
                </Text>
                <TouchableOpacity
                  style={[defaultStyles.btn]}
                  activeOpacity={0.6}
                >
                  <Text style={defaultStyles.btnText}>Select</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
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
    padding: 16,
    paddingTop: 2,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  code: {
    fontSize: 12,
    color: Colors.grey,
    fontFamily: "mon",
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "mon-sb",
    color: Colors.lightGrey,
  },
  location: {
    fontSize: 12,
    marginLeft: 4,
    color: Colors.blue,
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
    width: 48,
    height: 6,
    backgroundColor: Colors.grey,
    borderRadius: 10,
  },
  containerCycling: {
    backgroundColor: Colors.Gray100,
    padding: 16,
  },
  cycling: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: Colors.light,
    borderRadius: 4,
    marginBottom: 16,
  },
  cyclingImage: {
    width: 100,
    height: 100,
  },
  cyclingInfo: {
    fontSize: 16,
    fontFamily: "mon-sb",
  },
  cyclingBooking: {
    fontSize: 16,
    fontFamily: "mon-sb",
  },
});
