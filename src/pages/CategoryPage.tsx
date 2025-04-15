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
  const { category } = useParams<{ category: string }>();
  const { addToCart } = useCart();

  const { data: products } = useSuspenseQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
  });

  const filteredProducts =
    products?.filter((product) => product.category === category) || [];

  return (
    <main className='main'>
      <section>
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
            <p>현재 이 카테고리에 등록된 상품이 없습니다.</p>
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
