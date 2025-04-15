import { Link } from 'react-router-dom';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

const Home = () => {
  return (
    <main>
      <section className='flex h-[100vh]'>
        <div className='flex-1'>
          <Link to='category/bottari' className='relative'>
            <img
              src='/images/visual/pc_main_banner_full_bottari.jpg'
              alt='bottari 이미지'
              className='w-full h-full object-cover'
            />
            <div className='absolute bottom-0 w-[100%] flex items-center px-[20px] py-[15px]'>
              <span className='text-white text-xl font-medium uppercase'>
                bottari
              </span>
              <HiOutlineArrowNarrowRight
                size={20}
                className='ml-[5px] text-white'
              />
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
