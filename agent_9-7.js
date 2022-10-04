var ieee754 = require('ieee754');
var mqtt = require('mqtt');
const {SerialPort} = require('serialport');
var CronJob = require('cron').CronJob;
var ModbusRTU = require("modbus-serial");

var modbusClient = new ModbusRTU();
//-----查找可用端口并连接，连接之后立刻获取AO，DO信息--------------//
var connect_t  = function(){
  var promise = new Promise(function(resolve, reject) {
          modbusClient.connectRTUBuffered("COM1", { baudRate: 9600, parity: "none", dataBits: 8, stopBits: 2 },function(){
            console.log("connect succeed");
            resolve();
      })
  });
  return promise;
};
var initial_Poll = function(){
  connect_t().then(poll_DO)
  setTimeout(poll_AO,100);
  setTimeout(poll_Fan1,200);//????????????????
  setTimeout(initial_LST,400);
}

var initial_LST = function(){
  console.log('connected and initialized');
  mqttClient.subscribe('v1/devices/me/rpc/request/+');
  setInterval(tick, 250);  // timeslice schedule tick
}

//var mqttClient = mqtt.connect('mqtt://192.168.2.111:11883', {
var mqttClient = mqtt.connect('mqtt://localhost:11883', {
    username: 'dDZJwKA2VbtYGXDPdSLg'
});


mqttClient.on('connect', initial_Poll);

