import { useRef } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
// import MapView from "react-native-map-clustering";

const INITIAL_REGION = {
  latitude: 21,
  longitude: 105,
  latitudeDelta: 2,
  longitudeDelta: 2,
};

export default function TabOneScreen() {
  const mapRef = useRef<MapView | undefined>();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" animated={true} />
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={INITIAL_REGION}
        showsUserLocation
        showsMyLocationButton
      />
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
});
