import { Link } from 'react-router-dom';
import { Product } from '../../types';

type CategoryTabProps = {
  category: string;
  products: Product[];
  currentSubCategory: string;
};

const CategoryTab = ({
  category,
  products,
  currentSubCategory,
}: CategoryTabProps) => {
  // 카테고리 내 sub_category 리스트 추출
  const subCategories = Array.from(
    new Set(
      products.filter((p) => p.category === category).map((p) => p.sub_category)
    )
  );

  return (
    <div className='sticky top-[74px] flex items-center gap-[20px] pt-[10px] pb-[20px] px-[30px] bg-white z-50'>
      <h2 className='text-[22px] font-medium uppercase'>{category}</h2>

      <div className='flex gap-[10px]'>
        {subCategories.map((sub) => (
          <Link
            key={sub}
            to={`/category/${category}/${sub}`}
            className={`px-[20px] py-[10px] rounded-[30px] text-xs uppercase ${
              sub === currentSubCategory
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