mqttClient.on('message', function (topic, message) {
    //console.log('topic: ' + topic);
    //console.log(message.toString());
    var response = NaN;
    var requestId = topic.slice('v1/devices/me/rpc/request/'.length);
    var obj = JSON.parse(message);
    if (obj["method"] == "setauto") { // set进水泵1
        auto = obj["params"];
    }else if (obj["method"] == "getauto") { // get进水泵1
        response = JSON.stringify(auto);
        console.log(JSON.stringify(response));
    
    }else if (obj["method"] == "setPump1Status") { // set进水泵1
    //   Pump1Status = obj["params"]   //读命令中的控制参数
    //   response = JSON.stringify(Pump1Status);
      ctrlReq = function(callback){
        Pump1Status = obj["params"]   //读命令中的控制参数
        modbusClient.setID(3);
        modbusClient.writeCoil(263, Pump1Status);
        callback();
      }
    }else if (obj["method"] == "getPump1Status") { // get进水泵1
    	response = JSON.stringify(Pump1Status);
    	console.log(JSON.stringify(response));
    }else if (obj["method"] == "setPump2Status") { // 硝化液回流泵
    // 	Pump2Status = obj["params"]
    //   response = JSON.stringify(Pump2Status);
      ctrlReq = function(callback){
        Pump2Status = obj["params"]
        modbusClient.setID(3);
        modbusClient.writeCoil(262, Pump2Status);
        callback();
      }
    }else if (obj["method"] == "getPump2Status") {  // 硝化液回流泵
    	response = JSON.stringify(Pump2Status);
    }else if (obj["method"] == "setPump3Status") {// 除磷加药泵 控制
      //Pump3Status = obj["params"]
      //response = JSON.stringify(Pump3Status);
      ctrlReq = function(callback){
        Pump3Status = obj["params"]
        modbusClient.setID(3);
        modbusClient.writeCoil(250, Pump3Status);
        callback();
      }
    }else if (obj["method"] == "getPump3Status") {// 除磷加药泵 控制
    	response = JSON.stringify(Pump3Status);
    }else if (obj["method"] == "setPump4Status") {// 碳源加药泵 控制
      //Pump4Status = obj["params"]
      //response = JSON.stringify(Pump4Status);
      ctrlReq = function(callback){
        Pump4Status = obj["params"]
        modbusClient.setID(3);
        modbusClient.writeCoil(251, Pump4Status);
        callback();
      }
    }else if (obj["method"] == "getPump4Status") {// 碳源加药泵 控制
    	response = JSON.stringify(Pump4Status);
    }else if (obj["method"] == "setPump5Status") {// 污泥回流泵
      //Pump5Status = obj["params"]
      //response = JSON.stringify(Pump5Status);
      ctrlReq = function(callback){
        Pump5Status = obj["params"]
        modbusClient.setID(3);
        modbusClient.writeCoil(261, Pump5Status);
        callback();
      }
    }else if (obj["method"] == "getPump5Status") {// 污泥回流泵
    	response = JSON.stringify(Pump5Status);
    } else if (obj["method"] == "setFilterStatus") {// 转盘过滤机
      //FilterStatus = obj["params"]
      //response = JSON.stringify(FilterStatus);
      ctrlReq = function(callback){
        FilterStatus = obj["params"]
        modbusClient.setID(3);
        modbusClient.writeCoil(254, FilterStatus);
        callback();
      }
    }else if (obj["method"] == "getFilterStatus") {// 转盘过滤机
    	response = JSON.stringify(FilterStatus);
    } else if (obj["method"] == "setValve1Status") { // 排泥电动阀
      //Valve1Status = obj["params"]
      //response = JSON.stringify(Valve1Status);
      ctrlReq = function(callback){
        Valve1Status = obj["params"]
        modbusClient.setID(3);
        modbusClient.writeCoil(255, Valve1Status);
        callback();
      }
    }else if (obj["method"] == "getValve1Status") { // 排泥电动阀
    	response = JSON.stringify(Valve1Status);
    } else if (obj["method"] == "setUvStatus") { // 紫外消毒机
      //UvStatus = obj["params"]
      //response = JSON.stringify(UvStatus);
      ctrlReq = function(callback){
        UvStatus = obj["params"]
        modbusClient.setID(3);
        modbusClient.writeCoil(256, UvStatus);
        callback();
      }
    }else if (obj["method"] == "getUvStatus") { // 紫外消毒机
    	response = JSON.stringify(UvStatus);
    } else if (obj["method"] == "setMixer1Status") { // 除磷搅拌机
      //Mixer1Status = obj["params"]
      //response = JSON.stringify(Mixer1Status);
      ctrlReq = function(callback){
        Mixer1Status = obj["params"]
        modbusClient.setID(3);
        modbusClient.writeCoil(257, Mixer1Status);
        callback();
      }
    }else if (obj["method"] == "getMixer1Status") { // 除磷搅拌机
    	response = JSON.stringify(Mixer1Status);
    } else if (obj["method"] == "setMixer2Status") { // 碳源搅拌机
      //Mixer2Status = obj["params"]
      //response = JSON.stringify(Mixer2Status);
      ctrlReq = function(callback){
        Mixer2Status = obj["params"]
        modbusClient.setID(3);
        modbusClient.writeCoil(258, Mixer2Status);
        callback();
      }
    }else if (obj["method"] == "getMixer2Status") { // 碳源搅拌机
    	response = JSON.stringify(Mixer2Status);
    } else if (obj["method"] == "setValve2Status") { // 回流电动阀1
      //Valve2Status = obj["params"]
      //response = JSON.stringify(Valve2Status);
      ctrlReq = function(callback){
        Valve2Status = obj["params"]
        modbusClient.setID(3);
        modbusClient.writeCoil(259, Valve2Status);
        callback();
      }
    }else if (obj["method"] == "getValve2Status") { // 回流电动阀1
    	response = JSON.stringify(Valve2Status);
    } else if (obj["method"] == "setValve3Status") { // 回流电动阀2
      //Valve3Status = obj["params"]
      //response = JSON.stringify(Valve3Status);
      ctrlReq = function(callback){
        Valve3Status = obj["params"]
        modbusClient.setID(3);
        modbusClient.writeCoil(260, Valve3Status);
        callback();
      }
    }else if (obj["method"] == "getValve3Status") { // 回流电动阀2
    	response = JSON.stringify(Valve3Status);
    } else if (obj["method"] == "getFan1Value") {  // 风机1
    	response = JSON.stringify(Fan1Value);
    }else if (obj["method"] == "setFan1Value") {  // 风机1
    	console.log("******************");
      //Fan1Value = obj["params"];
      ctrlReq = function(callback){
        Fan1Value = obj["params"];
        modbusClient.setID(4);
        modbusClient.writeRegister(0x0201, Fan1Value*10);//////////////////////////????????????????????
        callback();
      }
    }else if (obj["method"] == "getFan2Value") {  // 风机2
    	response = JSON.stringify(Fan2Value);
    	//mqttClient.publish('v1/devices/me/rpc/response/' + requestId, JSON.stringify(response));
    }else if (obj["method"] == "setFan2Value") {  // 风机2
    	//Fan2Value = obj["params"];
      ctrlReq = function(callback){
        Fan2Value = obj["params"];
        modbusClient.setID(4);
        modbusClient.writeRegister(0x0201, Fan2Value*10);///////////////////////////?????????????????
        callback();
      }
    }else if (obj["method"] == "getPump7Value") {  // 除磷加药泵
    	response = JSON.stringify(Pump7Value);
    	//mqttClient.publish('v1/devices/me/rpc/response/' + requestId, JSON.stringify(response));
    }else if (obj["method"] == "setPump7Value") {  // 除磷加药泵
    	//Pump7Value = obj["params"];
      ctrlReq = function(callback){
        Pump7Value = obj["params"];
        modbusClient.setID(8);
        modbusClient.writeRegisters(0X16C, [Pump7Value*100]);
        callback();
      }
    }else if (obj["method"] == "getPump8Value") {  // 碳源加药泵
    	response = JSON.stringify(Pump8Value);
    	//mqttClient.publish('v1/devices/me/rpc/response/' + requestId, JSON.stringify(response));
    }else if (obj["method"] == "setPump8Value") {  // 碳源加药泵
    	//Pump8Value = obj["params"];
      ctrlReq = function(callback){
        Pump8Value = obj["params"];
        modbusClient.setID(8);
        modbusClient.writeRegisters(0X16D, [Pump8Value*100]);
        callback();
      }
    }else if (obj["method"] == "getFan1Status") {  // 风机启停控制1
    	response = JSON.stringify(Fan1Status);
    	//mqttClient.publish('v1/devices/me/rpc/response/' + requestId, JSON.stringify(response));
    }else if (obj["method"] == "setFan1Status") {  // 风机启停控制1
    	//Fan1Status = obj["params"];
      if(obj["params"]==true){
        ctrlReq = function(callback){
          Fan1Status = obj["params"];
          modbusClient.setID(4);
          modbusClient.writeCoil(0x48, Fan1Status);
          callback();
        }
      }else{
        ctrlReq = function(callback){
          Fan1Status = obj["params"];
          modbusClient.setID(4);
          modbusClient.writeCoil(0x4B, true);
          callback();
        }
      }
    }else if (obj["method"] == "getFan2Status") {  // 风机启停控制2
    	response = JSON.stringify(Fan2Status);
    	//mqttClient.publish('v1/devices/me/rpc/response/' + requestId, JSON.stringify(response));
    }else if (obj["method"] == "setFan2Status") {  // 风机启停控制2
    	//Fan2Status = obj["params"];
      if(Fan2Status==true){
        ctrlReq = function(callback){
          Fan2Status = obj["params"];
          modbusClient.setID(4);//????????????address??？？？？？？？？？？？？？？？？？？？？？？？？
          modbusClient.writeCoil(0x48, Fan2Status);
          callback();
        }
      }else{
        ctrlReq = function(callback){
          Fan2Status = obj["params"];
          modbusClient.setID(4);//????????????address??？？？？？？？？？？？？？？？？？？？？？？？？
          modbusClient.writeCoil(0x4B, true);
          callback();
        }
      }
    }
    else if (obj["method"] == "getValue") {
    	response = 'unknown';

    }

    if (response == 'unknown')
    	console.log('unknown command!!!');
    else {
    	//ctrlReq = true;
      mqttClient.publish('v1/devices/me/rpc/response/' + requestId, response);
      //console.log(response);
    }
});

