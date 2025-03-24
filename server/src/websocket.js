const WebSocket = require('ws');
const { generateRandomStocks, generateRandomMarketStats } = require('./utils/dataGenerators');

const setupWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('Client connected');

    // Send updates every second
    const intervalId = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        // Send stock updates
        ws.send(JSON.stringify({
          type: 'stocks',
          data: generateRandomStocks()
        }));

        // Send market stats updates
        ws.send(JSON.stringify({
          type: 'market_stats',
          data: generateRandomMarketStats()
        }));
      }
    }, 1000);

    ws.on('close', () => {
      clearInterval(intervalId);
      console.log('Client disconnected');
    });
  });

  return wss;
};

module.exports = setupWebSocket;
