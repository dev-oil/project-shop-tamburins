import { PiTrashThin } from 'react-icons/pi';
import { IoCloseOutline } from 'react-icons/io5';
import { useCart } from '../../../context/CartContext';
import _ from 'lodash';

type CartModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CartModal = ({ isOpen, onClose }: CartModalProps) => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const totalPrice = _.sumBy(
    cartItems,
    (item) => item.product.price * item.quantity
  );

  return (
    <div className='fixed inset-0 z-[var(--z-cart)] pointer-events-none'>
      {/* 오버레이 */}
      <div
        className={`absolute inset-0 hidden lg:block transition-opacity duration-300 ${
          isOpen
            ? 'bg-black/50 opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* 모달 */}
      <div
        className={`
          absolute right-0 top-0 h-full bg-white shadow-lg overflow-y-auto
          transition-transform duration-300 pointer-events-auto
          w-full lg:w-[480px]
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* 모달 - 헤더 */}
        <div className='flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10'>
          <h2 className='text-xl font-bold'>쇼핑백</h2>
          <button
            onClick={onClose}
            className='text-black text-2xl cursor-pointer'
          >
            <IoCloseOutline size={30} />
          </button>
        </div>

        {/* 모달 - 콘텐츠 */}
        <div className='p-4 flex-1'>
          {cartItems.length === 0 ? (
            <p className='text-gray-500 text-center'>
              쇼핑백에 담긴 제품이 없습니다
            </p>
          ) : (
            <ul className='space-y-4'>
              {cartItems.map((item) => (
                <li key={item.product.id} className='flex justify-between'>
                  <img
                    src={item.product.images.thumbnail}
                    alt={item.product.name}
                    className='w-20 h-24 object-cover rounded-md'
                  />
                  <div className='flex flex-col flex-grow ml-4'>
                    <span className='font-medium'>{item.product.name}</span>
                    <span className='text-gray-600'>
                      ₩{item.product.price.toLocaleString()}
                    </span>
                    <div className='flex items-center mt-2'>
                      <label className='mr-2 text-sm'>수량</label>
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            item.product.id,
                            Number(e.target.value)
                          )
                        }
                        className='border px-2 py-1 rounded-md'
                      >
                        {[...Array(30)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className='ml-4'
                  >
                    <PiTrashThin />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 하단 영역 */}
        <div className='p-4 border-t'>
          <div className='flex justify-between font-medium text-lg pb-2'>
            <span>총 주문금액</span>
            <span>{totalPrice.toLocaleString()}원</span>
          </div>
          <button className='w-full py-2 bg-black text-white rounded-md hover:bg-gray-900'>
            구매하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
