
// var pp
// var CronJob = require('cron').CronJob;
// new CronJob('0 0 15 * * *',function(){
//     pp = test()
//   },null,true);
//   new CronJob('0 30 15 * * *',function(){
//     console.log("end")
//   },null,true);

//   function test(){
//     console.log("begin")
//   }

//   pp()
function test(){
  console.log("test")
}
function ctr(callback){
  callback()
}
ctr(test)