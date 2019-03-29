# what-[tapable](https://github.com/webpack/tapable)

[tapable](https://github.com/webpack/tapable) is core utility in webpack but can also be used elsewhere to provide a similar plugin interface. 

## Expose many Hook classes:

``` javascript
const {
        SyncHook,
        SyncBailHook,
        SyncWaterfallHook,
        SyncLoopHook,
        AsyncParallelHook,
        AsyncParallelBailHook,
        AsyncSeriesHook,
        AsyncSeriesBailHook,
        AsyncSeriesWaterfallHook,
} = require('tapable')

```

### 同步与异步 两类"钩子"

1. 同步（Sync）：同步钩子(<font color="#ff4081">串行</font>)只能被"同步"函数"监听" (`Hook.tap()`)
        
2. 异步（Async）
    * Serises  异步串行      (`Hook.tap(), Hook.tapAsync(),HookPromise()`)
    * Parallel  异步并行     (`Hook.tap(), Hook.tapAsync(),HookPromise()`)



### "钩子"函数执行方式:

    1. Serises ：串行
    2. Parallel ：并行 
    3. Bail  ：允许提前退出,任何执行的函数只要有任何的返回值（非undefined），将停止执行
    4. waterfall  ：所有函数返回一个值并作为行一个执行函数的参数
    5. Pool. TODO 

钩子根据不同 "类型" 与 "执行方式" 组合，以不同方式来执行

例如:

`SyncWaterfallHook` : 同步waterfall钩子

`AsyncSeriesBailHook` ：异步串行Bail钩子



## 运行结果：

`npm install`

`npm run demo`


output:


``` javascript
Async Series  1
Sync phone-->1km/h
Sync SportsBracelet-->1km/h
Sync Bail phone:30
Sync Bail otherDevice:30
Sync Waterfall phone-->20
Sync Waterfall SportsBracelet-->15
Sync Waterfall otherDevice-->5
Async Parallel SportsBracelet 2s -->2km/h
Async SeriesWaterfall 2s -->120
Async Waterfall Promise call ret===120
Async Parallel otherDevice 3s -->2km/h
Async Parallel phone 5s -->2km/h
runAsync: 5002.853ms
Async Parallel call complete!!!
Async Series   phone 5s -->2.3km/h
Async Series   2
Async Series   otherDevice 3s -->2.3km/h
Async Series   3
Async Series   SportsBracelet 2s -->2.3km/h
runSeries: 10005.412ms
Async Series call complete!!!

```









