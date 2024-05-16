import React from "react";
import { Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.secondary,
        tabBarInactiveTintColor: "#333",
        tabBarStyle: {
          backgroundColor: Colors.light,
          height: 60,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderColor: "#c2c2c2",
        },
        tabBarLabelStyle: {
          fontFamily: "mon-sb",
          fontSize: 12,
          marginBottom: 6,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Map",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="map" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="qrcode"
        options={{
          title: "Qrcode",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="qr-code" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="menu" size={size} color={color} />
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
