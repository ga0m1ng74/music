<template>
    <img :src="musicDetail.al.picUrl" alt="" class="bgImg">
    <div class="detailTop">
        <div class="detailTopLeft">
            <!-- <svg class="icon" aria-hidden="true" @click="backToLastPage">
                <use xlink:href="#icon-zuojiantou"></use>
            </svg> -->
            <van-icon name="revoke" class="icon" color="#9ff" size="0.5rem" @click="backToLastPage"/>
            <div class="leftMarquee">

                <Vue3Marquee style="color:#fff">
                    {{ musicDetail.name }}
                </Vue3Marquee>
                <span v-for="(item) in musicDetail.ar" :key="item">{{ item.name }}</span>
                <!-- <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-youjiantou1"></use>
                </svg> -->
                <van-icon name="arrow" class="icon" color="#9ff" size="0.25rem"/>
            </div>
        </div>

        <div class="detailTopRight">
            <!-- <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fenxiang"></use>
            </svg> -->
            <van-icon name="link-o" color="#fff" class="icon" size="0.5rem"/>
        </div>
    </div>
    <div class="detaiContent" v-show="!isLyricShow" @click="isLyricShow=true">
        <img src="@/assets/needle.png" alt="" class="needle" :class="{ needle_active: !isBtnShow }">
        <img src="@/assets/cd.png" alt="" class="cd">
        <img :src="musicDetail.al.picUrl" alt="" class="img_ar"
            :class="{ img_ar_paused: isBtnShow, img_ar_active: !isBtnShow }">
    </div>
    <div class="MusicLyric" ref="MusicLyricList" v-show="isLyricShow">
        <p v-for="item in Lyric" :key="item" 
        :class="{active:(LyricTime*1000>=item.time && LyricTime*1000<item.pre)}"
        ref="test"
        >
            {{ item.lrc }}
        </p>
    </div>
    <div class="detailFooter">
        <div class="footerTop">
            <!-- <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-aixin"></use>
            </svg> -->
            <!-- <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-iconfontzhizuobiaozhun023146"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yinlechangpian"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-iconfontzhizuobiaozhun023110"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-liebiao-"></use>
            </svg> -->
        </div>
        <div class="footerMiddle">
            <input type="range" class="range" min="0" :max="Duration" v-model="LyricTime" step="0.1">
        </div>
        <div class="footerBottom">
            <!-- <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xunhuan"></use>
            </svg> -->
            <van-icon name="replay" class="icon" color="#fff" size="0.5rem"/>
            <!-- <svg class="icon" aria-hidden="true" @click="changeMusicList(-1)">
                <use xlink:href="#icon-shangyishoushangyige"></use>
            </svg> -->
            <van-icon name="arrow-left" class="icon" color="#fff" size="0.5rem" @click="changeMusicList(-1)"/>
            <!-- <svg class="icon" aria-hidden="true" v-if="isBtnShow" :style="{ height: '0.7rem', width: '0.7rem' }"
                @click="play">
                <use xlink:href="#icon-bofang1"></use>
            </svg> -->
            <van-icon name="play-circle-o" class="icon" size="0.8rem" color="#fff" v-if="isBtnShow" :style="{ height: '0.7rem', width: '0.7rem' }" @click="play"/>
            <!-- <svg class="icon" aria-hidden="true" v-else :style="{ height: '0.7rem', width: '0.7rem' }" @click="play">
                <use xlink:href="#icon-zanting"></use>
            </svg> -->
            <van-icon name="pause-circle-o" class="icon" size="0.8rem" color="#fff" v-else :style="{ height: '0.7rem', width: '0.7rem' }" @click="play"/>

            <!-- <svg class="icon" aria-hidden="true" @click="changeMusicList(1)">
                <use xlink:href="#icon-xiayigexiayishou"></use>
            </svg> -->
            <van-icon name="arrow" class="icon" color="#fff" size="0.5rem" @click="changeMusicList(1)"/>
            <!-- <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zu"></use>
            </svg> -->
            <van-icon name="chat-o" class="icon" color="#fff" size="0.5rem"/>
        </div>
    </div>
</template>

