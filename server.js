
var ws = require('ws').Server;
var wss = new ws ({port: 3000});
var osc = require('node-osc');


var sendCount = 0;
//var oscClient = new osc.Client('192.168.11.4', 5000);
var oscClient = new osc.Client('192.168.11.4', 5000);
var oscServer = new osc.Server(6000);

wss.broadcast = function (data) {
    for (var i in this.clients) {
        this.clients [i].send (data);
    }
};

wss.on ('connection', function (ws) {
    ws.on ('message', function (message) {
        var now = new Date();
        console.log (now.toLocaleString() + ' Received: %s', message+":"+ws._socket.remoteAddress);

        var sendMsg =  new osc.Message('/hako');
        sendMsg.append(message.toString());
        //sendMsg.append("0000000000000");
        oscClient.send(sendMsg);
        
        ws.send("IP :"+ws._socket.remoteAddress);
        wss.broadcast (message);
    });
});


