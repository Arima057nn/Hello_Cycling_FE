import React from "react";
import { Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.secondary,
        tabBarInactiveTintColor: Colors.Gray500,
        tabBarStyle: {
          backgroundColor: Colors.light,
          height: 64,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderColor: Colors.Gray100,
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
          title: "Qrcode",
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="qr-code" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ticket"
        options={{
          title: "Vé",
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
