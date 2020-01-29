import * as express from 'express';
import * as http from 'http';
import * as https from 'https';
import * as WebSocket from 'ws';
import {AddressInfo} from "net";
import {JoystickOutputData} from 'nipplejs';
import fs = require('fs');

const app = express();
let server: http.Server | https.Server;

//initialize a simple http server
if (process.env.NODE_ENV === 'production') {
    const privateKey = fs.readFileSync(process.env.PRIVATE_KEY || '', 'utf8');
    const certificate = fs.readFileSync(process.env.CERT || '', 'utf8');
    const credentials = { key: privateKey, cert: certificate };
    server = https.createServer(credentials, app);
} else {
    server = http.createServer(app);
}

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {

    //connection is up, let's add a simple simple event
    ws.on('message', (message: string) => {
        let data: JoystickOutputData;
        try {
            data = JSON.parse(message);
        } catch (e) {
            console.error(e);
            return;
        }

        //log the received message and send it back to the client
        console.log(data.angle.degree+' => '+(data as JoystickOutputData).force);
        // ws.send(message);
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