/*排泥阀到点工作 */

new CronJob('0 0 15 * * *',function(){
  mud_ctro();
},null,true);
new CronJob('0 30 15 * * *',function(){
  mud_ctrc();
},null,true);

/**
 * 根据进水流量自动控制启停
 * 不进水auto=false，进水并完成自动控制后，auto=true，水停完成自动控制后，auto再回false
 * 1.命令不重复设置 2. 自动控制不干扰手动控制
 */
function flow_ctr(){
    if(flowmeter>0){
        auto_DO = function(){
            var cvt = new Array();
            cvt = [
                Pump3Status, Pump4Status, false, false, true, Valve1Status, UvStatus, Mixer1Status, Mixer2Status, true, true, true, true, Pump1Status
            ];
            modbusClient.setID(3);
      	    modbusClient.writeCoils(250, cvt)
        }
        auto_fan1 = function(){
            modbusClient.setID(4);
            modbusClient.writeRegister(0x0201, Fan1Value*10)
            .then(function(){
                //Fan1Value = 50;
    	        modbusClient.writeCoil(0x48, true)
            })
        }
    }
    else if(flowmeter==0){
        auto_DO = function(){
            var cvt = new Array();
            cvt = [
                Pump3Status, Pump4Status, false, false, false, Valve1Status, UvStatus, Mixer1Status, Mixer2Status, false, false, false, false, Pump1Status
            ];
            modbusClient.setID(3);
      	    modbusClient.writeCoils(250, cvt)
        }
        auto_fan1 = function(){
            modbusClient.setID(4);
            modbusClient.writeRegister(0x0201, 30*0)
            .then(function(){
                Fan1Value = 30;
    	        modbusClient.writeCoil(0x4B, true)
            })
        }
    }
}
// function flow_ctr(){
//   	if(flowmeter>0 && auto==false){
//     auto = function(){
//       var cvt = new Array();
//       cvt = [
//         Pump3Status, Pump4Status, false, false, true, Valve1Status, UvStatus, Mixer1Status, Mixer2Status, true, true, true, true, Pump1Status
//       ];
//       modbusClient.setID(4);
//       modbusClient.writeRegister(0x0201, 50*10)
//       .then(function(){
//     	modbusClient.writeCoil(0x48, true)
//     	.then(function(){
//       	  modbusClient.setID(3);
//       	  modbusClient.writeCoils(250, cvt)
//       	})
//       })
      
