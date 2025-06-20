import heroAamon from '../assets/img/hero/aamon.png';

const HeroPick = (props) => {
  return (
    <div className='border border-[#333] grid grid-rows-6'>
      <img
        src={heroAamon}
        alt='hero'
        className='h-full row-span-5 object-cover'
      />
      <p className='grid place-items-center text-sm bg-[#272727] text-white'>
        {props.name}
      </p>
    </div>
  );
};

export default HeroPick;
