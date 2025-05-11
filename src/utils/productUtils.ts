import { Product } from '../types';
import _ from 'lodash';

export const getUniqueVolumeVariants = (
  products: Product[],
  current: Product
): Product[] => {
  const filtered = products.filter(
    (p) =>
      p.sub_category === current.sub_category &&
      p.series === current.series &&
      p.attributes?.volume
  );

  const sorted = _.sortBy(filtered, (p) => {
    const volume = p.attributes?.volume || '0';
    return parseInt(volume);
  });

  const grouped = _.groupBy(sorted, (p) => p.attributes!.volume);

  const prioritized = Object.values(grouped).map((group) => {
    return group.find((item) => item.attributes?.color === 'black') || group[0];
  });

  return prioritized;
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
