const HeroPick = (props) => {
  return (
    <div className='border border-[#333] grid grid-rows-6'>
      <img
        src={`../../public/hero-pick/${props.img}`}
        alt={props.img}
        className='h-full row-span-5 object-cover'
      />
      <p className='grid place-items-center text-[12px] bg-[#272727] text-white text-center'>
        {props.name}
      </p>
    </div>
  );
};

export default HeroPick;
