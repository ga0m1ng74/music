<template>
    <div class="itemMusicList">
    <div class="itemListTop">
      <div class="listLeft">
        <!-- <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofanganniu"></use>
        </svg> -->
        <van-icon name="audio" class="icon" size="0.5rem"/>
        <span>List</span><span>(共{{ MusicList.length }}首)</span>
      </div>
      <div class="listRight">
        <!-- <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-aixin"></use>
        </svg> -->
        <van-icon name="like-o" class="icon" size="0.35rem" color="#fff"/>
        <span>({{ (subscribedCount/1000).toFixed(1) +'K' }})</span>
      </div>
    </div>
    <div class="itemList">
      <div class="item" v-for="(item, i) in MusicList" :key="i">
        <div class="itemLeft" @click="playMusic(i)">
          <span class="leftSpan">{{ i + 1 }}</span>
          <div>
            <p>{{ item.name }}</p>
            <span v-for="(item1, index) in item.ar||item.artists" :key="index">{{
              item1.name
            }}</span>
          </div>
        </div>
        <div class="itemRight">
          <!-- <svg class="icon bofang" aria-hidden="true" v-if='item.mv !=0'>
            <use xlink:href="#icon-shipin"></use>
          </svg> -->
          <van-icon name="video-o" size="0.5rem" class="icon bofang" @click="playVideo(item)" color="#1989fa" v-if='item.mv !=0'>
          </van-icon>
          <!-- <svg class="icon liebiao" aria-hidden="true">
            <use xlink:href="#icon-31liebiao"></use>
          </svg> -->
          <van-icon name="other-pay" class="icon liebiao" size="0.5rem" color="#999"/>
        </div>
      </div>
    </div>
    <van-popup v-model:show="show" closeable position="right" :style="{ padding: '1px' }" @click-close-icon="onClickCloseIcon">
      <video ref="video" :src="this.videoSrc" autoplay controls></video>
    </van-popup>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import {getMusicUrl,getMusicMV} from '@/request/api/item.js';
import { ref } from 'vue';
// import { showToast } from 'vant';
export default{
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
        videoSrc:'',
      }
    },
    props:['MusicList','subscribedCount'],
    methods: {
        ...mapMutations(['updatePlayList','updatePlayListIndex','updateMusicUrl']),
        async playMusic(i){
            this.updatePlayList(this.MusicList)
            this.updatePlayListIndex(i)
            try {
                let result = await getMusicUrl(this.MusicList[i].id)
                let url = result.data.data[0].url;
                this.updateMusicUrl(url);
            } catch (error) {
                alert('getMusicUrl err')
            }
        },
        async playVideo(item){
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
      videoSrc(){
        this.$refs.video.autoplay = true
      }
    },
}
</script>

<style lang="less" scoped>
.itemMusicList {
  width: 100%;
  height: 10rem;
  background-color: #fff;
  padding: 0 0.2rem;
  margin-top: 0.2rem;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  .itemListTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .listLeft {
      width: 2.5rem;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .icon {
        stroke: #333333;
        stroke-width: 20;
      }
      span {
        font-weight: 700;
        span {
          font-weight: 400;
          font-size: 0.24rem;
          color: #999;
        }
      }
    }
    .listRight {
      display: flex;
      align-items: center;
      background-color: red;
      padding: 0.2rem;
      border-radius: 0.4rem;
      color: #fff;
      .icon {
        width: 0.3rem;
        height: 0.3rem;
        fill: #fff;
        margin-right: 0.1rem;
        stroke: #fff;
        stroke-width: 50;
      }
    }
  }
  .itemList {
    width: 100%;
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
          span{
            font-weight: 400;
            font-size: .24rem;
            color: #999;
          }
          margin-left: 0.3rem;
        }
      }
      .itemRight{
        width: 20%;
        height: 100%;
        display: flex;
        // justify-content: space-between;
        align-items: center;
        position: relative;
        .icon{
          fill: #999;
        }
         .bofang{
            position: absolute;
            left: 0;
          }
         .liebiao{
            position: absolute;
            right: 0;
          }
      }
    }
  }
  video{
    width: 100%;
  }
}
</style>