import { Link } from 'react-router-dom';
import { Category } from '../../../data/headerData';
import Overlay from '../Overlay';

type GnbDesktopProps = {
  categories: Category[];
  categoryIndex: number | null;
  setCategoryIndex: React.Dispatch<React.SetStateAction<number | null>>;
};

const GnbDesktop = ({
  categories,
  categoryIndex,
  setCategoryIndex,
}: GnbDesktopProps) => {
  const handleCategoryClick = (index: number) => {
    setCategoryIndex((prev) => (prev === index ? null : index));
  };

  return (
    <>
      {/* 오버레이 */}
      {categoryIndex !== null && (
        <Overlay onClick={() => setCategoryIndex(null)} />
      )}

      <ul className='flex gap-[15px] text-xl'>
        {categories.map((category, index) => (
          <li key={category.label}>
            <button
              onClick={() => handleCategoryClick(index)}
              className={`relative px-[10px] py-[8px] cursor-pointer transition-all duration-300 after:content-[''] after:absolute after:bottom-[5px] after:left-1/2 after:translate-x-[-50%] after:w-[calc(100%-20px)] after:h-[2px] after:transition-colors after:duration-100 ${
                categoryIndex === index
                  ? 'after:bg-black'
                  : 'after:bg-transparent hover:after:bg-white'
              }`}
            >
              {category.label}
            </button>

            <ul
              className={`absolute left-0 top-full w-full bg-white z-[var(--z-dropdown)] overflow-hidden transition-[max-height] duration-700 ease-in-out ${
                categoryIndex === index
                  ? 'max-h-[500px] opacity-100'
                  : 'max-h-0 opacity-0'
              }`}
            >
              <li className='max-w-[1440px] mx-auto px-[40px] py-[30px]'>
                <div className='flex gap-[20px]'>
                  {category.subCategories.map((sub) => (
                    <div key={sub.name} className='w-[180px]'>
                      <Link
                        to={`/category/${category.label.toLowerCase()}/${
                          sub.name
                        }`}
                        onClick={() => setCategoryIndex(null)}
                        className='block text-center'
                      >
                        <img
                          src={sub.image}
                          alt={sub.label}
                          className='w-full h-[180px] object-cover mb-[8px]'
                        />
                        <p className='text-sm'>{sub.label}</p>
                      </Link>
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
};

export default GnbDesktop;
