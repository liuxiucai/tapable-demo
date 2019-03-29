
const { AsyncParallelHook,AsyncSeriesWaterfallHook,AsyncSeriesHook }= require('tapable');


class Person{
    //所有的钩子都暴露在hooks属性上--最佳实践方式
    constructor(){
        this.hooks={
            //速度
            run:new AsyncParallelHook(['speed']),
            runSeries:new AsyncSeriesHook(['speed']),
            runPromise:new AsyncSeriesWaterfallHook(['speed'])
        }
    }
    runAsync(speed){
        //执行钩子
        console.time('runAsync');
        this.hooks.run.callAsync(speed,()=>{
            console.timeEnd('runAsync');
            console.info('Async Parallel call complete!!!');
        });
    }
    runSeries(speed){
        console.time('runSeries');
        this.hooks.runSeries.callAsync(speed,()=>{
            console.timeEnd('runSeries');
            console.info('Async Series call complete!!!');
        });
    }
    runPromise(speed){
        this.hooks.runPromise.promise(speed).then(ret=>{
            console.info(`Async Waterfall Promise call ret===${ret}`)
        })
    }
}

//记录跑的速度 Phone  SportsBracelet ...

const liuhao=new Person();


/**
 * Parallel
 * 
 */


liuhao.hooks.run.tapAsync('phone',(speed,done)=>{

    setTimeout(()=>{
        console.info(`Async Parallel phone 5s -->${speed}`);
        done();
        // do something ..
    },5000)
})
liuhao.hooks.run.tapAsync('otherDevice',(speed,done)=>{
    setTimeout(()=>{
        console.info(`Async Parallel otherDevice 3s -->${speed}`);
        done();
        // do something ..
    },3000)
})

liuhao.hooks.run.tapAsync('SportsBracelet',(speed,done)=>{
    setTimeout(()=>{
        console.info(`Async Parallel SportsBracelet 2s -->${speed}`);
        done();
        // do something ..
    },2000)
})




/**
 * Series
 */


liuhao.hooks.runSeries.tapAsync('phone',(speed,done)=>{
    console.info(`Async Series  1`);
    setTimeout(()=>{
        console.info(`Async Series   phone 5s -->${speed}`);
        done();
        // do something ..
    },5000)
})
liuhao.hooks.runSeries.tapAsync('otherDevice',(speed,done)=>{
    console.info(`Async Series   2`);
    setTimeout(()=>{
        console.info(`Async Series   otherDevice 3s -->${speed}`);
        done();
        // do something ..
    },3000)
})

liuhao.hooks.runSeries.tapAsync('SportsBracelet',(speed,done)=>{
    console.info(`Async Series   3`);
    setTimeout(()=>{
        console.info(`Async Series   SportsBracelet 2s -->${speed}`);
        done();
        // do something ..
    },2000)
})

// liuhao.runSeries('10km/h');



/**
 * Promise
 * 
 */


liuhao.hooks.runPromise.tapPromise('promisePhone',(speed)=>{
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.info(`Async SeriesWaterfall 2s -->${speed}`);
            resolve(speed);
            // do something ..
        },2000)
    })
})

//liuhao.runPromise('1km/h')


module.exports=liuhao;