const asynchookTest=require('./demo/asynchook-demo.js');
const synchookTest=require('./demo/synchook-demo.js');

asynchookTest.runAsync('2km/h');
asynchookTest.runSeries('2.3km/h');
asynchookTest.runPromise(120);

synchookTest.runSync('1km/h');
synchookTest.runBail(30);
synchookTest.runWaterfall(20);