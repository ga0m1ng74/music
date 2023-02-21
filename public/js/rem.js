//页面调整，屏幕适配
function remSize() {
    //获取设备宽度 第一个或者第二个都可以获取到设备宽度
    var deviceWidth = document.documentElement.clientWidth || window.innerWidth
    if (deviceWidth >= 750) deviceWidth = 750
    if (deviceWidth <= 320) deviceWidth = 320
        //750px-->1rem =100px  375px-->1rem=50px
    document.documentElement.style.fontSize = (deviceWidth / 7.5) + 'px'
        //设置字体大小
    document.querySelector('body').style.fontSize = 0.3 + "rem"
}

remSize();
//当窗口发生变化时，调用更新页面大小
window.onresize = function() {
    remSize();
}