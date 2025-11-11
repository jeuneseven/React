import { StyleSheet, Text, View } from "react-native";
import { Marker } from "react-native-maps";

const MARKER_COLORS = {
  available: "#10b981",
  "in-use": "#f59e0b",
  charging: "#3b82f6",
};

export const VehicleMarker = ({ vehicle, onPress }) => {
  return (
    <Marker
      coordinate={{
        latitude: vehicle.location.latitude,
        longitude: vehicle.location.longitude,
      }}
      onPress={onPress}
    >
      <View style={styles.markerContainer}>
        <View
          style={[
            styles.marker,
            { backgroundColor: MARKER_COLORS[vehicle.status] },
          ]}
        >
          <Text style={styles.markerText}>🚗</Text>
        </View>
        {vehicle.status === "available" && <View style={styles.pulse} />}
      </View>
    </Marker>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  markerText: {
    fontSize: 18,
  },
  pulse: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#10b981",
    opacity: 0.2,
  },
});
