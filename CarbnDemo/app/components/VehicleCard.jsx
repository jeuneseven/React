import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const STATUS_COLORS = {
  available: "#10b981",
  "in-use": "#f59e0b",
  charging: "#3b82f6",
};

const STATUS_TEXT = {
  available: "Available",
  "in-use": "In Use",
  charging: "Charging",
};

export const VehicleCard = ({ vehicle, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View>
          <Text style={styles.name}>{vehicle.name}</Text>
          <Text style={styles.type}>{vehicle.type}</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: STATUS_COLORS[vehicle.status] },
          ]}
        >
          <Text style={styles.statusText}>{STATUS_TEXT[vehicle.status]}</Text>
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Battery</Text>
          <Text style={styles.detailValue}>{Math.round(vehicle.battery)}%</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Range</Text>
          <Text style={styles.detailValue}>{vehicle.range}km</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Price</Text>
          <Text style={styles.detailValue}>${vehicle.pricePerHour}/hr</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.location}>📍 {vehicle.location.address}</Text>
        <Text style={styles.co2}>🌱 {vehicle.co2Saved}kg CO₂ saved/month</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1f2937",
  },
  type: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },
  detailItem: {
    alignItems: "center",
  },
  detailLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1f2937",
  },
  footer: {
    marginTop: 12,
  },
  location: {
    fontSize: 14,
    color: "#4b5563",
    marginBottom: 4,
  },
  co2: {
    fontSize: 13,
    color: "#10b981",
    fontWeight: "500",
  },
});
