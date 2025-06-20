import heroMap from '../data/heroMap';

const HeroBan = (props) => {
  const banHero = heroMap.find((h) => h.name === String(props.id));

  console.log(banHero);

  return (
    <div className='border border-[#333]'>
      {banHero ? (
        <img
          src={`../../public/hero-pick/${banHero.img}`}
          alt={`${banHero.name}`}
          className='w-full aspect-square object-cover object-top grayscale-100'
        />
      ) : (
        <img
          src={`../../public/other/ban.png`}
          alt={`${props.id}`}
          className='w-full aspect-square object-cover object-top'
        />
      )}
    </div>
  );
};

export default HeroBan;
