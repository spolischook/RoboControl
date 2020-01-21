import nipplejs from 'nipplejs';

var joystickR = nipplejs.create({
    zone: document.getElementById('right'),
    mode: 'static',
    position: { left: '80%', top: '50%' },
    color: 'red',
    size: 200
});

// Get debug elements and map them
var sId = function (sel) { return document.getElementById(sel); };
var elDebug = sId('debug');
var elDump = elDebug.querySelector('.dump');
var els = {
    position: {
        x: elDebug.querySelector('.position .x .data'),
        y: elDebug.querySelector('.position .y .data')
    },
    force: elDebug.querySelector('.force .data'),
    pressure: elDebug.querySelector('.pressure .data'),
    distance: elDebug.querySelector('.distance .data'),
    angle: {
        radian: elDebug.querySelector('.angle .radian .data'),
        degree: elDebug.querySelector('.angle .degree .data')
    },
    direction: {
        x: elDebug.querySelector('.direction .x .data'),
        y: elDebug.querySelector('.direction .y .data'),
        angle: elDebug.querySelector('.direction .angle .data')
    }
};

function debug (obj) {
    function parseObj(sub, el) {
        for (var i in sub) {
            if (typeof sub[i] === 'object' && el) {
                parseObj(sub[i], el[i]);
            } else if (el && el[i]) {
                el[i].innerHTML = sub[i];
            }
        }
    }
    setTimeout(function () {
        parseObj(obj, els);
    }, 0);
}

var nbEvents = 0;
// Dump data
function dump (evt) {
    setTimeout(function () {
        if (elDump.children.length > 4) {
            elDump.removeChild(elDump.firstChild);
        }
        var newEvent = document.createElement('div');
        newEvent.innerHTML = '#' + nbEvents + ' : <span class="data">' +
            evt + '</span>';
        elDump.appendChild(newEvent);
        nbEvents += 1;
    }, 0);
}

joystickR.on('start end', function (evt, data) {
    dump(evt.type);
    debug(data);
}).on('move', function (evt, data) {
    debug(data);
}).on('dir:up plain:up dir:left plain:left dir:down ' +
    'plain:down dir:right plain:right',
    function (evt, data) {
        dump(evt.type);
    }
).on('pressure', function (evt, data) {
    debug({pressure: data});
});
