import React, { useMemo } from 'react';
import GaugeChart from 'react-gauge-chart';

const getStatus = (value, min, max) => {
  if (value > max) return { label: 'Overload', color: '#e74c3c' };
  if (value > min) return { label: 'Warning', color: '#f39c12' };
  return { label: 'Normal', color: '#2ecc71' };
};

export const GaugeDisplay = ({ value, min, max }) => {
  const percent = Math.min(Math.max(value - min, 0) / (max - min), 1);

  const status = useMemo(() => getStatus(value, min, max), [value, min, max]);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '320px',
        padding: '10px',
        paddingLeft:'0px',
        paddingRight:'0px',
        borderRadius: '20px',
        boxShadow: status.label === 'Overload'
          ? '0 0 20px 5px rgba(231, 76, 60, 0.6)'
          : '0 8px 20px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: 'box-shadow 0.5s ease',
      }}
    >
      <GaugeChart
        id="generator-load-gauge"
        nrOfLevels={30}
        arcsLength={[0.6, 0.25, 0.15]}
        colors={['#2ecc71', '#f39c12', '#e74c3c']}
        percent={percent}
        arcPadding={0.03}
        needleColor="#ecf0f1"
        needleBaseColor="#bdc3c7"
        textColor="#000000ff"
        formatTextValue={() => `${value} kWh`}
        style={{
          width: '100%',
          maxWidth: '260px',
        }}
      />

      <div
        style={{
          marginTop: '10px',
          fontSize: '1.1rem',
          fontWeight: '700',
          fontStyle: 'italic',
          fontFamily: 'Inter sans-serif',
          color: status.color,
          textShadow: '5px 0 5px rgba(0,0,0,0.5)',
        }}
      >
        {status.label}
      </div>
    </div>
  );
};
