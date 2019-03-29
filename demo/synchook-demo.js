const { SyncHook,SyncBailHook,SyncWaterfallHook }= require('tapable');


class Person{
    //所有的钩子都暴露在hooks属性上--最佳实践方式
    constructor(){
        this.hooks={
            run:new SyncHook(['speed']),
            heartBeat:new SyncBailHook(['heartbeat']),
            distance: new SyncWaterfallHook(['distance'])
        }
    }
    runSync(speed){
        //执行钩子
        this.hooks.run.call(speed);
    }

    runBail(beat){
        this.hooks.heartBeat.call(beat)
    }

    runWaterfall(distance){
        this.hooks.distance.call(distance)
    }
}

//记录跑的速度 Phone  SportsBracelet ...

const liuhao=new Person();



/**
 * Sync
 * 
 */

liuhao.hooks.run.tap('phone',speed=>{
    console.info(`Sync phone-->${speed}`);
    // do something ...
})
liuhao.hooks.run.tap('SportsBracelet',speed=>{
    console.info(`Sync SportsBracelet-->${speed}`);
    // do something ...
})


/**
 * Sync Bail
 * 
 */


liuhao.hooks.heartBeat.tap('phone',beat=>{
    console.warn(`Sync Bail phone:${beat}`)
    if(beat>200){
        return `current hear beat ${beat} stop run other function`
    }
})

liuhao.hooks.heartBeat.tap('otherDevice',beat=>{
    console.warn(`Sync Bail otherDevice:${beat}`)
    if(beat>20){
        return `otherDevice-->current hear beat ${beat} stop run other function`
    }
})

liuhao.hooks.heartBeat.tap('SportsBracelet',beat=>{
    console.warn(`Sync SportsBracelet otherDevice:${beat}`)
    if(beat>100){
        return `current-->hear beat ${beat} stop run other function`
    }
})


/**
 * Sync Waterfall
 * 
 */

liuhao.hooks.distance.tap('phone',distance=>{
    console.info(`Sync Waterfall phone-->${distance}`);

    return distance-5;
    // do something ...
})

liuhao.hooks.distance.tap('SportsBracelet',distance=>{
    console.info(`Sync Waterfall SportsBracelet-->${distance}`);
    // do something ...
    return distance-10;
})

liuhao.hooks.distance.tap('otherDevice',distance=>{
    console.info(`Sync Waterfall otherDevice-->${distance}`);
    return distance-15;
    // do something ...
})


module.exports=liuhao;
