import React, { useEffect, useState } from 'react';
import "../styles/style.css"

export const TotalLoadCard = () => {
  const [totalLoad, setTotalLoad] = useState(null);

  useEffect(() => {
    const fetchLoad = async () => {
  try {
    const res = await fetch('/api/metrics');    
    const data = await res.json();

    if (typeof data.totalLoad === 'number') {
      setTotalLoad(data.totalLoad);
    } else {
      setTotalLoad(null);
    }
  } catch (err) {
    console.error('Error fetching total load:', err);
    setTotalLoad(null);
  }
};


    fetchLoad();
    const interval = setInterval(fetchLoad, 1000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <>
        <div className={`Card ${totalLoad === null ? 'unavailable' : totalLoad === 0 ? 'disconnected' : 'connected'}`}>
          <img className='TotalIcon' src='../assets/renewable-energy.png' alt="Total" />
          <div className="CardLabel">Total Load</div>
          <h2 className='Load'>
          {totalLoad === null ? 'Unavailable' : totalLoad === 0 ? 'Disconnected' : `${totalLoad} kWh`}
          </h2>
        </div>

    </>
  );
};




