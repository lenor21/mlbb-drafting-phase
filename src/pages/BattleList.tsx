import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BattleList = () => {
  const [list, setList] = useState<any[]>([]);

  const authkey = '8275ab26d121822bb9e0225c6cb6019a';
  const apiUrl = `https://esportsdata-sg.mobilelegends.com/battlelist/judge?authkey=${authkey}&judgeid=245009984`;

  useEffect(() => {
    const getList = async () => {
      try {
        const res = await axios.get(apiUrl);

        if (res.data && res.data.result) {
          setList(res.data.result);
        } else {
          setList([]);
          console.log('API response did not contain result data.');
        }
      } catch (err) {
        console.error(err);
      }
    };

    getList();
  }, [apiUrl]);

  if (!list || list.length === 0) {
    return <div>No battle IDs found.</div>;
  }

  const battleLinks = list.map((link) => {
    return (
      <Link
        key={link.reporttime}
        to={`/home/${link.battleid}`}
        className='text-blue-500 underline'>
        {link.battleid}-{link.reporttime}
      </Link>
    );
  });

  return (
    <div className='p-4'>
      <h2 className='text-xl font-semibold mb-4'>Available Battles</h2>
      <div className='flex flex-col'>{battleLinks}</div>
    </div>
  );
};

export default BattleList;
