import React, { useEffect, useState } from 'react';
import "../styles/style.css"
import { GaugeDisplay } from './GaugeDisplay';


export const GeneratorCard = ({onStatusChange}) => {
  const [genLoad, setGenLoad] = useState(null);
  const [flipped, setFlipped] = useState(null);

  useEffect(() => {
    const fetchLoad = async () => {
  try {
    const res = await fetch('http://192.168.2.79:3001/api/metrics');
    const data = await res.json();

    if (typeof data.genLoad === 'number') {
      setGenLoad(data.genLoad);
    } else {
      setGenLoad(null);
    }
  } catch (err) {
    console.error('Error fetching generator load:', err);
    setGenLoad(null);
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
       { !flipped && <div onClick={updateCardState} className={`Card ${genLoad === null ? 'unavailable' : genLoad === 0 ? 'disconnected' : 'connected'}`}>
          <img className='GenIcon' src='../assets/generator.png' alt="Generator" />
          <div className="CardLabel">Generator</div>
          <h2 className='Load'>
          {genLoad === null ? 'Unavailable' : genLoad === 0 ? 'Disconnected' : `${genLoad} kWh`}
          </h2>
        </div>
        }
        {genLoad !== null && genLoad !== 0 && flipped && 
            <div onClick={updateCardState} className='FlipCard'>
              <div className='FlipCardContent'>
                <GaugeDisplay value={genLoad} min={1000} max={1600}/>
              </div>
            </div>
          }

          {
            (genLoad === null || genLoad === 0) && flipped &&
            <div onClick={updateCardState} className={`Card disconnected`}>
                <h2 className='Load'>Not Available</h2>
            </div>
          }

    </>
  );
};




