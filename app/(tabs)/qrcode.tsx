import { cyclingApi } from "@/services/cycling-api";
import { CameraView, useCameraPermissions } from "expo-camera/next";
import { router, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, StatusBar, StyleSheet, View } from "react-native";

export default function Qrcode() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [processing, setProcessing] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (!permission?.granted) return;
    requestPermission();
  }, [permission]);
  
  const handleBarCodeScanned = async ({
    type,
    data,
  }: {
    type: any;
    data: string;
  }) => {
    if (processing || scanned) return;
    setScanned(true);
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
  };

  useEffect(() => {
    navigation.addListener("focus", () => {
      setScanned(false);
    });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" animated={true} />

      <CameraView
        style={styles.camera}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={handleBarCodeScanned}
      ></CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
});
