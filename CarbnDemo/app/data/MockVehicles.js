export const MOCK_VEHICLES = [
  {
    id: 'v1',
    name: 'Tesla Model 3',
    type: 'Electric',
    status: 'available', // available, in-use, charging
    battery: 85,
    location: {
      latitude: -36.8485,
      longitude: 174.7633,
      address: 'Auckland CBD',
    },
    pricePerHour: 12,
    co2Saved: 245, // kg per month
    range: 420, // km
  },
  {
    id: 'v2',
    name: 'Nissan Leaf',
    type: 'Electric',
    status: 'in-use',
    battery: 45,
    location: {
      latitude: -36.8506,
      longitude: 174.7679,
      address: 'Britomart',
    },
    pricePerHour: 10,
    co2Saved: 220,
    range: 270,
  },
  {
    id: 'v3',
    name: 'Toyota Prius',
    type: 'Hybrid',
    status: 'available',
    battery: 100,
    location: {
      latitude: -36.8440,
      longitude: 174.7590,
      address: 'Parnell',
    },
    pricePerHour: 9,
    co2Saved: 180,
    range: 850,
  },
  {
    id: 'v4',
    name: 'Hyundai Kona',
    type: 'Electric',
    status: 'charging',
    battery: 30,
    location: {
      latitude: -36.8520,
      longitude: 174.7720,
      address: 'Wynyard Quarter',
    },
    pricePerHour: 11,
    co2Saved: 230,
    range: 450,
  },
  {
    id: 'v5',
    name: 'Tesla Model Y',
    type: 'Electric',
    status: 'available',
    battery: 92,
    location: {
      latitude: -36.8465,
      longitude: 174.7610,
      address: 'Newmarket',
    },
    pricePerHour: 14,
    co2Saved: 260,
    range: 480,
  },
];

export const getRandomLocationOffset = () => ({
  latitude: (Math.random() - 0.5) * 0.002, 
  longitude: (Math.random() - 0.5) * 0.002,
});

export const getRandomStatus = () => {
  const statuses = ['available', 'in-use', 'charging'];
  return statuses[Math.floor(Math.random() * statuses.length)];
};