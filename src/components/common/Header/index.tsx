import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import logo from '../../../assets/logo.svg';
import { useCart } from '../../../context/CartContext';
import { gnbCategories } from '../../../data/headerData';
import GnbDesktop from './GnbDesktop';
import GnbMobile from './GnbMobile';
import HeaderIcons from './HeaderIcons';

import { useMediaQuery } from '@react-hook/media-query';

const Header = () => {
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopCategoryOpenIndex, setDesktopCategoryOpenIndex] = useState<
    number | null
  >(null);

  const isDetailPage = location.pathname !== '/';
  const isMobile = useMediaQuery('only screen and (max-width: 1023px)');
  const isWhiteBackground = isDetailPage || desktopCategoryOpenIndex !== null;

  const { openCart } = useCart();

  useEffect(() => {
    if (isMobile) setDesktopCategoryOpenIndex(null);
  }, [isMobile]);

  useEffect(() => {
    setDesktopCategoryOpenIndex(null);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 w-full ${
        isWhiteBackground ? 'bg-white' : 'bg-transparent'
      } z-[var(--z-header)]`}
    >
      <div className='flex justify-between items-center px-[24px] py-[10px]'>
        <h1>
          <Link to='/' className='block py-[10px]'>
            <img src={logo} alt='logo' className='w-[150px] lg:w-[200px]' />
          </Link>
        </h1>

        {/* PC GNB */}
        <nav
          className={`hidden lg:flex ${
            isWhiteBackground ? 'text-black' : 'text-white'
          }`}
        >
          <GnbDesktop
            categories={gnbCategories}
            categoryIndex={desktopCategoryOpenIndex}
            setCategoryIndex={setDesktopCategoryOpenIndex}
          />
        </nav>

        {/* 모바일 GNB */}
        <GnbMobile
          categories={gnbCategories}
          isMobileMenuOpen={mobileMenuOpen}
          onMobileMenuClose={() => setMobileMenuOpen(false)}
        />

        {/* 공통 아이콘 */}
        <div className={`${isWhiteBackground ? 'text-black' : 'text-white'}`}>
          <HeaderIcons
            onCartClick={openCart}
            onMobileMenuOpen={() => setMobileMenuOpen(true)}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
