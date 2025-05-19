import { Product } from '../types';
import _ from 'lodash';

// 같은 시리즈 + 같은 sub_category 기준으로 volume(용량)별로 묶어서 고유한 버전만 리턴.
export const getUniqueVolumeVariants = (
  products: Product[],
  current: Product
): Product[] => {
  const sameGroup = products.filter(
    (p) =>
      p.sub_category === current.sub_category &&
      p.series === current.series &&
      p.attributes?.volume
  );

  // 볼륨 단위로 그룹화
  const volumes = _.uniq(sameGroup.map((p) => p.attributes!.volume)).sort(
    (a, b) => parseInt(a!) - parseInt(b!)
  );

  return volumes.map((volume) => {
    // 해당 volume인 제품들을 모두 가져옴
    const candidates = sameGroup.filter((p) => p.attributes?.volume === volume);

    // 그 중 현재 product.id가 있으면 그것을 대표로
    const currentMatch = candidates.find((p) => p.id === current.id);
    if (currentMatch) return currentMatch;

    // 없으면 맨 앞에 있는 것
    return candidates[0];
  });
};

// 같은 시리즈 + 같은 sub_category + 같은 용량 기준으로 color(색깔)별로 고유한 제품 리스트 리턴.
export const getUniqueColorVariants = (
  products: Product[],
  current: Product
): Product[] => {
  const sameVolume = products.filter(
    (p) =>
      p.sub_category === current.sub_category &&
      p.series === current.series &&
      p.attributes?.volume === current.attributes?.volume &&
      p.attributes?.color
  );

  // color 속성 기준으로 고유 컬러 목록 생성 (중복 제거)
  const colors = _.uniq(sameVolume.map((p) => p.attributes?.color));

  // 각 color별 대표 상품 반환
  return colors.map((color) => {
    // 현재 color인 제품들을 모두 가져옴
    const candidates = sameVolume.filter((p) => p.attributes?.color === color);

    // 그 중 현재 product.id가 있으면 그것을 대표로
    const currentMatch = candidates.find((p) => p.id === current.id);
    if (currentMatch) return currentMatch;

    // 없으면 맨 앞에 있는 것
    return candidates[0];
  });
};

// 현재 제품을 제외한 -> 같은 sub_category, 같은 volume 기준 -> 관련 상품 리스트 리턴.
export const getRelatedProducts = (
  products: Product[],
  current: Product
): Product[] => {
  // 현재 제품을 제외하고 같은 sub_category, 같은 volume인 제품들만 필터링
  const related = products.filter(
    (p) =>
      p.id !== current.id &&
      p.sub_category === current.sub_category &&
      p.attributes?.volume === current.attributes?.volume
  );

  // current 제품을 맨 앞에 두고 나머지 관련 제품 리스트를 뒤에 붙임
  return [current, ...related];
};
