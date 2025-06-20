import heroAamon from '../assets/img/hero/aamon.png';

const HeroBan = () => {
  return (
    <div className='border border-[#333]'>
      <img
        src={heroAamon}
        alt=''
        className='w-full aspect-square object-cover object-top grayscale-100'
      />
    </div>
  );
};

export default HeroBan;
