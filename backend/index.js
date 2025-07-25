const mqtt = require('mqtt');
const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

app.use(cors());

// ✅ CLOUD MQTT SETUP (EMQX TLS)

const client = mqtt.connect('mqtts://q2a72a98.ala.asia-southeast1.emqxsl.com:8883', {
  ca: fs.readFileSync(path.join(__dirname, './certs/emqxsl-ca.crt')),
  rejectUnauthorized: true,
  username: 'ayyad',
  password: 'Ayyad2003',
});

client.on('connect', () => {
  console.log('✅ Connected to EMQX broker');
  client.subscribe('iot-2/type/cMT-FHDX-820/id/hostname/evt/metrics/fmt/json', { qos: 1 }, (err) => {
    if (err) {
      console.error('❌ Subscription error:', err);
    } else {
      console.log('📡 Subscribed to topics (iot-2/type/cMT-FHDX-820/id/hostname/evt/metrics/fmt/json)');
    }
  });
});
// iot-2/type/cMT-FHDX-820/id/hostname/evt/metrics/fmt/json
let latestMetricData = {
  genLoad: null,
  solarLoad: null,
  wapdaLoad: null,
  totalLoad: null,
  avgLoad: null,
  timestamp: null
};

client.on('message', (topic, message) => {
  try {
    const payload = JSON.parse(message.toString());

    const genLoad = payload?.d?.genLoad?.[0];
    const solarLoad = payload?.d?.solarLoad?.[0];
    const wapdaLoad = payload?.d?.wapdaLoad?.[0];
    const totalLoad = payload?.d?.totalLoad?.[0];
    const avgLoad = payload?.d?.avgLoad?.[0];
    const timestamp = payload?.ts;

    latestMetricData = { genLoad, solarLoad, wapdaLoad, totalLoad, avgLoad, timestamp };

    console.log(`Gen: ${genLoad}kW \n Solar: ${solarLoad}kW \n WAPDA: ${wapdaLoad} \n Total: ${totalLoad} \n Avg: ${avgLoad} 🕒 Time: ${timestamp}`);
  } catch (err) {
    console.error('❌ MQTT JSON Parse Error:', err);
  }
});

// ✅ API endpoint
app.get('/api/metrics', (req, res) => {
  res.json(latestMetricData);
});

// ✅ Start backend server + React dashboard
app.listen(PORT, () => {
  console.log(`🚀 Backend API running at http://localhost:${PORT}`);

  const reactBuildPath = path.join(__dirname, '../dashboard/build');
  app.use(express.static(reactBuildPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(reactBuildPath, 'index.html'));
  });
});

