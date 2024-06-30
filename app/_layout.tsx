import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, router, usePathname } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme } from "@/components/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LocationProvider } from "@/contexts/locationContext";
import { TripsProvider, useTrips } from "@/contexts/tripsContext";
import { bookingApi } from "@/services/booking-api";
import { AuthProvider } from "@/contexts/authContext";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    mon: require("../assets/fonts/Montserrat-Regular.ttf"),
    "mon-sb": require("../assets/fonts/Montserrat-SemiBold.ttf"),
    "mon-b": require("../assets/fonts/Montserrat-Bold.ttf"),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <LocationProvider>
      <AuthProvider>
        <TripsProvider>
          <RootLayoutNav />
        </TripsProvider>
      </AuthProvider>
    </LocationProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { tripState, onTrips, noTrip } = useTrips();
  const currentPath = usePathname();

  const getTripsCurrent = async () => {
    const res = await bookingApi.getTripsCurrent();
    if (res.status === 200 && res.data.length > 0) onTrips && onTrips(true);
    else noTrip && noTrip();
  };

  useEffect(() => {
    getTripsCurrent();
  }, []);
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="welcome"
              options={{
                headerShown: false,
                headerBackTitle: "Back",
              }}
            />
            <Stack.Screen
              name="cycling"
              options={{
                presentation: "modal",
                headerShown: true,
                title: "Cycling",
                headerBackTitle: "Back",
                headerStyle: {
                  backgroundColor: Colors.secondary,
                },
                headerTintColor: Colors.dark,
              }}
            />

            <Stack.Screen
              name="(auth)/newUser"
              options={{
                headerShown: false,
                headerBackTitle: "Back",
              }}
            />
            <Stack.Screen
              name="(auth)/register"
              options={{
                headerShown: false,
                headerBackTitle: "Back",
              }}
            />

            <Stack.Screen
              name="myTicket"
              options={{
                headerShown: true,
                title: "Vé của tôi",
                headerBackTitle: "Back",
                headerStyle: {
                  backgroundColor: Colors.secondary,
                },
                headerTintColor: Colors.dark,
              }}
            />
            <Stack.Screen
              name="history"
              options={{
                headerShown: true,
                title: "Lịch sử chuyến đi",
                headerBackTitle: "Back",
                headerStyle: {
                  backgroundColor: Colors.secondary,
                },
                headerTintColor: Colors.dark,
              }}
            />
            <Stack.Screen
              name="transaction"
              options={{
                headerShown: true,
                title: "Lịch sử giao dịch",
                headerBackTitle: "Back",
                headerStyle: {
                  backgroundColor: Colors.secondary,
                },
                headerTintColor: Colors.dark,
              }}
            />
            <Stack.Screen
              name="trips"
              options={{
                headerShown: true,
                title: "Chuyến đi của tôi",
                headerBackTitle: "Back",
                headerStyle: {
                  backgroundColor: Colors.secondary,
                },
                headerTintColor: Colors.dark,
              }}
            />
            <Stack.Screen
              name="payment"
              options={{
                headerShown: true,
                title: "Nạp điểm",
                headerBackTitle: "Back",
                headerStyle: {
                  backgroundColor: Colors.secondary,
                },
                headerTintColor: Colors.dark,
              }}
            />
            <Stack.Screen
              name="completeTrip"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="profile"
              options={{
                headerShown: true,
                title: "Thông tin cá nhân",
                headerBackTitle: "Back",
                headerStyle: {
                  backgroundColor: Colors.secondary,
                },
                headerTintColor: Colors.dark,
              }}
            />
            <Stack.Screen
              name="historyDetail"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="change"
              options={{
                title: "Đổi xe",
              }}
            />
            <Stack.Screen
              name="report"
              options={{
                headerShown: true,
                title: "Báo cáo sự cố xe",
                headerBackTitle: "Back",
                headerStyle: {
                  backgroundColor: Colors.secondary,
                },
                headerTintColor: Colors.dark,
              }}
            />
          </Stack>
          {!currentPath.includes("/trips") &&
            !currentPath.includes("/cycling") &&
            !currentPath.includes("/search") &&
            !currentPath.includes("/report") &&
            !currentPath.includes("/qrcode") &&
            !currentPath.includes("/change") &&
            !currentPath.includes("/payment") &&
            !currentPath.includes("/(auth)/register") &&
            !currentPath.includes("/(auth)/newUser") &&
            tripState && (
              <View style={styles.absoluteView}>
                <TouchableOpacity
                  style={styles.btn}
                  activeOpacity={0.6}
                  onPress={() => router.navigate("/trips")}
                >
                  <Text style={{ fontFamily: "mon-sb", color: Colors.light }}>
                    On Trips
                  </Text>
                </TouchableOpacity>
              </View>
            )}
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  absoluteView: {
    position: "absolute",
    bottom: 100,
    width: "100%",
    alignItems: "center",
  },
  btn: {
    backgroundColor: Colors.dark,
    padding: 14,
    height: 50,
    borderRadius: 30,
    flexDirection: "row",
    marginHorizontal: "auto",
    alignItems: "center",
  },
});