//     }
//   }

//   else if(flowmeter==0 && auto==true){
//     auto = function(){
//       var cvt = new Array();
//       cvt = [
//         Pump3Status, Pump4Status, false, false, false, Valve1Status, UvStatus, Mixer1Status, Mixer2Status, false, false, false, false, Pump1Status
//       ];
//       modbusClient.setID(3);
//       modbusClient.writeCoils(250, cvt)
//       .then(function(){
//           modbusClient.setID(4);
//           modbusClient.writeCoil(0x4B, true);
//       })
//     }
//   }
// }

//采集的量
var current, temp, flowmeter, level01, level02, level03=0, level04=0;
var orp01, orp02, do01, ph, nn, codo, cod, bod, an, tn, tp;

//控制量
var Pump1Status = false;  //进水泵
var Pump2Status = false;  //硝化液回流泵
var Pump3Status = false;  //除磷加药泵
var Pump4Status = false;  //碳源加药泵
var Pump5Status = false;  // 污泥回流泵
//var Pump6Status = false;  // 反洗泵
var Valve1Status = false;  //排泥阀
var Valve2Status = false;  //回流电动阀1
var Valve3Status = false;  //回流电动阀2
var FilterStatus = false;  //转盘过滤机
var UvStatus = false;  //紫外消毒机
var Mixer1Status = false;  //除磷搅拌机
var Mixer2Status = false;  //碳源搅拌机
var Fan1Status = false;   //风机1启停
var Fan2Status = false;  //风机2启停
var Fan1Value = 30;   // 风机1
var Fan2Value = 0;    // 风机2
var Pump7Value = 0;  // 除磷加药泵
var Pump8Value = 0;   // 碳源加药泵
// var flag_a2h = false;
var auto = false;
var ctrlReq = false;
var manual = false;  //手动控制
var auto_DO = false; ///自动控制coil
var auto_fan1 = false;
var counter = 39;

