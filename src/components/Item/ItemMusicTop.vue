<template>
    <div class="itemMusicTop">
        <img :src="playList.coverImgUrl" alt="" class="bgImg">
        <div class="itemLeftIcon">
            <!-- <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg> -->
            <van-icon name="revoke" size="0.5rem" color="#fff" class="icon" @click="$router.go(-1)"/>
            <span>Back</span>
        </div>
        <div class="itemRightIcon">
            <!-- <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-sousuo"></use>
            </svg> -->
            <van-icon name="search" size="0.5rem" color="#fff" class="icon"/>
            <!-- <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-31liebiao"></use>
            </svg> -->
            <van-icon name="more-o" size="0.5rem" color="#fff"/>
        </div>
    </div>
    <div class="itemTopCotent">
        <div class="contentLeft">
            <img :src="playList.coverImgUrl" alt="">
            <div class="playCount">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-gl-play-copy"></use>
                </svg>
                <span>{{ (playList.playCount / 1000000).toFixed(1) + 'M' }}</span>
            </div>
        </div>
        <div class="contentRight">
            <p class="rightP_one">{{ playList.name }}</p>
            <div class="right_img">
                <img :src="playList.creator.backgroundUrl" alt="">
                <span>{{ playList.creator.nickname }}</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou"></use>
                </svg>
            </div>
            <p class="rightP_two">
                <span>{{ playList.description }}</span>
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou"></use>
                </svg>
            </p>
        </div>
    </div>
    <div class="itemTopFooter">
        <div class="footerItem">
            <!-- <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
            </svg> -->
            <van-icon name="chat-o" size="0.5rem" color="#fff"/>
            <span>{{ playList.commentCount }}</span>
        </div>
        <div class="footerItem">
            <!-- <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fenxiang"></use>
            </svg> -->
            <van-icon name="share-o" size="0.5rem" color="#fff"/>
            <span>{{ playList.shareCount }}</span>
        </div>
        <div class="footerItem">
            <!-- <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
            </svg> -->
            <van-icon name="down" size="0.5rem" color="#fff"/>
            <span>Download</span>
        </div>
        <div class="footerItem">
            <!-- <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-show_duoxuan"></use>
            </svg> -->
            <van-icon name="good-job-o" size="0.5rem" color="#fff"/>
            <span>Thumb</span>
        </div>
    </div>
</template>

<script>
export default {
    setup(props) {
        //本来是通过props来传递数据
        //如果刷新数据拿不到的话，就获取session storage里的数据
        if ((props.playList.creator = '')) {
            props.playList.creator = JSON.parse(sessionStorage.getItem().playList).creator
        }

    },
    props: ['playList',]
}
</script>

<style lang="less" scoped>
.itemMusicTop {
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // padding: .2rem;
  position: relative;
  .itemLeftIcon,
  .itemRightIcon {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0.2rem;
    span {
      font-size: 0.4rem;
      color: #fff;
    }
    .icon {
      fill: #fff; //填充颜色
    }
  }
  .bgImg {
    width: 100%;
    height: 11rem;
    position: absolute;
    z-index: -1;
    filter: blur(30px);
  }
}
.itemTopCotent {
  width: 100%;
  height: 3rem;
  padding: 0.2rem;
  margin-top: 0.4rem;
  display: flex;
  justify-content: space-between;
  
  .contentLeft {
    width: 36%;
    height: 2.6rem;
    position: relative;

    img {
      width: 2.6rem;
      height: 2.6rem;
      border-radius: 0.2rem;
      position: absolute;
      z-index: -1;
    }
    .playCount {
      position: absolute;
      right: 0.1rem;
      margin-top: 0.1rem;
      .icon {
        width: 0.26rem;
        height: 0.26rem;
        margin-top: -0.02rem;
        vertical-align: middle;
      }
      span {
        font-size: 0.26rem;
        color:#fff;
      }
    }
  }
  .contentRight {
    width: 60%;
    height: 2.6rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .rightP_one {
      font-size: 0.3rem;
      font-weight: 900;
      color: #fff;
      font-family: "微软雅黑";
    }
    .right_img {
      width: 100%;
      height: 0.6rem;
      line-height: 0.6rem;
      color: #ccc;
      img {
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
        vertical-align: middle;
      }
      span {
        margin-left: 0.1rem;
      }
      .icon {
        width: 0.26rem;
        height: 0.26rem;
        margin-top: -0.08rem;
        vertical-align: middle;
      }
    }
    .rightP_two {
      width: 100%;
      height: 0.6rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        display: inline-block;
        width: 95%;
        height: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 0.24rem;
        color: #ccc;
      }
      .icon {
        width: 0.24rem;
        height: 0.24rem;
      }
    }
  }
}
.itemTopFooter{
  width: 100%;
  height: 1.4rem;
  display: flex;
  justify-content: space-around;
  margin-top: .2rem;
  .footerItem{
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    .icon{
      fill: #fff;
    }
    span{
      margin-top: .1rem;
    }
  }

}
</style>