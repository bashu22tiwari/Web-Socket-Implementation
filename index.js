import { WebSocketServer } from 'ws';

// Create a WebSocket server on port 3000
const wss = new WebSocketServer({ port: 3000 });

wss.on('connection', (ws) => {
    console.log('Client connected');

    // Listen for messages from the client
    ws.on('message', (message) => {
        console.log('Received:', message);

        // Convert the incoming message to a string
        const request = message.toString();

        // Check for predefined requests and send predefined responses
        switch (request) {
            case 'HELLO':
                ws.send('Hi there! How can I assist you?');
                break;
            case 'GET_TIME':
                ws.send(`The current time is: ${new Date().toLocaleTimeString()}`);
                break;
            case 'GET_DATE':
                ws.send(`Today's date is: ${new Date().toLocaleDateString()}`);
                break;
            case 'GOODBYE':
                ws.send('Goodbye! Have a nice day!');
                break;
            default:
                // Echo the message if it doesn't match any predefined requests
                ws.send(`Echo: ${request}`);
                break;
        }
    });

    // Listen for the close event when the client disconnects
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('WebSocket server running on ws://localhost:3000');
