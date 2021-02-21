import * as http from 'http';
import * as WebSocket from 'ws';

let server: http.Server;
server = http.createServer();

const wss = new WebSocket.Server({ server });
type PingPongServer = {
    id: number;
    ping: Date;
    pong: Date;
}

wss.on('connection', (ws: WebSocket) => {
    ws.on('message', (message: string) => {
        let data: PingPongServer;
        try {
            data = JSON.parse(message);
        } catch (e) {
            console.error(e);
            return;
        }

        wss.clients
            .forEach((client: WebSocket) => {
                if (client != ws) {
                    client.send(message);
                }
            });
    });
});

const PORT = 8999;
server.listen(PORT, () => {
    console.log(`Server started on ${PORT} port`);
});
