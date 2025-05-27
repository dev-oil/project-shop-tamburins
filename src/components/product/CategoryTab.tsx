import { Link } from 'react-router-dom';
import { Product } from '../../types';
import _ from 'lodash';

type CategoryTabProps = {
  category: string;
  products: Product[];
  currentSubCategory: string;
  isSeriesPage: boolean;
};

const CategoryTab = ({
  category,
  products,
  currentSubCategory,
  isSeriesPage,
}: CategoryTabProps) => {
  const subCategories = _.uniq(products.map((p) => p.sub_category));
  const tabs = isSeriesPage ? [category] : subCategories;
  const selectedTab = isSeriesPage ? category : currentSubCategory;

  return (
    <div className='sticky top-[60px] lg:top-[70px] flex flex-col gap-[10px] lg:flex-row items-baseline lg:items-center lg:gap-[20px] lg:pt-[10px] pb-[20px] px-[15px] lg:px-[30px] bg-white z-[var(--z-sticky-tab)]'>
      <h2 className='text-md lg:text-xl font-medium uppercase'>{category}</h2>

      <div className='flex gap-[8px] overflow-x-auto whitespace-nowrap scrollbar-none'>
        {tabs.map((sub) => (
          <Link
            key={sub}
            to={`/category/${category}/${sub}`}
            className={`shrink-0 py-[6px] px-[16px] lg:py-[10px] lg:px-[20px] rounded-[20px] text-xs uppercase transition-colors duration-200
            ${
              sub === selectedTab
                ? 'bg-black text-white'
                : 'bg-[#f3f3f3] text-[#555]'
            }`}
          >
            {sub}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryTab;
