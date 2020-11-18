//
// tls-client.js
//
// Example of a Transport Layer Security (or TSL) client
//
// References:
//    http://nodejs.org/api/tls.html
//    http://docs.nodejitsu.com/articles/cryptography/how-to-use-the-tls-module
//

// Always use JavaScript strict mode. 
"use strict";

// Modules required here
var TLSClient = require('./tls-client.js');
<<<<<<< HEAD
var sensor = require('./sensor.js');
=======
var sensorDHT11 = require('./sensor.js');
var sleep = require('sleep');
>>>>>>> promesas


var c1 = new TLSClient('agent1', 8000);


//var c2 = new TLSClient('agent1', 8000);
//var c3 = new TLSClient('agent1', 8000);
//var c4 = new TLSClient('agent1', 8000);
//var c5 = new TLSClient('agent1', 8000);

/*var signOnMsg = {
    //acà van las mediciones 
	"n" : "someone",
        "passwd" : "password",
}*/
<<<<<<< HEAD
var signOnMsg = sensor();

var seqNo = 0;

=======

var signOnMsg = sensorDHT11();
function imprime () {
	console.log(signOnMsg)
};
setTimeout(imprime,6000);
//sleep.sleep(6);
var seqNo = 0;


>>>>>>> promesas
c1.on('connect', function (err) {
    console.log('Client connected.');
    seqNo = 0;
    setInterval(function () {
        c1.write (signOnMsg);
    }, 100);
});

<<<<<<< HEAD
=======

>>>>>>> promesas
c1.on('disconnect', function (err) {
    console.log('Client disconnected');
});

c1.on('message', function (message) {
<<<<<<< HEAD
    console.log("Tag = ", message.tag);
    console.log("Date = ", message.date);
=======
    //console.log("Tag = ", message.tag);
    //console.log("Date = ", message.date);
>>>>>>> promesas

    if (message.seqNo !== seqNo) {
        console.log ("Sequence number error, expected: ", seqNo);
        process.exit();
    }
    if ((message.seqNo % 100) === 0) {
<<<<<<< HEAD
        console.log (process.memoryUsage());
=======
        console.log ("Memoria utilizada " + process.memoryUsage());
>>>>>>> promesas
    }
    seqNo += 1;
});

console.log('STARTED');




