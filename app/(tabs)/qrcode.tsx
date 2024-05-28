import { cyclingApi } from "@/services/cycling-api";
import { CameraView, useCameraPermissions } from "expo-camera/next";
import { useRouter, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StatusBar, StyleSheet, Text, View } from "react-native";

export default function Qrcode() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [processing, setProcessing] = useState(false);
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    if (permission === null) {
      requestPermission();
    }
  }, [permission]);

  const handleBarCodeScanned = async ({
    type,
    data,
  }: {
    type: any;
    data: string;
  }) => {
    if (processing || scanned) return; // Prevent multiple scans

    setScanned(true);
    setProcessing(true);

    try {
      const res = await cyclingApi.findCycling(data);
      if (res.status !== 200) {
        Alert.alert("Not found", "", [
          {
            text: "OK",
            onPress: () => {
              setProcessing(false);
              setScanned(false);
            },
          },
        ]);
        return;
      }

      router.push({
        pathname: "/cycling",
        params: {
          code: data,
          cyclingId: res.data._id,
        },
      });
    } catch (error) {
      Alert.alert("Error", "An error occurred while scanning.", [
        {
          text: "OK",
          onPress: () => {
            setProcessing(false);
            setScanned(false);
          },
        },
      ]);
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setScanned(false); // Reset scanned state when screen is focused
    });
    return unsubscribe;
  }, [navigation]);

  if (permission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" animated={true} />
      <CameraView
        style={styles.camera}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned} // Only set handler if not scanned
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
});
