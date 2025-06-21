import HeroPick from '../components/HeroPick';
import HeroBan from '../components/HeroBan';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import heroMap from '../data/heroMap';

const Home = () => {
  const [data, setData] = useState({});
  const [side, setSide] = useState(false);

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

    const intervalId = setInterval(() => {
      getBattleData();
    }, 1000);

    getBattleData();

    return () => {
      clearInterval(intervalId);
      console.log('Interval cleared for BattleDataFetcher.');
    };
  }, [apiUrl]);

    console.log('data', data);

  if (
    !data ||
    !data.data ||
    !Array.isArray(data.data.camp_list) ||
    data.data.camp_list.length < 2
  ) {
    return (
      <div className='flex justify-center items-center h-screen text-lg text-gray-600'>
        No battle data found for this ID.
      </div>
    );
  }
  

  const teamBlue = data.data.camp_list[0];
  const teamRed = data.data.camp_list[1];

  const teamBlueArrBan = Array.isArray(teamBlue.ban_hero_list) ? teamBlue.ban_hero_list : [];
  const teamRedArrBan = Array.isArray(teamRed.ban_hero_list) ? teamRed.ban_hero_list : [];

  


  let teamBlueArr = [-1, -2, -3, -4, -5];
  for (let i = 0; i < 5; i++) {
    if (teamBlueArrBan[i]) {
      teamBlueArr[i] = teamBlueArrBan[i];
    }
  }
 
 
  let teamRedArr = [-6, -7, -8, -9, -10];
  for (let i = 0; i < 5; i++) {
    if (teamRedArrBan[i]) {
      teamRedArr[i] = teamRedArrBan[i];
    }
  }

  // console.log(teamBlueArrBan)
  // console.log(teamRedArrBan)

  const teamBluePlayers = teamBlue.player_list.map((player) => {
    const hero = heroMap.find((h) => h.name === String(player.heroid));
    return <HeroPick key={hero?.name} name={player.name} img={hero?.img} picking={player.picking} />;
  });

  const teamBlueBan = teamBlueArr.map((ban) => {
    return <HeroBan key={ban} id={ban} />;
  });

  const teamRedPlayers = teamRed.player_list.map((player) => {
    const hero = heroMap.find((h) => h.name === String(player.heroid));
    return <HeroPick key={hero?.name} name={player.name} img={hero?.img} picking={player.picking} />;
  }).reverse();

  const teamRedBan = teamRedArr.map((ban) => {
    return <HeroBan key={ban} id={ban} />;
  }).reverse();

  

  const handleClick = () => {
    setSide(!side)
  }

 

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
          <div className='w-full h-full row-span-3 grid justify-center font-bold text-[50px] italic'>
           {data.data.state_left_time}
          </div>
          <p>
            {/* {side ? (<img src="/other/Left.gif" alt="" />) : (<img src="/other/Right.gif" alt="" />)} */}
            
          </p>
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

      <button onClick={handleClick}>click me</button>
      <p>{side ? 'true' : 'false'}</p>
    </div>
  );
};

export default Home;
