export type FoodItem = {
  id: string;
  name: string;
  source: string;
  type: 'Veg' | 'Non-Veg';
  originalPrice: number;
  discountedPrice: number;
  expiryTime: string; // ISO string
  preparedTime: string; // ISO string
  imageId: string;
  quantity: number;
  rating: number;
  status: 'Available' | 'Sold Out' | 'Limited';
  condition: 'Fresh' | 'Safe for Human Consumption' | 'Only for Animal Feed';
  verified: boolean;
};
