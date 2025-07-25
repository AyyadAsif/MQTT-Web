import React, {useEffect} from 'react';
import { GeneratorCard } from './components/GeneratorCard';
import { SolarCard } from './components/SolarCard';
import { WapdaCard } from './components/WapdaCard';
import { TotalLoadCard } from './components/TotalLoadCard';
import { AverageLoadCard } from './components/AverageLoadCard';
import { Footer } from './components/Footer';
import './styles/style.css';

function App() {

 useEffect(() => {
  const cards = document.querySelectorAll('.top-row .Card');
  const wires = document.querySelectorAll('.svg-wires .wire');

  const updateWireStates = () => {
    cards.forEach((card, index) => {
      const wire = wires[index];
      if (!wire) return;

      if (card.classList.contains('disconnected') || card.classList.contains('unavailable') ) {
        wire.classList.add('disconnected');
      } else {
        wire.classList.remove('disconnected');
      }
    });
  };

  // Initial run
  updateWireStates();

  // Watch for class changes on cards
  const observer = new MutationObserver(updateWireStates);

  cards.forEach((card) => {
    observer.observe(card, { attributes: true, attributeFilter: ['class'] });
  });

  return () => observer.disconnect();
}, []);


  return (
    <div className="app-container">
     <div className="top-row">
  <div className="card-wrapper"><GeneratorCard /></div>
  <div className="card-wrapper"><SolarCard /></div>
  <div className="card-wrapper"><WapdaCard /></div>
</div>

<div className="svg-wires">
  <svg width="100%" height="200px" viewBox="0 0 1200 200">
    <path className="wire" d="M200,0 L200,80 Q600,100 600,100" />
    <path className="wire" d="M600,0 L600,80 Q600,100 600,100" />
    <path className="wire" d="M1000,0 L1000,80 Q600,100 600,100" />

    {/* Bottom wires can stay the same for now */}
    <path className="wire" d="M600,100 Q500,140 400,200" />
    <path className="wire" d="M600,100 Q700,140 800,200" />
  </svg>
</div>



      <div className="bottom-row">
        <div className="card-wrapper"><TotalLoadCard /></div>
        <div className="card-wrapper"><AverageLoadCard /></div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
