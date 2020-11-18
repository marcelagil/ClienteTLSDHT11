"use strict";

// Modules required here

var sensor = require('node-dht-sensor');
setInterval(function () {
sensor.read(11, 4, function(error, temperature, humidity) {
    if (!error) {

var medicion= {
"sensor" : "sensor",
"fecha" : new Date(),
"medida": {
"temperatura": temperature.toFixed(1),
"humedad":humidity.toFixed(1)
},
"alerta" : false,
"observaciones" : ""
};
        console.log(medicion);
        var signOnMsg = medicion;
        var seqNo = 0;
        var TLSClient = require('./tls-client.js');
        var c1 = new TLSClient('agent1', 8000);
        c1.on('connect', function (err) {
            console.log('Cliente desconectado');
            seqNo = 0;
             //setInterval(function () {
                c1.write (signOnMsg);
            //}, 100);
        });
   
        c1.on('disconnect', function (err) {
            console.log('Cliente desconectado');
        });
   
        c1.on('message', function (message) {
            console.log("Tag = ", message.tag);
            console.log("Date = ", message.date);
            if (message.seqNo !== seqNo) {
                console.log ("Sequence number error, expected: ", seqNo);
                process.exit();
            }
            if ((message.seqNo % 100) === 0) {
                console.log (process.memoryUsage());
            }
            seqNo += 1;
        });
   
        console.log('STARTED');
    }
    else {
       
        console.log("l40");
        medicion= {
            "sensor" : "sensor",
            "fecha" : new Date(),
            "medida ": {
"temperatura": "sin señal",
"humedad": "sin señal"
},
            "alerta" : true,
            "observaciones" : "Error en la mediciòn por falta de señal en sensor"
        };
        console.log(medicion);
        console.error("error l45",error);
                    //module.exports=medicion;
        var signOnMsg = medicion;
        var seqNo = 0;var TLSClient = require('./tls-client.js');
        var c1 = new TLSClient('agent1', 8000);        
        c1.on('connect', function (err) {
        console.log('Cliente desconectado');
        seqNo = 0;
        //setInterval(function () {
            c1.write (signOnMsg);
        //    }, 100);
        });
               
        c1.on('disconnect', function (err) {
            console.log('Cliente desconectado');
        });              
        c1.on('message', function (message) {  
            console.log("Tag = ", message.tag);
            console.log("Date = ", message.date);
            if (message.seqNo !== seqNo) {
                console.log ("Sequence number error, expected: ", seqNo);
                process.exit();
            }
            if ((message.seqNo % 100) === 0) {
                console.log (process.memoryUsage());
            }
            seqNo += 1;
        });
            console.log('STARTED');
                //});
        }
});
}, 1200);
