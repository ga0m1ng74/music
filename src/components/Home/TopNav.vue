<template>
    <div class="TopNav">
        <div class="topLeftIcon">
            <van-icon name="contact" size="0.5rem" @click="$router.push('/my')"/>
        </div>
        <div class="topContent">
            <!-- <span >Home</span> -->
            <span class="active">Discover</span>
            <!-- <span>Cloud</span>
            <span>Video</span> -->
        </div>
        <div class="topRightIcon">
            <!-- <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
                <use xlink:href="#icon-sousuo"></use>
            </svg> -->
            <van-icon name="search" size="0.5rem" @click="$router.push('/search')"/>
        </div>
    </div>
</template>

<script>

</script>

<style lang="less" scoped>
.TopNav{
    width: 100%;
    height: 1rem;
    padding: .2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .topContent{
        width: 65%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        // align-items: center;
        font-size: .36rem;
        .active{
            font-weight: 900;
        }
    }
}

</style>