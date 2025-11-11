import { useRouter } from "expo-router";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { VehicleCard } from "./components/VehicleCard";
import { useVehicleStore } from "./store/VehicleStore";

export default function VehicleListPage() {
  const router = useRouter();
  const vehicles = useVehicleStore((state) => state.vehicles);
  const filterType = useVehicleStore((state) => state.filterType);
  const setFilter = useVehicleStore((state) => state.setFilter);
  const selectVehicle = useVehicleStore((state) => state.selectVehicle);

  const filteredVehicles =
    filterType === "all"
      ? vehicles
      : vehicles.filter((v) => v.type === filterType);

  const availableCount = vehicles.filter(
    (v) => v.status === "available"
  ).length;

  const handleVehiclePress = (vehicle) => {
    selectVehicle(vehicle.id);
    router.push("/map");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Available Vehicles</Text>
        <Text style={styles.subtitle}>
          {availableCount} vehicle{availableCount !== 1 ? "s" : ""} ready to go
        </Text>
      </View>

      <View style={styles.filterContainer}>
        {["all", "Electric", "Hybrid"].map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.filterButton,
              filterType === type && styles.filterButtonActive,
            ]}
            onPress={() => setFilter(type)}
          >
            <Text
              style={[
                styles.filterText,
                filterType === type && styles.filterTextActive,
              ]}
            >
              {type === "all" ? "All" : type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredVehicles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <VehicleCard
            vehicle={item}
            onPress={() => handleVehiclePress(item)}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1f2937",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: "#10b981",
    borderColor: "#10b981",
  },
  filterText: {
    fontSize: 14,
    color: "#6b7280",
    fontWeight: "500",
  },
  filterTextActive: {
    color: "#fff",
  },
  listContent: {
    paddingBottom: 16,
  },
});