function tick() {
  if (counter == 39) counter=0; else counter++;
  console.log('>>'+counter);
  if (counter%2) {
    if(auto==false){
        if(counter==15){
            auto_DO();
        }
        if(counter==17){
            auto_fan1();
        }
    }
    sendCtrl();
    return;
  }

  switch (counter) {
    case 0:
      poll_DO();
      break;
    case 2:
      poll_AO();
      break;
    case 4:
      poll_Fan1();
      break;
    case 6:
      temp_read();
      break;
    case 8:
      level01_read();
      break;
    case 10:
      level03_read();
      break;
    case 12:
      level04_read();
      break;
    case 14:
      flowmeter_read(flow_ctr);//读到水流量就设置auto
      break;
    case 16:
      tp_read();
      break;
    case 18:
      tn_read();
      break;
    case 20:
      cod_read();
      break;
    case 22:
      bod_read();
      break;
    case 24:
      an_read();
      break;
    case 26:
      orp01_read();
      break;
    case 38:
      sendMQTT();
      break;

    default:
      //console.log('.');
  }
}

var t = 25.2;
var h = 12;
var amp_t = 4;
var amp_h = 4;
var factor = 10.

var current, temp, flowmeter, level01, level02, level03, level04;
var orp01, orp02, do01, ph, nn, codo, cod, bod, an, tn, tp;
var Fan1realValue,Fan2realValue;

/*开关排泥阀 */

function mud_ctro(){
  modbusClient.setID(3);
  modbusClient.writeCoil(255, true);
}
function mud_ctrc(){
  modbusClient.setID(3);
  modbusClient.writeCoil(255, false);
}

/*没执行*/

function tp_read(){
  modbusClient.setID(12);
  modbusClient.readHoldingRegisters(0x00, 2, function(err, data) {
    if(err)
    {console.log("read tp error");}
   else{
      var cvt = new Array();
      cvt[2] = data.data[0]>>8;
      cvt[3] = data.data[0]&0x00ff;
      cvt[0] = data.data[1]>>8;
      cvt[1] = data.data[1]&0x00ff;
      tp = ieee754.read(cvt, 0, false, 23, 4);
   }
  });
}
function tn_read(){
  modbusClient.setID(9);
  modbusClient.readHoldingRegisters(0x00, 2, function(err, data) {
    if(err)
    {console.log("read tn error");}
   else{
      var cvt = new Array();
      cvt[2] = data.data[0]>>8;
      cvt[3] = data.data[0]&0x00ff;
      cvt[0] = data.data[1]>>8;
      cvt[1] = data.data[1]&0x00ff;
      tn = ieee754.read(cvt, 0, false, 23, 4);
   }
  });
}
function cod_read(){
  modbusClient.setID(10);
  modbusClient.readHoldingRegisters(0x00, 2, function(err, data) {
    if(err)
    {console.log("read cod error");}
   else{
      var cvt = new Array();
      cvt[2] = data.data[0]>>8;
      cvt[3] = data.data[0]&0x00ff;
      cvt[0] = data.data[1]>>8;
      cvt[1] = data.data[1]&0x00ff;
      cod = ieee754.read(cvt, 0, false, 23, 4);
   }
  });
}
function bod_read(){
  modbusClient.setID(13);
  modbusClient.readHoldingRegisters(0x00, 2, function(err, data) {
    if(err)
    {console.log("read bod error");}
   else{
      var cvt = new Array();
      cvt[2] = data.data[0]>>8;
      cvt[3] = data.data[0]&0x00ff;
      cvt[0] = data.data[1]>>8;
      cvt[1] = data.data[1]&0x00ff;
      bod = ieee754.read(cvt, 0, false, 23, 4);
   }
  });
}
function an_read(){
  modbusClient.setID(11);
  modbusClient.readHoldingRegisters(0x00, 2, function(err, data) {
    if(err)
    {console.log("read an error");}
   else{
      var cvt = new Array();
      cvt[2] = data.data[0]>>8;
      cvt[3] = data.data[0]&0x00ff;
      cvt[0] = data.data[1]>>8;
      cvt[1] = data.data[1]&0x00ff;
      an = ieee754.read(cvt, 0, false, 23, 4);
   }
  });
}
function orp01_read(){
  modbusClient.setID(16);
  modbusClient.readHoldingRegisters(0x04, 2, function(err, data) {
    if(err)
    {console.log("read orp01 error");}
   else{
      var cvt = new Array();
      cvt[0] = data.data[0]>>8;
      cvt[1] = data.data[0]&0x00ff;
      cvt[2] = data.data[1]>>8;
      cvt[3] = data.data[1]&0x00ff;
      orp01 = ieee754.read(cvt, 0, false, 23, 4);
   }
  });
}

