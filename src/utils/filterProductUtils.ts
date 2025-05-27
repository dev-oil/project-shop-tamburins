import { Product } from '../types';

// pipe 적용해보기
// 타입들
export type VolumeFilter = { volume: string };
export type SeriesFilter = { series: string };
export type SubCategoryFilter = { sub_category: string };
export type ColorFilter = { color: string };
export type ExcludeIdFilter = { excludeId: string };

// 필터 함수 타입
export type ProductFilterFn = (products: Product[]) => Product[];

// 필터 함수들
export const filterByVolume = ({ volume }: VolumeFilter): ProductFilterFn => {
  return (products) => products.filter((p) => p.attributes.volume === volume);
};

export const filterBySeries = ({ series }: SeriesFilter): ProductFilterFn => {
  return (products) => products.filter((p) => p.series === series);
};

export const filterBySubCategory = ({
  sub_category,
}: SubCategoryFilter): ProductFilterFn => {
  return (products) => products.filter((p) => p.sub_category === sub_category);
};

export const filterByColor = ({ color }: ColorFilter): ProductFilterFn => {
  return (products) => products.filter((p) => p.attributes.color === color);
};

export const filterExcludeId = ({
  excludeId,
}: ExcludeIdFilter): ProductFilterFn => {
  return (products) => products.filter((p) => p.id !== excludeId);
};

// pipe 함수
export const pipeFilters =
  (...filters: ProductFilterFn[]) =>
  (products: Product[]): Product[] =>
    filters.reduce((acc, fn) => fn(acc), products);
