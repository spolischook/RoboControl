'use strict';

import $ from 'jquery';

const margin = 5;
let socket;
let movingData = {
    x: 0,
    y: 0,
    f: 0
};
function connect() {
    socket = new WebSocket(process.env.WS_SERVER || 'ws://localhost:8999');
    socket.onclose = function(e) {
        setTimeout(function() {
            connect();
        }, 1000);
    };
    socket.addEventListener('message', function (event) {
        // console.log('Message from server ', event.data);
        let data = JSON.parse(event.data);
        let y = Math.sin(toRadians(data.angle.degree));
        let x = Math.cos(toRadians(data.angle.degree));
        movingData = {
            x: x,
            y: y,
            f: data.force
        };
        console.log(`X => ${movingData.x}; Y => ${movingData.y}, F => ${movingData.f}`);
    });
}
connect();


// Setup the canvas element.
var canvas = $('canvas.dots');
var context = canvas[0].getContext('2d');
var canvasWidth = canvas.width();
var canvasHeight = canvas.height();
canvas.attr({height: canvasHeight, width: canvasWidth});

var dot = {
    x: 10,
    y: 10,
    radius: 50
};

drawDot(dot);

function toRadians (angle) {
    return angle * (Math.PI / 180);
}

setTimeout(function(){
    window.requestAnimationFrame(moveDot);
}, 2500);


function moveDot() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);

    dot.x += movingData.x*movingData.f;
    dot.y += -movingData.y*movingData.f;

    // If we hit a boundary in some direction, we reverse the movement in the
    // direction that caused the collision.
    if( (dot.x + dot.radius) >= canvasWidth ) {
        dot.x = margin;
    }
    if( (dot.x - margin) <= 0 ) {
        dot.x = margin;
    }
    if( (dot.y + margin) >= canvasHeight ) {
        dot.y = margin;
    }
    if( (dot.y - margin) <= 0 ) {
        dot.y = margin;
    }

    // Draw the dot in its new position.
    drawDot(dot);

    // Render it again
    window.requestAnimationFrame(moveDot);
}

function drawDot(dot) {
    context.beginPath();
    // context.arc(dot.x, dot.y, dot.radius, 0, 2 * Math.PI, false);
    context.rect(dot.x, dot.y, dot.radius, dot.radius);
    context.fillStyle = '#F03C69';
    context.fill();
}
