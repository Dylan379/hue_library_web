


//  4/22 解决请求数据传递的问题
export default function throttle(fn: Function, interval: number) {
    //初始化  上一次结束时间计时器
    let lastTime = 0;
    //执行函数 第一个参数是保证this指针,第二参数将回调接收的参数保存在args数组中
    function _throttle(this: any, ...args: any[]) {
        //获取当前时间
        let nowTime = Date.now();
        //如果当前时间与上一次时间间隔 大于 interval 就执行 fn
        let cd = nowTime - lastTime;
        if (cd > interval) {
            fn.apply(this, args);
            //此时更新结束时间值
            lastTime = nowTime;
        }
    }
    //返回执行函数
    return _throttle;
}


// //函数接收两个参数  fn是需要节流的函数   interval是最小触发间隔时间
// export default function throttle(fn: Function, interval: number, resultCb: Function) {
//     //初始化  上一次结束时间计时器
//     let lastTime = 0;

//     //执行函数 第一个参数是保证this指针,第二参数将回调接收的参数保存在args数组中
//     function _throttle(this: any, ...args: any[]) {

//         //获取当前时间
//         let nowTime = Date.now();
//         //如果当前时间与上一次时间间隔 大于 interval 就执行 fn
//         let cd = nowTime - lastTime;
//         if (cd > interval) {
//             //将函数的返回值保存到结果当中
//             const result = fn.apply(this, args);
//             //将结果返回给回调函数
//             resultCb(result)
//             //此时更新结束时间值
//             lastTime = nowTime;
//         }
//     }

//     //返回执行函数
//     return _throttle;
// }