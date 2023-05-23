//fn是需要防抖的函数
//delay是需要防抖所需要的时间，默认为1s
//immediate是第一次触发是否执行
export default function debounce(fn: Function | any, delay: number = 1000, immediate: boolean = false) {
    //定时器
    let time: number = 0
    //使用isImmediateInvoke来判断是否立即执行，默认为false
    let isImmediateInvoke = false
    function _debounce(this: any, ...args: any[]) {
        //当time计时器不为零，说明计时器存在，将计时器清零，以便重新计时
        if (time !== 0) {
            clearTimeout(time)
        }
        //当第一次触发且需要立即执行
        if (!isImmediateInvoke && immediate) {
            fn.apply(this, args)
            isImmediateInvoke = true
        }

        time = setTimeout(() => {
            fn.apply(this, args)
            isImmediateInvoke = false
        }, delay);
    }
    //防抖函数返回一个函数，这个函数才是正真要被执行的函数。
    return _debounce
}