<script>
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import { mapMutations, mapState } from 'vuex';
import {getMusicUrl} from '@/request/api/item.js'
export default {
    data() {
        return {
            isLyricShow: false,
        }
    },
    props: ['musicDetail', 'isBtnShow', 'play','addDuration'],
    components: { Vue3Marquee },
    computed: {
        ...mapState(['LyricRaw','LyricTime','playListIndex','playList','Duration']),
        Lyric() {
            let arr;
            if (this.LyricRaw.lyric) {
                arr = this.LyricRaw.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
                    let min = item.slice(1, 3)
                    let sec = item.slice(4, 6)
                    let msec = item.slice(7, 9)
                    let lrc = item.slice(item.indexOf(']')+1, item.length)
                    let time = parseInt(min)*60*1000+parseInt(sec)*1000+ parseInt(msec);
                    return { min, sec, msec, lrc ,time}
                })
                arr.forEach((item,i) => {
                    if(i===arr.length-1){
                        item.pre=0;
                    }else{
                        item.pre = arr[i+1].time
                    }
                });
            }
            return arr
        }
    },
    methods: {
        ...mapMutations(['updateDetailShow','updatePlayListIndex','updateMusicUrl']),
        backToLastPage(){
            if(this.isLyricShow){
                this.isLyricShow = false
            }
            else{
                this.updateDetailShow()
            }
        },
        async changeMusicList(i){
            let number = this.playListIndex+i
            if(number<0){
                //循环跳转
                number = this.playList.length-1
            }else if(number >= this.playList.length){
                number = 0
            }
            this.updatePlayListIndex(number)
            try {
                let result = await getMusicUrl(this.playList[number].id)
                let url = result.data.data[0].url;
                this.updateMusicUrl(url);
            } catch (error) {
                alert('getMusicUrl err')
            }
        }
    },
    mounted() {
        this.addDuration()
    },
    
    watch: {
        LyricTime:function(newValue){
            let activeElement
            this.$refs.test.forEach(element => {
                if (element.classList.contains('active')) {
                    activeElement = element
                    return
                }
            })
            if(activeElement&&activeElement.offsetTop>280){
                this.$refs.MusicLyricList.scrollTop = activeElement.offsetTop-280;
            }
            if(newValue===this.Duration){
                this.changeMusicList(1)
            }
        }
    },
}
</script>

<style lang="less" scoped>
.bgImg {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    filter: blur(20px);
}

.detailTop {
    width: 100%;
    height: 1rem;
    display: flex;
    padding: 0.2rem;
    justify-content: space-between;
    align-items: center;
    fill: #fff;

    .detailTopLeft {
        display: flex;
        align-items: center;

        .leftMarquee {
            width: 3rem;
            height: 100%;
            margin-left: 0.4rem;

            span {
                color: #9ff;
            }

            .icon {
                width: 0.3rem;
                height: 0.3rem;
                fill: #999;
            }
        }
    }
}

.detaiContent {
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    .needle {
        width: 2rem;
        height: 3rem;
        position: absolute;
        left: 46%;
        transform-origin: 0 0;
        transform: rotate(-13deg);
        transition: all 2s;
    }

    .needle_active {
        width: 2rem;
        height: 3rem;
        position: absolute;
        left: 46%;
        transform-origin: 0 0;
        transform: rotate(7deg);
        transition: all 2s;
    }

    .cd {
        width: 5rem;
        height: 5rem;
        position: absolute;
        bottom: 1.8rem;
        z-index: -1;
    }

    .img_ar {
        width: 3.2rem;
        height: 3.2rem;
        border-radius: 50%;
        position: absolute;
        bottom: 2.7rem;
        animation: rotate_ar 15s linear infinite;
    }

    .img_ar_active {
        animation-play-state: running;
    }

    .img_ar_paused {
        animation-play-state: paused;
    }

    @keyframes rotate_ar {
        0% {
            transform: rotateZ(0deg);
        }

        100% {
            transform: rotateZ(360deg);
        }
    }
}

.detailFooter {
    width: 100%;
    height: 3rem;
    position: absolute;
    bottom: 0.2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .footerTop {
        widows: 100%;
        height: 1rem;
        display: flex;
        justify-content: space-around;
        align-items: center;

        .icon {
            width: 0.36rem;
            height: 0.36rem;
            fill: #fff
        }
    }
    .footerMiddle{
        .range{
            width: 100%;
            height: 0.6rem;
            
        }
    }

    .footerBottom {
        widows: 100%;
        height: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-evenly;

        .icon {
            width: 0.36rem;
            height: 0.36rem;
            fill: #fff
        }
    }
}

.MusicLyric {
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 0.2rem;
    overflow: scroll;

    p {
        color: #fff;
        margin-bottom: 0.4rem;
    }
    .active{
        color:#9ff;
        font-size: .6rem;
    }
}
</style>