import { Product } from '../types';

type ProductFilterOptions = {
  sub_category?: string;
  series?: string;
  volume?: string;
  color?: string;
  excludeId?: string;
};

// 맞는 조건 찾기 (조건이 없거나 같으면 통과)
const matches = <T>(expected: T | undefined, value: T | undefined): boolean => {
  return expected === undefined || expected === value;
};

// 제외 조건 찾기 (제외 조건이 없거나 값이 다르면 통과)
const notMatches = <T>(
  exclude: T | undefined,
  value: T | undefined
): boolean => {
  return exclude === undefined || exclude !== value;
};

export const filterProducts = (
  products: Product[],
  options: ProductFilterOptions
): Product[] => {
  return products.filter((p) => {
    if (!matches(options.sub_category, p.sub_category)) return false;
    if (!matches(options.series, p.series)) return false;
    if (!matches(options.volume, p.attributes.volume)) return false;
    if (!matches(options.color, p.attributes.color)) return false;
    if (!notMatches(options.excludeId, p.id)) return false;

    return true;
  });
};
