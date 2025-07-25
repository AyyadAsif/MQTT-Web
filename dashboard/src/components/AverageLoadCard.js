import React, { useEffect, useState } from 'react';
import "../styles/style.css"

export const AverageLoadCard = () => {
  const [avgLoad, setAvgLoad] = useState(null);

  useEffect(() => {
    const fetchLoad = async () => {
  try {
    const res = await fetch('/api/metrics');    
    const data = await res.json();

    if (typeof data.avgLoad === 'number') {
      setAvgLoad(data.avgLoad);
    } else {
      setAvgLoad(null);
    }
  } catch (err) {
    console.error('Error fetching total load:', err);
    setAvgLoad(null);
  }
};


    fetchLoad();
    const interval = setInterval(fetchLoad, 1000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <>
         <div className={`Card ${avgLoad === null ? 'unavailable' : avgLoad === 0 ? 'disconnected' : 'connected'}`}>
          <img className='AvgIcon' src='../assets/tachometer-average.png' alt="Average" />
          <div className="CardLabel">Units Consumed</div>
          <h2 className='Load'>
          {avgLoad === null ? 'Unavailable' : avgLoad === 0 ? 'Disconnected' : `${avgLoad} kWh`}
          </h2>
        </div>

    </>
  );
};




