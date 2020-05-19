'use strict';

import nipplejs from 'nipplejs';
const ELEMENT_ID = 'js-joystick';

let socket;
function connect() {
    const wsUrl = process.env.WS_SERVER || 'ws://localhost:8999';
    socket = new WebSocket(wsUrl);
    socket.onclose = (e) => {
        setTimeout(() => {
            connect();
        }, 1000);
    }
}
connect();

const JoystickManager = nipplejs.create({
    zone: document.getElementById(ELEMENT_ID),
    mode: 'static',
    position: { left: '50%', top: '50%' },
    color: 'red',
    size: 200
});

const stopData = {angle: {degree: 0}, force: 0};
JoystickManager
    .on('end', () => {
        socket.send(JSON.stringify(stopData))})
    .on('move', (evt, data) => {
        socket.send(JSON.stringify(data))});
