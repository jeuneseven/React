import { create } from "zustand";
import { MOCK_VEHICLES, getRandomLocationOffset } from "../data/MockVehicles";

export const useVehicleStore = create((set, get) => ({
  vehicles: MOCK_VEHICLES,
  selectedVehicle: null,
  filterType: "all", // 'all', 'Electric', 'Hybrid'
  isSimulatingRealtime: false,

  selectVehicle: (vehicleId) => {
    const vehicle = get().vehicles.find((v) => v.id === vehicleId);
    set({ selectedVehicle: vehicle });
  },

  clearSelection: () => set({ selectedVehicle: null }),

  setFilter: (filterType) => set({ filterType }),

  getFilteredVehicles: () => {
    const { vehicles, filterType } = get();
    if (filterType === "all") return vehicles;
    return vehicles.filter((v) => v.type === filterType);
  },

  startRealtimeSimulation: () => {
    set({ isSimulatingRealtime: true });

    const interval = setInterval(() => {
      const { vehicles, isSimulatingRealtime } = get();

      if (!isSimulatingRealtime) {
        clearInterval(interval);
        return;
      }

      const updatedVehicles = vehicles.map((vehicle) => {
        if (vehicle.status === "in-use") {
          const offset = getRandomLocationOffset();
          return {
            ...vehicle,
            location: {
              ...vehicle.location,
              latitude: vehicle.location.latitude + offset.latitude,
              longitude: vehicle.location.longitude + offset.longitude,
            },
            battery: Math.max(10, vehicle.battery - Math.random() * 2),
          };
        }
        return vehicle;
      });

      set({ vehicles: updatedVehicles });
    }, 3000);
  },

  stopRealtimeSimulation: () => set({ isSimulatingRealtime: false }),
}));
