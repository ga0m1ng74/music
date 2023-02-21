<template>
    <div class="musicList">
        <div class="musicTop">
            <div class="title">Mixed for you</div>
            <div class="more">More</div>
        </div>
        <div class="musicContent">
            <van-swipe :loop="false" :width="150" :show-indicators="false">
                <van-swipe-item v-for="item in musicList" :key="item.id" class="my-swiper">
                    <router-link :to="{path:`/itemMusic`,query:{id:item.id}}">
                        <img :src="item.picUrl" :alt="item.name">
                        <span class="playCount">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-gl-play-copy"></use>
                            </svg>
                            {{(item.playCount / 1000000).toFixed(1) + 'M'}}
                        </span>
                        <span class="name">
                            {{ item.name }}
                        </span>
                    </router-link>
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>

<script>
import { getMusicList } from '@/request/api/home.js'
export default {
    data() {
        return {
            musicList: [],
        }
    },
    methods: {
        async MusicList() {
            let result = await getMusicList();
            // console.log(result.data);
            this.musicList = result.data.result
        }
    },
    mounted() {
        this.MusicList();
    },
};
</script>

<style lang="less" scoped>
.musicList {
    width: 100%;
    height: 5rem;
    padding: 0.2rem;
    .musicTop {
        width: 100%;
        height: 0.6rem;
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.2rem;
        .title {
            font-size: 0.4rem;
            font-weight: 900;
        }
        .more {
            border: 1px solid #ccc;
            text-align: center;
            line-height: 0.6rem;
            padding: 0 0.2rem;
            border-radius: 0.4rem;
        }
    }

    .musicContent {
    width: 100%;
    height: 3.6rem;

    .my-swiper {
      padding-right: 0.2rem;
      position: relative;
      height: 3.8rem;
      img {
        width: 100%;
        height: 2.4rem;
        border-radius: 0.2rem;
        // position: relative;
      }
      .playCount {
        position: absolute;
        z-index: 5;
        right: 0.3rem;
        color: #fff;
        top: 0.06rem;
        .icon {
          width: 0.25rem;
          height: 0.25rem;
          fill: #fff;
        }
      }
      .name {
        //   position: absolute;
        bottom: 0px;
      }
    }
  }
}
</style>