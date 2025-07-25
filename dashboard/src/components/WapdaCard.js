import React, { useEffect, useState } from 'react';
import { GaugeDisplay } from './GaugeDisplay';

export const WapdaCard = (onStatusChange) => {
  const [wapdaLoad, setWapdaLoad] = useState(null);
  const [flipped, setFlipped] = useState(null);

  useEffect(() => {
    const fetchLoad = async () => {
  try {
    const res = await fetch('/api/metrics');    
    const data = await res.json();

    if (typeof data.wapdaLoad === 'number') {
      setWapdaLoad(data.wapdaLoad);
    } else {
      setWapdaLoad(null);
    }
  } catch (err) {
    console.error('Error fetching wapda load:', err);
    setWapdaLoad(null);
  }
};


    fetchLoad();
    const interval = setInterval(fetchLoad, 1000); 

    return () => clearInterval(interval);
  }, []);



    const updateCardState = ()=>{
    if (flipped){
        setFlipped(false);
    }
    else{
      setFlipped(true);
    }
  }


  return (
    <>
          { !flipped && <div onClick={updateCardState} className={`Card ${wapdaLoad === null ? 'unavailable' : wapdaLoad === 0 ? 'disconnected' : 'connected'}`}>
                          <img className='WapdaIcon' src='../assets/tower.png' alt="WAPDA" />
                          <div className="CardLabel">WAPDA</div>
                          <h2 className='Load'>
                          {wapdaLoad === null ? 'Unavailable' : wapdaLoad === 0 ? 'Disconnected' : `${wapdaLoad} kWh`}
                          </h2>
                        </div>
                }
                        {wapdaLoad !== null && wapdaLoad !== 0 && flipped && 
                            <div onClick={updateCardState} className='FlipCard'>
                              <div className='FlipCardContent'>
                                <GaugeDisplay value={wapdaLoad} min={10000} max={22000}/>
                              </div>
                            </div>
                        }

                        {
            (wapdaLoad === null || wapdaLoad === 0) && flipped &&
            <div onClick={updateCardState} className={`Card disconnected`}>
                <h2 className='Load'>Not Available</h2>
            </div>
          }
    </>
  );
};




