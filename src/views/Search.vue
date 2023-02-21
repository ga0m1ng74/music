<template>
    <div class="searchTop">
        <!-- <svg class="icon" aria-hidden="true" @click="this.$router.go(-1)">
            <use xlink:href="#icon-zuojiantou"></use>
        </svg> -->
        <van-icon name="revoke" class="icon" size="0.5rem" @click="this.$router.go(-1)" />
        <input type="text" placeholder="Maroon 5" v-model="searchWord" @keydown.enter="searchComplete">
    </div>
    <div class="searchHistory">
        <span class="searchSpan">Recent searches</span>
        <span v-for="item in keyWordList" :key="item" class="historyKeyword" @click="ReSearch(item)">
            {{ item }}</span>
        <!-- <svg class="icon" aria-hidden="true" @click="deleteHistroy">
            <use xlink:href="#icon-shanchu"></use>
        </svg> -->
        <van-icon name="delete-o" class="icon" size="0.5rem" @click="deleteHistroy" />
    </div>
    <hr>
    <div class="itemList">
        <div class="item" v-for="(item, i) in resultList" :key="i">
            <div class="itemLeft" @click="updateMusic(item)">
                <span class="leftSpan">{{ i + 1 }}</span>
                <div>
                    <p>{{ item.name }}</p>
                    <span v-for="(item1, index) in item.ar || item.artists" :key="index">{{
                        item1.name
                    }}</span>
                </div>
            </div>
            <div class="itemRight">
                <van-icon name="video-o" size="0.5rem" color="#1989fa" @click="playVideo(item)" v-if='item.mv != 0' />
                <van-icon name="other-pay" class="icon liebiao" size="0.5rem" color="#999" />
            </div>
        </div>
        <van-popup v-model:show="show" closeable position="right" :style="{ padding: '1px' }"
            @click-close-icon="onClickCloseIcon">
            <video ref="video" :src="this.videoSrc" autoplay controls></video>
        </van-popup>
    </div>
</template>

<script>
import { getSearchReturn } from '@/request/api/home.js'
import { getMusicUrl, getMusicMV } from '@/request/api/item.js'
import { mapMutations } from 'vuex'
import { ref } from 'vue';
export default {
    setup(props) {
        const show = ref(false);
        const onClickCloseIcon = () => {
            // showToast('click-close-icon');
        };
        return {
            show,
            onClickCloseIcon,
        };
    },
    data() {
        return {
            videoSrc: '',
            keyWordList: [],//历史关键字
            searchWord: '',//搜索的关键字
            resultList: [],//搜索结果列表
        }
    },
    mounted() {
        this.keyWordList = JSON.parse(localStorage.getItem('keyWordList')) || []
    },
    methods: {
        ...mapMutations(['updateMusicUrl']),
        async searchComplete() {
            //去空格
            this.searchWord = this.searchWord.trim()
            if (this.searchWord !== '') {
                this.keyWordList.unshift(this.searchWord);//压入搜索历史
                //去重
                this.keyWordList = [...new Set(this.keyWordList)]
                //固定搜素array长度
                if (this.keyWordList.length > 5) {
                    this.keyWordList.pop()
                }
                localStorage.setItem("keyWordList", JSON.stringify(this.keyWordList))
                try {
                    //获取搜索资源
                    let result = await getSearchReturn(this.searchWord)
                    this.resultList = result.data.result.songs
                } catch (error) {
                    alert('getSearchReturn Error')
                }

                this.searchWord = ''
            } else {
                this.searchWord = ''
            }
        },
        deleteHistroy() {
            localStorage.removeItem('keyWordList')
            this.keyWordList = [];
        },
        async ReSearch(item) {
            try {
                //获取搜索资源
                let result = await getSearchReturn(item)
                // console.log(result.data.result.songs);
                this.resultList = result.data.result.songs
            } catch (error) {
                alert('getSearchReturn Error')
            }
        },
        async updateMusic(item) {
            try {
                this.$store.commit('updatePushPlayList', item)
                this.$store.commit('updatePlayListIndex', this.$store.state.playList.length - 1)
                let result = await getMusicUrl(item.id)
                let url = result.data.data[0].url;
                this.updateMusicUrl(url);
            } catch (error) {
                alert('getMusicUrl Error')
            }

        },
        async playVideo(item) {
            this.show = true
            //
            try {
                let result = await getMusicMV(item.mv)
                this.videoSrc = result.data.data.url;
            } catch (error) {
                alert('getMusicMV Error')
            }
        }
    },
    watch: {
        videoSrc() {
            this.$refs.video.autoplay = true
        }
    },
}
</script>

<style lang="less" scoped>
.searchTop {
    width: 100%;
    height: 1rem;
    padding: 0 0.2rem;
    display: flex;
    align-items: center;

    input {
        margin-left: 0.5rem;
        border: none;
        border-bottom: 1px solid #999;
        width: 98%;
    }
}

.searchHistory {
    width: 100%;
    height: 2rem;
    padding: 0.2rem;
    position: relative;
    overflow: scroll;

    .searchSpan {
        // font-size: 0.4rem;
        font-weight: 700;
    }

    .historyKeyword {
        padding: 0.1rem;
        background-color: rgb(185, 180, 180);
        border-radius: 0.4rem;
        margin: 0.1rem 0.2rem;
        display: inline-block;
    }

    .icon {
        width: 0.4rem;
        height: 0.4rem;
        position: absolute;
        right: 0.2rem;
    }
}

.itemList {
    width: 100%;
    padding: 0.2rem;

    .item {
        width: 100%;
        height: 1.4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .itemLeft {
            width: 85%;
            height: 100%;
            display: flex;
            align-items: center;

            .leftSpan {
                display: inline-block;
                width: 0.2rem;
                text-align: center;
            }

            div {
                p {
                    width: 4.54rem;
                    height: .4rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-weight: 700;
                }

                span {
                    font-weight: 400;
                    font-size: .24rem;
                    color: #999;
                }

                margin-left: 0.3rem;
            }
        }

        .itemRight {
            width: 20%;
            height: 100%;
            display: flex;
            // justify-content: space-between;
            align-items: center;
            position: relative;

            .icon {
                fill: #999;
            }

            .bofang {
                position: absolute;
                left: 0;
            }

            .liebiao {
                position: absolute;
                right: 0;
            }
        }
    }

    video {
        width: 100%;
    }
}
</style>
