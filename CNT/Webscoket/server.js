// Import the WebSocket library
const WebSocket = require('ws');

// Create a WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

// Event listener for new client connections
wss.on('connection', (ws) => {
  console.log('New client connected');

  // Event listener for messages received from a client
  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    
    // Send a response back to the client
    ws.send('Message received on server');
  });

  // Event listener for client disconnections
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is listening on ws://localhost:8080');
