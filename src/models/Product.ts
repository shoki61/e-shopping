export interface Product {
  _id: string;

  name: string;

  description: string;

  price: number;

  colors: string[];

  mainCategory: string;

  category: string;

  subCategory: string;

  rating: number;

  ratingCount: number;

  seller: string;
}
