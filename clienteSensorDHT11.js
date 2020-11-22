// Always use JavaScript strict mode.
"use strict";

// Modules required here

var sensor = require('node-dht-sensor');
var seqNo = 0;
var maxMediciones=100;
setInterval(function () {
sensor.read(11, 4, function(error, temperature, humidity) {
    if (!error) {
        var TLSClient = require('./tls-client.js');
        var c1 = new TLSClient('agent1', 8000);
        c1.on('connect', function (err) {
            console.log('Cliente conectado-sensor conectado');
            seqNo= seqNo+1;
			console.log(seqNo);
				if (seqNo>maxMediciones) {
					process.exit();
				}
                var medicion= {
                    "sensor" :{
						"id":1,
						"tipo":"DHT11"
					},
					"dispositivo":{
						"id":1,
						"tipo":"Raspberry Pi 3B +"
					},
                    "fecha" : new Date(),
                    "medida": {
                        "temperatura": temperature.toFixed(1),
                        "humedad":humidity.toFixed(1)
                    },
                    "alerta" : false,
                    "observaciones" : ""
                };
                console.log("segNo: ", medicion); 
                c1.write (medicion);
            //}, 100);
        });
   
        c1.on('disconnect', function (err) {
            console.log('Cliente desconectado');
        });
   
        /*c1.on('message', function (message) {
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
        });*/
   
        console.log('STARTED');
    }
    else {      
        
        console.error("sin señall sensor l45",error);
        var TLSClient = require('./tls-client.js');
        var c1 = new TLSClient('agent1', 8000);        
        c1.on('connect', function (err) {
        console.log('Cliente conectado -- sensor desconectado');
            seqNo= seqNo+1;
			console.log(seqNo);
			if (seqNo>maxMediciones) {
					process.exit();
			}
            var medicion= {
                "sensor" :{
					"id":1,
					"tipo":"DHT11"
				},
				"dispositivo":{
					"id":1,
					"tipo":"Raspberry Pi 3B+"
				},
                "fecha" : new Date(),
                "medida ": {
                    "temperatura": "sin señal",
                    "humedad": "sin señal"
                },
                "alerta" : true,
                "observaciones" : "Error en la mediciòn por falta de señal en sensor"
            };
            console.log("segNo: ", medicion); 
            c1.write (medicion);
        });
               
        c1.on('disconnect', function (err) {
            console.log('Cliente desconectado');
        });              

            console.log('STARTED');

        }
});
}, 6000); 
