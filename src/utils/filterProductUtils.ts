import { Product } from '../types';

type ProductFilterOptions = {
  sub_category?: string;
  series?: string;
  volume?: string;
  color?: string;
  excludeId?: string;
};

export const filterProducts = (
  products: Product[],
  options: ProductFilterOptions
): Product[] => {
  return products.filter((p) => {
    if (options.sub_category && p.sub_category !== options.sub_category)
      return false;
    if (options.series && p.series !== options.series) return false;
    if (options.volume && p.attributes?.volume !== options.volume) return false;
    if (options.color && p.attributes?.color !== options.color) return false;
    if (options.excludeId && p.id === options.excludeId) return false;

    return true;
  });
};
