import * as express from 'express';
import * as https from 'https';
import * as WebSocket from 'ws';
import {AddressInfo} from "net";
import {JoystickOutputData} from 'nipplejs';
import fs = require('fs');

const app = express();
let server: https.Server;

const keyPath = process.env.PRIVATE_KEY || '';
const certPath = process.env.CERT || '';
const privateKey = fs.readFileSync(keyPath, 'utf8');
const certificate = fs.readFileSync(certPath, 'utf8');
const credentials = { key: privateKey, cert: certificate };
server = https.createServer(credentials, app);

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
server.listen(process.env.PORT, () => {
    console.log(`Server started on port ${(server.address() as AddressInfo).port} :)`);
});
