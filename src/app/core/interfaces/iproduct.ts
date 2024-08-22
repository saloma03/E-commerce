export interface Iproduct {
  sold: number;
  images: string[];
  subcategory: Isubcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Icategory;
  brand: Icategory;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface Icategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

interface Isubcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}
