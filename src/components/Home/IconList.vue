<template>
    <div class="iconList">

        <div class="iconItem">
            <!-- <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-tuijian"></use>
            </svg> -->
            <van-icon name="hot-o" size="1rem"/>
            <span>Recommend</span>
        </div>
        
        <div class="iconItem">
            <!-- <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zhibo"></use>
            </svg> -->
            <van-icon name="bullhorn-o" size="1rem"/>
            <span>FM</span>
        </div>

        <div class="iconItem">
            <!-- <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gedan"></use>
            </svg> -->
            <van-icon name="orders-o" size="1rem"/>
            <span>List</span>
        </div>

        <div class="iconItem">
            <!-- <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-paihangbang"></use>
            </svg> -->
            <van-icon name="chart-trending-o" size="1rem"/>
            <span>Top50</span>
        </div>
    </div>
</template>

<style lang="less" scoped>
    .iconList{
        width: 100%;
        height: 2rem;
        margin-top: .2rem;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .iconItem{
            width: 25%;
            height: 100%;
            display: flex;
            flex-direction: column;//垂直方向
            align-items: center;
            .icon{
                width: 1rem;
                height: 1rem;
            }
        }
    }
</style>