export default function throttle(fn: any, interval: number) {
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