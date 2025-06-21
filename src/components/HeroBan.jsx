import heroMap from '../data/heroMap';
import { useState, useEffect } from 'react';  

const HeroBan = (props) => {
  const [isAnimated, setIsAnimated] = useState(false);

  const banHero = heroMap.find((h) => h.name === String(props.id));

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 50);

    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className='relative border border-[#333] overflow-hidden'>
      {banHero ? (
        <img
          src={`/hero-pick/${banHero.img}`}
          alt={`${banHero.name}`}
          className={`w-full aspect-square object-cover object-top grayscale-100
          ${isAnimated ? 'animate-fade-in-up' : 'opacity-0 transform translate-y-25'}
          transition-all duration-1000 ease-out`}
        />
      ) : (
        <img
          src={`/other/ban.png`}
          alt={`${props.id}`}
          className='w-full aspect-square object-cover object-top bg-[#272727]'
        />
      )}
    </div>
  );
};

export default HeroBan;
