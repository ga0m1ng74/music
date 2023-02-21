<template>
    <div class="FooterMusic">
        <div class="footerLeft" @click="updateDetailShow()">
            <img :src="playList[playListIndex].al.picUrl" alt="">
            <div>
                <p>{{playList[playListIndex].name}}</p>
                <span>Touch and view</span>
            </div>
        </div>
        <div class="footRight">
            <!-- <svg class="icon" aria-hidden="true" @click="play" v-if="isBtnShow">
            <use xlink:href="#icon-bofanganniu" ></use>
            </svg> -->
            <van-icon name="play-circle" class="icon" color="#999" size="0.7rem" @click="play" v-if="isBtnShow"/>
            <!-- <svg class="icon" aria-hidden="true" @click="play" v-else>
            <use xlink:href="#icon-weibiaoti--"></use>
            </svg> -->
            <van-icon name="pause-circle" class="icon" color="#999" size="0.7rem" @click="play" v-else/>
            <!-- <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-zu"></use>
            </svg> -->
        </div>
        <audio ref="audio" :src="MusicUrl" @timeupdate="updatePlayerTime"></audio>
        <van-popup v-model:show="detailShow" round position="bottom" :style="{ height: '100%' }">
            <DetailMusic :musicDetail="playList[playListIndex]" :play="play" :isBtnShow="isBtnShow" :addDuration="addDuration"/>
        </van-popup>
    </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import DetailMusic from '@/components/Item/DetailMusic.vue'
export default {
    setup(props) {
        
    },
    components:{DetailMusic,},
    computed: {
        ...mapState(['playList','playListIndex','isBtnShow','MusicUrl','detailShow']),
        
    },
    methods: {
        ...mapMutations(['updateIsBtnShow','updateDetailShow','updateLyricTime','updateDuration']),
        play(){
            if(this.$refs.audio.paused){
                
                this.$refs.audio.play()
                this.updateIsBtnShow(false)
            }else{
                
                this.$refs.audio.pause()
                this.updateIsBtnShow(true)
            }
        },
        updatePlayerTime(){
            this.updateLyricTime(this.$refs.audio.currentTime)
        },
        addDuration(){
            this.updateDuration(this.$refs.audio.duration)
        }
    },
    watch: {
        //监听URL有没有发生改变
        MusicUrl:function(){
            this.$refs.audio.autoplay = true
            if(this.$refs.audio.paused){//改变播放按钮
                this.updateIsBtnShow(false)
            }
        },
    },
    updated() {
        this.$store.dispatch('getLyric',this.playList[this.playListIndex].id)
        this.addDuration()
    },
    
}
</script>

<style lang="less" scoped>
    .FooterMusic{
        width: 100%;
        height: 1.4rem;
        padding: 0.2rem;
        background-color: #fff;
        position: fixed;
        bottom: 0;
        border-top: 1px solid #999;
        display: flex;
        justify-content: space-between;
        .footerLeft{
            width: 60%;
            height: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            span{
                font-weight: 100;
            }
            img{
                width: 1rem;
                height: 1rem;
                border-radius: 50%;
            }
        }
        .footRight{
            width: 20%;
            height: 100%;
            align-items: center;
            display: flex;
            justify-content: space-around;
            .icon{
                width: 0.6rem;
                height: 0.6rem;
            }
        }
    }

</style>