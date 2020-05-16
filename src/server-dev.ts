import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import {AddressInfo} from "net";
import {JoystickOutputData} from 'nipplejs';

const app = express();
let server: http.Server;

server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {
    ws.on('message', (message: string) => {
        let data: JoystickOutputData;
        try {
            data = JSON.parse(message);
            console.log(data.angle.degree+' => '+data.force);
        } catch (e) {
            console.error(e);
        }

        wss.clients
            .forEach(client => {
                if (client != ws) {
                    client.send(message);
                }
            });
    });
});

//start our server
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${(server.address() as AddressInfo).port} :)`);
});
