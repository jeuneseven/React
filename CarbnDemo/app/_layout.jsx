import { Tabs } from "expo-router";
import { Text } from "react-native";

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#10b981",
        tabBarInactiveTintColor: "#6b7280",
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: "#ffffff",
        },
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Vehicles",
          tabBarIcon: ({ focused }) => <Text style={{ fontSize: 24 }}>🚗</Text>,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Map",
          tabBarIcon: ({ focused }) => <Text style={{ fontSize: 24 }}>🗺️</Text>,
        }}
      />
      {/* Hide components and other folders from tabs */}
      <Tabs.Screen
        name="components"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="data"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="store"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
