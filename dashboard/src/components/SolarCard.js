import React, { useEffect, useState } from 'react';
import { GaugeDisplay } from './GaugeDisplay';

export const SolarCard = (onStatusChange) => {
  const [solarLoad, setSolarLoad] = useState(null);
  const [flipped, setFlipped] = useState(null);
  

  useEffect(() => {
    const fetchLoad = async () => {
  try {
    const res = await fetch('/api/metrics');    
    const data = await res.json();

    if (typeof data.solarLoad === 'number') {
      setSolarLoad(data.solarLoad);
    } else {
      setSolarLoad(null);
    }
  } catch (err) {
    console.error('Error fetching solar load:', err);
    setSolarLoad(null);
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
         { !flipped && <div onClick={updateCardState} className={`Card ${solarLoad === null ? 'unavailable' : solarLoad === 0 ? 'disconnected' : 'connected'}`}>
                  <img className='SolarIcon' src='../assets/solar-panel.png' alt="Solar" />
                  <div className="CardLabel">Solar</div>
                  <h2 className='Load'>
                  {solarLoad === null ? 'Unavailable' : solarLoad === 0 ? 'Disconnected' : `${solarLoad} kWh`}
                  </h2>
                </div>
        }
                {solarLoad !== null && solarLoad !== 0 && flipped && 
                    <div onClick={updateCardState} className='FlipCard'>
                      <div className='FlipCardContent'>
                        <GaugeDisplay value={solarLoad} min={8000} max={9600}/>
                      </div>
                    </div>
                }

                {
            (solarLoad === null || solarLoad === 0) && flipped &&
            <div onClick={updateCardState} className={`Card disconnected`}>
                <h2 className='Load'>Not Available</h2>
            </div>
          }
    </>
  );
};




