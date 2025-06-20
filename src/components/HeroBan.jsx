const HeroBan = (props) => {
  return (
    <div className='border border-[#333]'>
      <img
        src={`../../public/hero-pick/${props.img}`}
        alt={`${props.img}`}
        className='w-full aspect-square object-cover object-top grayscale-100'
      />
    </div>
  );
};

export default HeroBan;
