import HeroPick from '../components/HeroPick';
import HeroBan from '../components/HeroBan';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import heroMap from '../data/heroMap';

const Home = () => {
  const [data, setData] = useState({});

  let dataid = 0;
  const authkey = import.meta.env.VITE_AUTH_KEY; //always use VITE on first name
  const params = useParams();
  const apiUrl = `https://esportsdata-sg.mobilelegends.com/battledata?authkey=${authkey}&battleid=${params.id}&dataid=${dataid}`;

  useEffect(() => {
    const getBattleData = async () => {
      try {
        const res = await axios.get(apiUrl);

        if (
          res.data &&
          res.data.data &&
          Array.isArray(res.data.data.camp_list) &&
          res.data.data.camp_list.length >= 2
        ) {
          setData(res.data);
        } else {
          console.warn(
            'API response did not contain expected battle data structure:',
            res.data
          );
        }
      } catch (err) {
        console.error(err);
      }
    };

    // const intervalId = setInterval(() => {
    //   getBattleData();
    // }, 1000);

    getBattleData();

    // return () => {
    //   clearInterval(intervalId);
    //   console.log('Interval cleared for BattleDataFetcher.');
    // };
  }, [apiUrl]);

  //   console.log('data', data);

  if (
    !data ||
    !data.data ||
    !Array.isArray(data.data.camp_list) ||
    data.data.camp_list.length === 0
  ) {
    return (
      <div className='flex justify-center items-center h-screen text-lg text-gray-600'>
        No battle data found for this ID.
      </div>
    );
  }

  const teamBlue = data.data.camp_list[0];
  let teamBlueArrBan = teamBlue.ban_hero_list;
  let teamBlueArr = [0, 0, 0, 0, 0];

  for (let i = 0; i < 5; i++) {
    if (teamBlueArrBan[i]) {
      teamBlueArr[i] = teamBlueArrBan[i];
    }
  }

  const teamRed = data.data.camp_list[1];
  let teamRedArrBan = teamBlue.ban_hero_list;
  let teamRedArr = [0, 0, 0, 0, 0];

  for (let i = 0; i < 5; i++) {
    if (teamRedArrBan[i]) {
      teamRedArr[i] = teamRedArrBan[i];
    }
  }

  const teamBluePlayers = teamBlue.player_list.map((player) => {
    const hero = heroMap.find((h) => h.name === String(player.heroid));
    return <HeroPick key={hero.name} name={player.name} img={hero.img} />;
  });

  const teamBlueBan = teamBlueArr.map((ban) => {
    return <HeroBan key={ban} id={ban} />;
  });

  const teamRedPlayers = teamRed.player_list.map((player) => {
    const hero = heroMap.find((h) => h.name === String(player.heroid));
    return <HeroPick key={hero.name} name={player.name} img={hero.img} />;
  });

  const teamRedBan = teamRedArr.map((ban) => {
    return <HeroBan key={ban} id={ban} />;
  });

  //   const teamRedBan = teamRed.ban_hero_list.map((ban) => {
  //     const banHero = heroMap.find((h) => h.name === String(ban));
  //     return <HeroBan key={banHero.name} img={banHero.img} />;
  //   });

  return (
    <div className='h-screen'>
      <div className='w-full h-auto bg-red-300 grid grid-cols-7'>
        <div className='col-span-3 grid place-items-center grid-rows-4'>
          <div className='w-full h-full row-span-1 grid grid-cols-3'>
            <div className='grid place-items-center bg-blue-600 text-white'>
              {teamBlue.team_name}
            </div>
            <div className='h-full col-span-2 grid grid-cols-5'>
              {teamBlueBan}
            </div>
          </div>
          <div className='w-full h-full row-span-3 grid grid-cols-5'>
            {teamBluePlayers}
          </div>
        </div>
        <div className='grid place-items-center grid-rows-4'>
          <div className='w-full h-full row-span-1 grid place-items-center'>
            top
          </div>
          <div className='w-full h-full row-span-3 grid place-items-center'>
            mid
          </div>
        </div>
        <div className='col-span-3 grid place-items-center grid-rows-4'>
          <div className='w-full h-full row-span-1 grid grid-cols-3'>
            <div className='h-full col-span-2 grid grid-cols-5'>
              {teamRedBan}
            </div>
            <div className='grid place-items-center bg-red-600 text-white'>
              {teamRed.team_name}
            </div>
          </div>
          <div className='w-full h-full row-span-3 grid grid-cols-5'>
            {teamRedPlayers}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
