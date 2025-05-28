import { useParams, Link } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import { useCart } from '../../context/CartContext';
import { Product } from '../../types';
import { BiShoppingBag } from 'react-icons/bi';
import CategoryTab from '../../components/product/CategoryTab';
import EmptyState from '../../components/common/Empty/EmptyState';
import { CiWavePulse1 } from 'react-icons/ci';
import _ from 'lodash';

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

  // 시리즈 페이지 (프로모션 보타리 페이지)
  const isSeriesPage = category === 'bottari';

  // 해당 카테고리 내 상품만 필터
  const categoryProducts =
    products?.filter((product) =>
      isSeriesPage
        ? product.series === 'bottari'
        : product.category === category
    ) ?? [];

  // 카테고리 내 sub_category 리스트 추출
  const subCategories = _.uniq(categoryProducts.map((p) => p.sub_category));

  // 서브 카테고리 없으면 첫 번째 것을 기본으로
  const currentSubCategory = subCategory ?? subCategories[0] ?? '';

  // 현재 subCategory 기준 필터링
  const filteredProducts = isSeriesPage
    ? categoryProducts
    : categoryProducts.filter(
        (product) => product.sub_category === currentSubCategory
      );

  return (
    <main className='main'>
      <section>
        {/* 탭 영역 */}
        <CategoryTab
          category={category!}
          products={categoryProducts}
          currentSubCategory={currentSubCategory}
          isSeriesPage={isSeriesPage}
        />

        <div>
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
                        <span className='text-xs text-gray-400'>
                          +
                          <span className='text-black'>
                            {
                              filteredProducts.filter(
                                (p) =>
                                  p.attributes?.volume ===
                                    product.attributes?.volume &&
                                  p.sub_category === product.sub_category
                              ).length
                            }
                          </span>
                          가지 향
                        </span>
                      </div>
                    </div>
                  </Link>
                  <button
                    className='absolute top-[15px] right-[15px] p-[6px] bg-gray-800/50 rounded-full flex items-center justify-center border-1 border-white border-solid'
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
            <EmptyState
              message={'현재 등록된 상품이 없습니다.'}
              icon={<CiWavePulse1 size={100} />}
            />
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
