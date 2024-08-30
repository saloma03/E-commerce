import { Iproduct } from "./iproduct";

export interface ICart {
  _id: string;
  cartOwner: string;
  products: ProductQuantity[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

interface ProductQuantity {
  count: number;
  _id: string;
  product: Iproduct;
  price: number;
}
