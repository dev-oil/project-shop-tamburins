import { Product } from '../types';

// 타입들
export type VolumeCondition = { volume: string };
export type SeriesCondition = { series: string };
export type SubCategoryCondition = { sub_category: string };
export type ColorCondition = { color: string };
export type ExcludeIdCondition = { excludeId: string };

// 조건 함수 타입
export type ProductConditionFn = (products: Product) => boolean;

export const volumeCondition = ({
  volume,
}: VolumeCondition): ProductConditionFn => {
  return (p) => p.attributes.volume === volume;
};

export const seriesCondition = ({
  series,
}: SeriesCondition): ProductConditionFn => {
  return (p) => p.series === series;
};

export const subCategoryCondition = ({
  sub_category,
}: SubCategoryCondition): ProductConditionFn => {
  return (p) => p.sub_category === sub_category;
};

export const colorCondition = ({
  color,
}: ColorCondition): ProductConditionFn => {
  return (p) => p.attributes.color === color;
};

export const excludeCondition = ({
  excludeId,
}: ExcludeIdCondition): ProductConditionFn => {
  return (p) => p.id !== excludeId;
};

export type Condition<T> = (x: T) => boolean;

export function satisfyEvery<T>(condition: Condition<T>[]): Condition<T> {
  return (x) => condition.every((c) => c(x));
}

export function satisfySome<T>(condition: Condition<T>[]): Condition<T> {
  return (x) => condition.some((c) => c(x));
}

// export const allCondition = (p: Product) =>
//   [
//     volumeCondition({} as any),
//     seriesCondition({} as any),
//     subCategoryCondition({} as any),
//     colorCondition({} as any),
//     excludeCondition({} as any),
//   ].every((f) => f(p));

// export const someCondition = (p: Product) =>
//   [
//     volumeCondition({} as any),
//     seriesCondition({} as any),
//     subCategoryCondition({} as any),
//     colorCondition({} as any),
//     excludeCondition({} as any),
//   ].some((f) => f(p));
