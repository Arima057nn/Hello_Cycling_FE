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
import { BOOKING_STATUS } from "@/constants/Status";

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
  const { tripState, onStartTrip } = useTrips();
  const currentPath = usePathname();

  const onShowTrip = () => {
    if (currentPath !== "/myTrip") {
      if (tripState?.status === BOOKING_STATUS.ACTIVE)
        router.navigate("/myTrip");
    }
    if (currentPath !== "/myKeeping") {
      if (tripState?.status === BOOKING_STATUS.KEEPING)
        router.navigate("/myKeeping");
    }
  };

  useEffect(() => {
    findTrip();
  }, []);
  const findTrip = async () => {
    const res = await bookingApi.findTrip();
    if (res?.status === 200) {
      if (onStartTrip) {
        onStartTrip(
          res.data._id,
          res.data.cyclingId,
          res.data.startStation,
          res.data.status
        );
      }
    }
  };
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="search"
              options={{
                headerShown: false,
                headerBackTitle: "Back",
                headerStyle: {
                  backgroundColor: Colors.light,
                },
                headerTitle: "Search",
              }}
            />
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
              name="myTrip"
              options={{
                presentation: "modal",
                headerShown: true,
                title: "My Trip",
                headerBackTitle: "Back",

                headerStyle: {
                  backgroundColor: Colors.secondary,
                },
                headerTintColor: Colors.dark,
              }}
            />
            <Stack.Screen
              name="myKeeping"
              options={{
                presentation: "modal",
                headerShown: true,
                title: "My keeping",
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
              name="ticket"
              options={{
                headerShown: true,
                title: "Ticket",
                headerBackTitle: "Back",
                headerStyle: {
                  backgroundColor: Colors.secondary,
                },
                headerTintColor: Colors.dark,
              }}
            />
            <Stack.Screen
              name="myTicket"
              options={{
                headerShown: true,
                title: "My Ticket",
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
                title: "History",
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
                title: "Transaction",
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
          </Stack>
          {!currentPath.includes("/myTrip") &&
            !currentPath.includes("/myKeeping") &&
            tripState?.onTrip && (
              <View style={styles.absoluteView}>
                {tripState?.status === BOOKING_STATUS.ACTIVE ? (
                  <TouchableOpacity
                    style={styles.btn}
                    activeOpacity={0.6}
                    onPress={() => {
                      onShowTrip();
                    }}
                  >
                    <Text style={{ fontFamily: "mon-sb", color: "#fff" }}>
                      My Trip
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={styles.btn}
                    activeOpacity={0.6}
                    onPress={() => {
                      onShowTrip();
                    }}
                  >
                    <Text style={{ fontFamily: "mon-sb", color: "#fff" }}>
                      My Keeping
                    </Text>
                  </TouchableOpacity>
                )}
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
