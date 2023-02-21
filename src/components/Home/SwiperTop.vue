<template>
    <div id="swiperTop">
        <van-swipe :autoplay="3000" lazy-render>
            <van-swipe-item v-for="image in state.images" :key="image">
                <img :src="image.pic" @click="newTab(image)"/>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
import axios from 'axios'
import { reactive, onMounted } from 'vue';
import {getBannerImg} from '@/request/api/home.js'
import {getMusicUrl} from '@/request/api/item.js'
import {mapMutations} from 'vuex'
export default {
    setup() {
        //轮播图的图片
        const state = reactive(
            {
                images:['https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',],
            }
        );

        //
        onMounted(async () => {
            let result = await getBannerImg();
            // console.log(result);
            state.images = result.data.banners
        });
        return { state };
    },
    computed: {
    },
    methods: {
        ...mapMutations(['updateMusicUrl','updatePushPlayList','updatePlayListIndex']),
        async newTab(image){
            // console.log(image);
            try {
                let result = await getMusicUrl(image.targetId)
                // console.log(result.data.data[0].url);
                this.updateMusicUrl(result.data.data[0].url);
                this.$store.commit('updatePushPlayList', image.song)
                this.$store.commit('updatePlayListIndex', this.$store.state.playList.length - 1)
            } catch (error) {
                alert('getMusicUrl Error')
            }
        }
    },
};
</script>

<style lang="less" scoped>
#swiperTop {
    .van-swipe {
        width: 100%;
        height: 3rem;

        .van-swipe-item {
            img {
                width: 100%;
                height: 100%;
                border-radius: 0.2rem;
            }
        }

        .van-swipe__indicators {
            background-color: skyblue;
        }

    }
}
</style>