export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  sub_category: string;
  series: string;
  scent_notes: string;
  desc: string;
  attributes: {
    volume?: string;
    color?: string;
  };
  images: {
    thumbnail: string;
    catalog: string[];
  };
}
