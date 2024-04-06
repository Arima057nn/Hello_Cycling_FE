import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme } from "@/components/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Colors from "@/constants/Colors";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LocationProvider } from "@/contexts/locationContext";
import { TripsProvider, useTrips } from "@/contexts/tripsContext";

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
      <TripsProvider>
        <RootLayoutNav />
      </TripsProvider>
    </LocationProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { tripState } = useTrips();
  const onShowTrip = () => {
    router.push("/myTrip");
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
                headerRight: () => (
                  <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-down" size={22} />
                  </TouchableOpacity>
                ),
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
                headerRight: () => (
                  <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="chevron-down" size={22} />
                  </TouchableOpacity>
                ),
                headerStyle: {
                  backgroundColor: Colors.secondary,
                },
                headerTintColor: Colors.dark,
              }}
            />
            <Stack.Screen
              name="login"
              options={{
                headerShown: false,
                headerBackTitle: "Back",
              }}
            />
            <Stack.Screen
              name="register"
              options={{
                headerShown: false,
                headerBackTitle: "Back",
              }}
            />
          </Stack>
          {tripState?.onTrip && (
            <View style={styles.absoluteView}>
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