function temp_read(){
  modbusClient.setID(7);
  modbusClient.readHoldingRegisters(0x00, 2, function(err, data) {
    if(err)
    {console.log("read temp error");}
   else{
      var cvt = new Array();
      cvt[0] = data.data[0]>>8;
      cvt[1] = data.data[0]&0x00ff;
      cvt[2] = data.data[1]>>8;
      cvt[3] = data.data[1]&0x00ff;
      temp = ieee754.read(cvt, 0, false, 23, 4);
   }
  });
}

function level01_read(){
  modbusClient.setID(15);
  modbusClient.readHoldingRegisters(0x00, 2, function(err, data) {
    if(err)
    {console.log("read level01 error");}
   else{
      var cvt = new Array();
      cvt[0] = data.data[0]>>8;
      cvt[1] = data.data[0]&0x00ff;
      cvt[2] = data.data[1]>>8;
      cvt[3] = data.data[1]&0x00ff;
      level01 = ieee754.read(cvt, 0, false, 23, 4);
   }
  });
}
function level03_read(){
  modbusClient.setID(6);
  modbusClient.readHoldingRegisters(0x00, 2, function(err, data) {
    if(err)
    {console.log("read level03 error");}
   else{
      var cvt = new Array();
      cvt[0] = data.data[0]>>8;
      cvt[1] = data.data[0]&0x00ff;
      cvt[2] = data.data[1]>>8;
      cvt[3] = data.data[1]&0x00ff;
      level03 = ieee754.read(cvt, 0, false, 23, 4);
   }
  });
}
function level04_read(){
  modbusClient.setID(14);
  modbusClient.readHoldingRegisters(0x00, 2, function(err, data) {
    if(err)
    {console.log("read level04 error");}
   else{
      var cvt = new Array();
      cvt[0] = data.data[0]>>8;
      cvt[1] = data.data[0]&0x00ff;
      cvt[2] = data.data[1]>>8;
      cvt[3] = data.data[1]&0x00ff;
      level04 = ieee754.read(cvt, 0, false, 23, 4);
   }
  });
}
function flowmeter_read(callback){
  modbusClient.setID(18);
  modbusClient.readInputRegisters(0x1010, 2, function(err, data) {
    if(err)
    {console.log("read flowmeter error");}
   else{
      var cvt = new Array();
      cvt[0] = data.data[0]>>8;
      cvt[1] = data.data[0]&0x00ff;
      cvt[2] = data.data[1]>>8;
      cvt[3] = data.data[1]&0x00ff;
      flowmeter = ieee754.read(cvt, 0, false, 23, 4);
      callback();
   }
  });
}

function sendCtrl() {
	if (ctrlReq!=false) {
		ctrlReq(function(){
      ctrlReq = false;
    });
  }
  else{
    console.log(ctrlReq);
  }
}

function sendMQTT() {
  console.log('publish MQTT');
  t+= Math.random()*amp_t*factor*2-factor*amp_t; if (t>80) t = 75; if (t<20) t = 25;
  h+= Math.random()*amp_h*factor*2-factor*amp_h; if (h>80) h = 75; if (h<20) h = 25;

  current = 10+Math.random()*5;
  level02 = 10+Math.random()*5;
  orp01 = 20+Math.random()*5;
  orp02 = 20+Math.random()*5;
  do01 = 30+Math.random()*5;
  ph = 6.5+Math.random()*1;
  nn = 30+Math.random()*5;
  codo = 30+Math.random()*5;
  
	var TH = {
        "temperature": t,
        "humidity": h,
        
        "current": current,
        "temp": temp,//
        "flowmeter": flowmeter,//
        "level01": level01,//
        "level02": level02,//
        "level03": level03,//
        "level04": level04,//
        
        "orp01": orp01,
        "orp02": orp02,
        "do01": do01,
        "ph": ph,
        "nn": nn,
        "codo": codo,
        "cod": cod,
        "bod": bod,
        "an": an,
        "tn": tn,
        "tp": tp,
        "Fan1realValue":Fan1realValue,
        "Fan2realValue":Fan2realValue,
        "Pump1Status" : Pump1Status,//进水泵
        "Pump2Status" : Pump2Status,//硝化液回流泵
        "Pump3Status" : Pump3Status,//除磷加药泵
        "Pump4Status" : Pump4Status,//碳源加药泵
        "Pump5Status" : Pump5Status,//污泥回流泵
        "FilterStatus" : FilterStatus,//转盘过滤机
        "UvStatus" : UvStatus,//紫外消毒机
        "Valve1Status" : Valve1Status,//排泥阀
        "Valve2Status" : Valve2Status,//回流电动阀1
        "Valve3Status" : Valve3Status,//回流电动阀2
        "Mixer1Status" : Mixer1Status,//除磷搅拌机
        "Mixer2Status" : Mixer2Status//碳源搅拌机

    };

  mqttClient.publish('v1/devices/me/telemetry', JSON.stringify(TH));
  console.log([TH]);
}

