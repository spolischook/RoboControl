'use strict';

import nipplejs from 'nipplejs';

let socket;
function connect() {
    socket = new WebSocket('ws://localhost:8999');
    socket.onclose = function(e) {
        setTimeout(function() {
            connect();
        }, 1000);
    };
}
connect();

const joystickR = nipplejs.create({
    zone: document.getElementById('right'),
    mode: 'static',
    position: { left: '50%', top: '50%' },
    color: 'red',
    size: 200
});

joystickR.on('end', function (evt, data) {
    data.force = 0;
    socket.send(JSON.stringify({angle: {degree: 0}, force: 0}));
    console.log(data);
}).on('start', function (evt, data) {
    // do it
}).on('move', function (evt, data) {
    // socket.send(data);
    socket.send(JSON.stringify(data));
}).on('dir:up plain:up dir:left plain:left dir:down ' +
    'plain:down dir:right plain:right',
    function (evt, data) {
        // do it
    }
).on('pressure', function (evt, data) {
    // do it
});
