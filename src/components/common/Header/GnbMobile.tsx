import { Link } from 'react-router-dom';
import { Category } from '../../../data/headerData';
import { IoCloseOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { BiMinus } from 'react-icons/bi';
import { useMediaQuery } from '@react-hook/media-query';

type GnbMobileProps = {
  isMobileMenuOpen: boolean;
  onMobileMenuClose: () => void;
  categories: Category[];
};

const GnbMobile = ({
  isMobileMenuOpen,
  onMobileMenuClose,
  categories,
}: GnbMobileProps) => {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    if (isDesktop && isMobileMenuOpen) onMobileMenuClose();
  }, [isDesktop, isMobileMenuOpen, onMobileMenuClose]);

  return (
    <>
      <div
        className={`fixed top-0 right-0 flex flex-col w-full h-full bg-white z-[var(--z-modal)] transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex justify-end p-[16px]'>
          <button
            onClick={onMobileMenuClose}
            aria-label='메뉴 닫기'
            className='cursor-pointer'
          >
            <IoCloseOutline size={30} />
          </button>
        </div>

        <nav className='overflow-y-auto'>
          {categories.map((category, index) => (
            <div key={category.label}>
              <button
                onClick={() => toggleIndex(index)}
                className='flex justify-between w-full px-[20px] py-[15px] text-left text-md cursor-pointer border-t border-gray-100'
              >
                <span>{category.label}</span>
                <span>{openIndex === index ? <BiMinus /> : <BiPlus />}</span>
              </button>

              <ul
                className={`grid grid-cols-2 gap-y-[30px] gap-x-[4px] px-[20px] transition-all duration-300 overflow-hidden box-border ${
                  openIndex === index ? 'max-h-[1000px] pb-[20px]' : 'max-h-0'
                }`}
              >
                {category.subCategories.map((sub) => (
                  <li key={sub.name}>
                    <Link
                      to={`/category/${category.label.toLowerCase()}/${
                        sub.name
                      }`}
                      onClick={onMobileMenuClose}
                      className='block text-gray-800'
                    >
                      <img
                        src={sub.image}
                        alt={sub.label}
                        className='w-full h-auto'
                      />
                      <span className='text-xs mt-[10px]'>{sub.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
};

export default GnbMobile;