/////////////////////////////////////
// read the values of 4 registers (4 channels) starting at address 0x12c on device id 2.
function send_value(){
  var RV = {
    "Fan1realValue":Fan1realValue,
    "Fan2realValue":Fan2realValue,
    // "Pump5Status":Pump5Status,
    // "Pump2Status":Pump2Status,
    // "FilterStatus":FilterStatus,
    // "Valve1Status":Valve1Status,
    // "Valve2Status":Valve2Status,
    // "Valve3Status":Valve3Status
  }
  mqttClient.publish('v1/devices/me/telemetry', JSON.stringify(RV));
  console.log([RV]);
}

function Fan1Status_R(callback){
  modbusClient.readCoils(0x00, 1, function(err, data) {
    if(err) console.log("read Fan1status error");
    else{
      console.log("Fan1:"+data.data);
      Fan1Status = data.data[0];
      callback();
    }
  });
}

function poll_Fan1_t(callback) {
  console.log(">>poll_Fan1");
  modbusClient.setID(4);
  Fan1Status_R(function Fan1realValue_R(){
    modbusClient.readHoldingRegisters(0x0220, 1, function(err, data) {
      if(err) console.log("read Fan1realvalue error");
      else{
        console.log("运行频率："+data.data);
        Fan1realValue = data.data[0]*0.1;//运行频率
        callback();
      }
    });
  });
}  
function poll_Fan1(){
  poll_Fan1_t(send_value);
}

// read the values of 16 coils at address 250 on device id 3.
function poll_DO() {
  console.log("poll_DO");
  modbusClient.setID(3);// DO
  modbusClient.readCoils(250, 16,function(err,data){
    if(err) console.log("read DO error");
    else{
      console.log("DO:"+data.data);
      var gpio=data.data;
      Pump1Status = gpio[13];//进水泵
      Pump2Status = gpio[12];//硝化液回流泵
      Pump3Status = gpio[0];//除磷加药泵
      Pump4Status = gpio[1];//碳源加药泵
      Pump5Status = gpio[11];//污泥回流泵
      //Pump6Status = gpio[3];//
      FilterStatus = gpio[4];//转盘过滤机
      UvStatus = gpio[6];//紫外消毒机
      Valve1Status = gpio[5];//排泥阀
      Valve2Status = gpio[9];//回流电动阀1
      Valve3Status = gpio[10];//回流电动阀2
      Mixer1Status = gpio[7];//除磷搅拌机
      Mixer2Status = gpio[8];//碳源搅拌机
    }
  });
}

function poll_AO() {
  console.log(">>poll_AO");
  modbusClient.setID(8);// AO
  modbusClient.readHoldingRegisters(0x16c, 2, function(err, data) {
    if(err) console.log("read AO error");
    else{
      console.log("AO:"+data.data);
      Pump7Value = data.data[0]*0.01;
      Pump8Value = data.data[1]*0.01;
    }
  });
}

//Catches ctrl+c event
process.on('SIGINT', function () {
    console.log();
    console.log('Disconnecting...');
    mqttClient.end();
    console.log('Exited!');
    process.exit(2);
});

//Catches uncaught exceptions
process.on('uncaughtException', function(e) {
    console.log('Uncaught Exception...');
    console.log(e.stack);
    process.exit(99);
});
