export const PROPERTY_TYPES = [
  { value: "entire-home", label: "Entire home/apt" },
  { value: "private-room", label: "Private room" },
  { value: "shared-room", label: "Shared room" },
];

export const AMENITIES = [
  "WiFi",
  "Kitchen",
  "Washer",
  "Dryer",
  "Air conditioning",
  "Heating",
  "Dedicated workspace",
  "TV",
  "Hair dryer",
  "Iron",
  "Pool",
  "Hot tub",
  "Free parking",
  "Gym",
  "Breakfast",
  "Smoking allowed",
  "Pets allowed",
  "Wheelchair accessible",
  "Elevator",
  "Fireplace",
  "Private entrance",
  "Shampoo",
  "Hangers",
  "Bed linens",
  "Extra pillows and blankets",
  "Laptop friendly workspace",
  "Carbon monoxide alarm",
  "Smoke alarm",
  "First aid kit",
  "Fire extinguisher",
];

export const GUEST_CAPACITY_OPTIONS = [
  { value: 1, label: "1 guest" },
  { value: 2, label: "2 guests" },
  { value: 3, label: "3 guests" },
  { value: 4, label: "4 guests" },
  { value: 5, label: "5 guests" },
  { value: 6, label: "6 guests" },
  { value: 7, label: "7 guests" },
  { value: 8, label: "8+ guests" },
];

export const PRICE_RANGES = [
  { value: [0, 8000], label: "Under ₹8,000" },
  { value: [8000, 16000], label: "₹8,000 - ₹16,000" },
  { value: [16000, 24000], label: "₹16,000 - ₹24,000" },
  { value: [24000, 40000], label: "₹24,000 - ₹40,000" },
  { value: [40000, 80000], label: "₹40,000 - ₹80,000" },
  { value: [80000, 800000], label: "₹80,000+" },
];

export const BOOKING_STATUS_LABELS = {
  pending: "Pending",
  confirmed: "Confirmed",
  cancelled: "Cancelled",
  completed: "Completed",
};

export const CURRENCY_SYMBOL = "₹";
export const PLATFORM_FEE_PERCENTAGE = 0.03; // 3%
export const CLEANING_FEE_DEFAULT = 2000;
