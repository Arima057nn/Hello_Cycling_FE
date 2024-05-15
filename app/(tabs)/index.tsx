import { StationCountInterface } from "@/interfaces/station";
import { stationApi } from "@/services/station-api";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { Link } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
// import MapView from "react-native-map-clustering";
import CustomHandle from "@/components/CustomHandle";
import StationDetailCycling from "@/components/StationDetailCycling";
import Colors from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { useLocation } from "@/contexts/locationContext";

const INITIAL_REGION = {
  latitude: 21.03,
  longitude: 105.78,
  latitudeDelta: 0.02,
  longitudeDelta: 0.02,
};

export default function Home() {
  const mapRef = useRef<MapView>();
  const { coordinate } = useLocation();
  const sheetRef = useRef<BottomSheet>(null);
  const [bottomSheetIndex, setBottomSheetIndex] = useState(-1);
  const [stations, setStations] = useState<StationCountInterface[]>();
  const [selectedListing, setSelectedListing] =
    useState<StationCountInterface | null>(null);
  const { latitude, longitude } = useLocalSearchParams<{
    latitude: string;
    longitude: string;
  }>();

  useEffect(() => {
    getStations();
  }, []);
  const getStations = async () => {
    let res = await stationApi.getCountOfCyclingAtStation();
    setStations(res?.data);
  };
  const onMarkerSelected = (event: StationCountInterface) => {
    setSelectedListing(event);
    setBottomSheetIndex(0); // Step 4: Open BottomSheet to 50%
  };
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
  useEffect(() => {
    if (latitude !== undefined && longitude !== undefined) {
      moveToLocation(+latitude, +longitude);
      setTimeout(() => {
        moveToLocation(+latitude, +longitude).then(() => {});
      }, 50);
    }
  }, [latitude, longitude]);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" animated={true} />
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton={false}
        ref={mapRef as React.RefObject<MapView>}
      >
        {stations?.map((item: StationCountInterface) => (
          <Marker
            key={item.station._id}
            onPress={() => onMarkerSelected(item)}
            coordinate={{
              latitude: +item.station.latitude,
              longitude: +item.station.longitude,
            }}
          >
            <View style={styles.marker}>
              <Text style={styles.markerText}>{item.count}</Text>
            </View>
          </Marker>
        ))}
      </MapView>

      <BottomSheet
        style={styles.sheetContainer}
        ref={sheetRef}
        snapPoints={["50%", "95%"]}
        enablePanDownToClose
        index={bottomSheetIndex} // Step 3: Control BottomSheet with state
        onChange={setBottomSheetIndex} // Step 2: Update state on change
        handleComponent={CustomHandle}
      >
        {selectedListing && <StationDetailCycling station={selectedListing} />}
      </BottomSheet>
      <View>
        <TouchableOpacity
          activeOpacity={0.6}
          style={{ ...styles.locationBtn, bottom: 50 }}
          onPress={() => {
            if (coordinate?.latitude && coordinate?.longitude) {
              moveToLocation(coordinate.latitude, coordinate.longitude);
            }
          }}
        >
          <Ionicons name="locate" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.absoluteSearch}>
        <Link href={"/search"} asChild>
          <TouchableOpacity activeOpacity={0.8}>
            <View style={styles.searchBtn}>
              <Ionicons name="search" size={24} color={Colors.lightGrey} />
              <View>
                <Text style={{ fontFamily: "mon-sb", color: Colors.lightGrey }}>
                  Where to?
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  absoluteSearch: {
    position: "absolute",
    top: 50,
    width: "100%",
    alignItems: "center",
  },
  searchBtn: {
    backgroundColor: "#fff",
    flexDirection: "row",
    gap: 10,
    padding: 12,
    alignItems: "center",
    width: 360,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#c2c2c2",
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
  marker: {
    // paddingVertical: 8,
    paddingHorizontal: 4,

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.secondary,
    elevation: 5,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 10,
    },
  },
  markerText: {
    fontSize: 14,
    fontFamily: "mon-sb",
    color: Colors.light,
  },
  sheetContainer: {
    // backgroundColor: "#333",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    // borderTopLeftRadius: 16,
    // borderTopRightRadius: 16,
    shadowOffset: {
      width: 1,
      height: 1,
    },
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
