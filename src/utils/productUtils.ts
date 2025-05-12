import { Product } from '../types';

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
  const volumes = Array.from(
    new Set(sameGroup.map((p) => p.attributes!.volume))
  ).sort((a, b) => parseInt(a!) - parseInt(b!));

  return volumes.map((volume) => {
    // 해당 volume인 제품들을 모두 가져옴
    const candidates = sameGroup.filter((p) => p.attributes?.volume === volume);

    // 그 중 현재 product.id가 있으면 그것을 대표로
    const currentMatch = candidates.find((p) => p.id === current.id);
    if (currentMatch) return currentMatch;

    // 없으면 맨 앞에 있는 것 (ex: black → white 순서)
    return candidates[0];
  });
};

export const getRelatedProducts = (
  products: Product[],
  current: Product
): Product[] => {
  const related = products.filter(
    (p) =>
      p.id !== current.id &&
      p.sub_category === current.sub_category &&
      p.attributes?.volume === current.attributes?.volume
  );

  return [current, ...related];
};
