import { Link } from 'react-router-dom';
import { Product } from '../../types';

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
  // 카테고리 내 sub_category 리스트 추출
  const subCategories = Array.from(
    new Set(products.map((p) => p.sub_category))
  );

  const tabs = isSeriesPage ? [category] : subCategories;
  const selectedTab = isSeriesPage ? category : currentSubCategory; // 시리즈 페이지일경우, currentSubCategory를 무조건 category로 강제

  return (
    <div className='sticky top-[74px] flex items-center gap-[20px] pt-[10px] pb-[20px] px-[30px] bg-white z-[var(--z-sticky-tab)]'>
      <h2 className='text-[22px] font-medium uppercase'>{category}</h2>

      <div className='flex gap-[10px]'>
        {tabs.map((sub) => (
          <Link
            key={sub}
            to={`/category/${category}/${sub}`}
            className={`px-[20px] py-[10px] rounded-[30px] text-xs uppercase ${
              sub === selectedTab
                ? 'bg-black text-white'
                : 'bg-[#f3f3f3] text-[#555555]'
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
