const HeroPick = (props) => {
  console.log(props.picking);

  return (
    <div className='border border-[#333] grid grid-rows-6'>
      {props.img ? (
        <img
          src={`/hero-pick/${props.img}`}
          alt={props.img}
          className='h-full row-span-5 object-cover'
        />
      ) : (
        <img
          src={`/other/Pickbg.jpg`}
          alt={props.img}
          className={`h-full row-span-5 object-cover ${props.picking ? 'animate-pulse' : ''}`}
        />
      )}

      <p className='grid place-items-center text-[12px] bg-[#272727] text-white text-center'>
        {props.name}
      </p>
    </div>
  );
};

export default HeroPick;
