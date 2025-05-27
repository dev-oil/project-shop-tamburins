import { FaUser, FaShoppingBag } from 'react-icons/fa';
import { FaSearch } from 'react-icons/fa';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Link } from 'react-router-dom';

type HeaderIconsProps = {
  onCartClick: () => void;
  onMobileMenuOpen: () => void;
};

const HeaderIcons = ({ onCartClick, onMobileMenuOpen }: HeaderIconsProps) => {
  return (
    <div className='flex items-center gap-[10px]'>
      {/* search */}
      <button className='p-[5px]'>
        <FaSearch />
      </button>

      {/* mypage */}
      <Link to='/mypage' className='p-[5px]'>
        <FaUser />
      </Link>

      {/* shopping */}
      <button onClick={onCartClick} className='p-[5px]'>
        <FaShoppingBag />
      </button>

      {/* mobile GNB hamburger */}
      <div className='lg:hidden'>
        <button
          onClick={onMobileMenuOpen}
          aria-label='메뉴 열기'
          className='block text-2xl focus:outline-none'
        >
          <RxHamburgerMenu />
        </button>
      </div>
    </div>
  );
};

export default HeaderIcons;
