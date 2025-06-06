import { Link, useParams } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useState, Suspense } from 'react';
import { useCart } from '../../context/CartContext';
import { Product } from '../../types';
import { Swiper, SwiperSlide } from 'swiper/react';

const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch('/data/products.json');
  if (!response.ok) {
    throw new Error('데이터를 불러오는 데 실패했습니다.');
  }
  return response.json();
};

const ProductContent = () => {
  const { id } = useParams<{ id: string }>();

  const { data: products } = useSuspenseQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
  });

  const product = products?.find((product) => product.id === id);
  const [quantity, _] = useState(1);
  const { addToCart } = useCart();

  if (!product)
    return (
      <p className='text-center py-10 text-gray-500'>
        상품을 찾을 수 없습니다.
      </p>
    );

  // 카테고리 탭
  const related = products.filter(
    (p) =>
      p.sub_category === product.sub_category &&
      p.attributes?.volume === product.attributes?.volume
  );
  const sorted = [product, ...related.filter((p) => p.id !== product.id)];

  const handleAddToCart = () => {
    addToCart({ product, quantity });
  };

  return (
    <main className='w-full'>
      <section className='flex flex-col md:flex-row'>
        <div className='w-full md:w-1/2 space-y-[1px]'>
          <div className='md:hidden'>
            <Swiper slidesPerView={1}>
              {[product.images.thumbnail, ...product.images.catalog].map(
                (img, idx) => (
                  <SwiperSlide key={idx}>
                    <img
                      src={img}
                      alt={product.name}
                      className='w-full object-cover'
                    />
                  </SwiperSlide>
                )
              )}
            </Swiper>
          </div>
          <div className='hidden md:block space-y-[1px]'>
            <img
              src={product.images.thumbnail}
              alt={product.name}
              className='w-full object-cover'
            />
            {product.images.catalog.map((item, idx) => (
              <img
                key={idx}
                src={item}
                alt=''
                className='w-full object-cover'
              />
            ))}
          </div>
        </div>

        <div className='w-full md:w-1/2 px-[8vw]'>
          <div className='sticky top-[120px]'>
            <div>
              <h2 className='text-2xl'>{product.name}</h2>
              <span className='block text-2xl mt-[10px]'>
                &#8361;{product.price.toLocaleString()}
              </span>
              <span className='block mt-[20px]'>{product.scent_notes}</span>
              <p className='text-sm text-gray-600 leading-relaxed mt-[18px]'>
                {product.desc}
              </p>
            </div>
            <div>
              <Swiper
                slidesPerView={5.5}
                spaceBetween={5}
                className='mt-[20px]'
              >
                {sorted.map((item) => (
                  <SwiperSlide key={item.id}>
                    <Link to={`/product/${item.id}`}>
                      <img
                        src={item.images.thumbnail}
                        alt={item.name}
                        className={`w-full object-cover rounded-md border hover:border-black ${
                          item.id === product.id
                            ? 'border-black'
                            : 'border-transparent'
                        }`}
                      />
                      <span className='block text-xs mt-[10px] truncate'>
                        {item.name}
                      </span>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className='mt-[20px] pt-[20px] border-t-1 border-gray-200'>
              <span className='block text-xs '>사이즈</span>
              <div className='flex mt-[10px]'>
                <button className='py-[5px] px-[32px] border-1 rounded-full'>
                  11mL
                </button>
                <button className='ml-[10px] py-[5px] px-[32px] border-1 rounded-full'>
                  20mL
                </button>
              </div>
            </div>

            <button
              className='w-full py-3 bg-black text-white text-lg rounded-md hover:bg-gray-900 transition cursor-pointer mt-[30px]'
              onClick={handleAddToCart}
            >
              쇼핑백에 추가
            </button>

            <div className='flex flex-col mt-[20px]'>
              <button>
                <span>제품 상세 정보</span>
              </button>
              <button>
                <span>제품 상세 정보</span>
              </button>
              <button>
                <span>제품 상세 정보</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const ProductDetail = () => (
  <Suspense fallback={<p>로딩 중...</p>}>
    <ProductContent />
  </Suspense>
);

export default ProductDetail;
