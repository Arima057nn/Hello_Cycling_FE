import React from "react";
import { Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.secondary,
        tabBarInactiveTintColor: Colors.Gray500,
        tabBarStyle: {
          backgroundColor: Colors.light,
          height: 66,
          borderTopWidth: 4,
          borderColor: Colors.Gray200,
          paddingTop: 4,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: "500",
          marginBottom: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Bản đồ",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="map-marked" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          headerStyle: {
            backgroundColor: Colors.light,
          },
          title: "Trạm xe",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Entypo name="location" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="qrcode"
        options={{
          title: "Quét QR",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <View
              style={{
                padding: 12,
                backgroundColor: Colors.light,
                borderRadius: 50,
                position: "absolute",
                bottom: 0,
                borderWidth: 4,
                borderColor: Colors.Gray200,
              }}
            >
              <Ionicons name="qr-code" size={30} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="ticket"
        options={{
          title: "Mua vé",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="ticket" size={size} color={color} />
          ),
          headerStyle: {
            backgroundColor: Colors.secondary,
          },
          headerTintColor: Colors.lightGrey,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: "Tôi",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="person-circle" size={size} color={color} />
          ),
          headerStyle: {
            backgroundColor: Colors.secondary,
          },
          headerTintColor: Colors.lightGrey,
        }}
      />
    </Tabs>
  );
}
