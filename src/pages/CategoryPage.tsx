import { useParams, Link } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { BiShoppingBag } from 'react-icons/bi';

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch('/data/products.json');
  if (!response.ok) {
    throw new Error('데이터를 불러오는 데 실패했습니다.');
  }
  return response.json();
};

const ProductList = () => {
  const { category, subCategory } = useParams<{
    category: string;
    subCategory?: string;
  }>();
  const { addToCart } = useCart();

  const { data: products } = useSuspenseQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
  });

  // 해당 카테고리 내 상품만 필터
  const categoryProducts =
    products?.filter((product) => product.category === category) || [];

  // 카테고리 내 sub_category 리스트 추출
  const subCategories = Array.from(
    new Set(categoryProducts.map((p) => p.sub_category))
  );

  // 서브 카테고리 없으면 첫 번째 것을 기본으로
  const currentSubCategory = subCategory || subCategories[0] || '';

  // 현재 subCategory 기준 필터링
  const filteredProducts = categoryProducts.filter(
    (product) => product.sub_category === currentSubCategory
  );

  return (
    <main className='main'>
      <section>
        {/* 탭 영역 */}
        <div className='sticky top-[74px] flex items-center gap-[20px] pt-[10px] pb-[20px] px-[30px] bg-white z-50'>
          {/* 카테고리 이름 */}
          <h2 className='text-[22px] font-medium uppercase'>{category}</h2>

          {/* sub_category 탭 버튼 */}
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

        <div>
          <h2 className='sr-only'>
            {category?.replace('-', ' ').toUpperCase()}
          </h2>

          {filteredProducts.length > 0 ? (
            <ul className='grid grid-cols-2 lg:grid-cols-3 gap-x-[1px] gap-y-[10px]'>
              {filteredProducts.map((product) => (
                <li key={product.id} className='relative'>
                  <Link to={`/product/${product.id}`}>
                    <img src={product.images.thumbnail} alt={product.name} />
                    <div className='p-[10px]'>
                      <h3>{product.name}</h3>
                      <span className='block mt-[10px] text-xs text-gray-400'>
                        {product.scent_notes}
                      </span>
                      <div className='flex justify-between mt-[10px] items-center'>
                        <strong className='font-normal'>
                          &#8361;{product.price.toLocaleString()}
                        </strong>
                      </div>
                    </div>
                  </Link>
                  <button
                    className='absolute top-[15px] right-[15px] p-[6px] bg-gray-800/50 rounded-full flex items-center justify-center border-1 border-white border-solid cursor-pointer'
                    onClick={() =>
                      addToCart({
                        product,
                        quantity: 1,
                      })
                    }
                  >
                    <BiShoppingBag size={20} className='text-white' />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>현재 이 sub_category에 등록된 상품이 없습니다.</p>
          )}
        </div>
      </section>
    </main>
  );
};

const CategoryPage = () => (
  <Suspense fallback={<p>로딩 중...</p>}>
    <ProductList />
  </Suspense>
);

export default CategoryPage;
