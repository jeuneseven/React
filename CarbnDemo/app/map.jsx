import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { VehicleMarker } from "./components/VehicleMarker";
import { useVehicleStore } from "./store/VehicleStore";

const { width, height } = Dimensions.get("window");

export default function MapPage() {
  const mapRef = useRef(null);
  const vehicles = useVehicleStore((state) => state.vehicles);
  const selectedVehicle = useVehicleStore((state) => state.selectedVehicle);
  const selectVehicle = useVehicleStore((state) => state.selectVehicle);
  const clearSelection = useVehicleStore((state) => state.clearSelection);
  const startRealtimeSimulation = useVehicleStore(
    (state) => state.startRealtimeSimulation
  );
  const stopRealtimeSimulation = useVehicleStore(
    (state) => state.stopRealtimeSimulation
  );
  const isSimulating = useVehicleStore((state) => state.isSimulatingRealtime);

  const [region] = useState({
    latitude: -36.8485,
    longitude: 174.7633,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  useEffect(() => {
    // Start realtime simulation
    startRealtimeSimulation();

    return () => {
      stopRealtimeSimulation();
    };
  }, []);

  useEffect(() => {
    // Animate to selected vehicle location
    if (selectedVehicle && mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: selectedVehicle.location.latitude,
          longitude: selectedVehicle.location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000
      );
    }
  }, [selectedVehicle]);

  const handleMarkerPress = (vehicle) => {
    selectVehicle(vehicle.id);
  };

  const handleMapPress = () => {
    clearSelection();
  };

  const centerOnAllVehicles = () => {
    if (mapRef.current && vehicles.length > 0) {
      const coordinates = vehicles.map((v) => ({
        latitude: v.location.latitude,
        longitude: v.location.longitude,
      }));

      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={region}
          onPress={handleMapPress}
          showsUserLocation={true}
          showsMyLocationButton={false}
          // Force map to load properly
          zoomEnabled={true}
          scrollEnabled={true}
          pitchEnabled={false}
          rotateEnabled={false}
        >
          {vehicles.map((vehicle) => (
            <VehicleMarker
              key={vehicle.id}
              vehicle={vehicle}
              onPress={() => handleMarkerPress(vehicle)}
            />
          ))}
        </MapView>

        {/* Top controls */}
        <View style={styles.topControls}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={centerOnAllVehicles}
          >
            <Text style={styles.controlButtonText}>🎯 View All</Text>
          </TouchableOpacity>

          <View
            style={[
              styles.liveIndicator,
              isSimulating && styles.liveIndicatorActive,
            ]}
          >
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        </View>

        {/* Vehicle detail card */}
        {selectedVehicle && (
          <View style={styles.detailCard}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={clearSelection}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>

            <Text style={styles.detailTitle}>{selectedVehicle.name}</Text>
            <Text style={styles.detailSubtitle}>{selectedVehicle.type}</Text>

            <View style={styles.detailStats}>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>Battery</Text>
                <Text style={styles.statValue}>
                  {Math.round(selectedVehicle.battery)}%
                </Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>Range</Text>
                <Text style={styles.statValue}>{selectedVehicle.range}km</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statLabel}>Status</Text>
                <Text
                  style={[styles.statValue, styles[selectedVehicle.status]]}
                >
                  {selectedVehicle.status}
                </Text>
              </View>
            </View>

            <Text style={styles.detailLocation}>
              📍 {selectedVehicle.location.address}
            </Text>

            {selectedVehicle.status === "available" && (
              <TouchableOpacity style={styles.bookButton}>
                <Text style={styles.bookButtonText}>
                  Book Now - ${selectedVehicle.pricePerHour}/hr
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  topControls: {
    position: "absolute",
    top: 10,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  controlButton: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  controlButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1f2937",
  },
  liveIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  liveIndicatorActive: {
    backgroundColor: "#ef4444",
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
    marginRight: 6,
  },
  liveText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  detailCard: {
    position: "absolute",
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    fontSize: 16,
    color: "#6b7280",
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
  },
  detailSubtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 2,
  },
  detailStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },
  stat: {
    alignItems: "center",
  },
  statLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  available: {
    color: "#10b981",
  },
  "in-use": {
    color: "#f59e0b",
  },
  charging: {
    color: "#3b82f6",
  },
  detailLocation: {
    fontSize: 14,
    color: "#4b5563",
    marginTop: 12,
  },
  bookButton: {
    backgroundColor: "#10b981",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
  },
  bookButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
