export type Product = {
  id: number;
  factory_id: number;
  date: string;
  product1: number;
  product2: number;
  product3: number;
};

export type ProductByFactory = {
  id: number;
  factory_id: number;
  date: string;
  value: number;
};

export type FactoryProduct = {
  factory_id: number;
  value: number;
};
