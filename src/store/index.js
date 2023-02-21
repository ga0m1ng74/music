import { createStore } from 'vuex'
import { getMusicLyric, } from '@/request/api/item.js'
export default createStore({
    state: {
        playList: [{
            al: {
                id: 32238076,
                pic: 7755955023322205,
                name: 'Sugar',
                picUrl: "http://p3.music.126.net/5lN3K6WArWxYwZ2h7og2QQ==/7755955023322205.jpg",
            },
            name: "Sugar",
            id: 32238076,
        }],
        playListIndex: 0,
        isBtnShow: true, //播放按钮的切换
        MusicUrl: 'http://m701.music.126.net/20230220093543/dda352df82f40d9be90568fb64c5c62b/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/19427543180/cfc3/3255/a072/11aec052bd9893dd6ca72e334906c6a5.mp3',
        detailShow: false, //歌曲详情页
        LyricRaw: {}, //歌词部分
        LyricTime: 0, //歌词时间同步
        Duration: 0, //某首歌曲的总时长
        isLogin: false, //是否登陆
        isFooterShow: true, //底部组件显示与否
    },
    mutations: {
        updateIsBtnShow(state, value) {
            state.isBtnShow = value
        },
        updatePlayList(state, value) {
            state.playList = value
        },
        updatePushPlayList(state, value) {
            state.playList.push(value)
        },
        updatePlayListIndex(state, value) {
            state.playListIndex = value
        },
        updateMusicUrl(state, value) {
            state.MusicUrl = value
        },
        updateDetailShow(state) {
            state.detailShow = !state.detailShow
        },
        updateMusicLyric(state, value) {
            state.LyricRaw = value
        },
        updateLyricTime(state, value) {
            state.LyricTime = value
        },
        updateDuration(state, value) {
            state.Duration = value
        }
    },
    actions: {
        //获取歌词lyric
        async getLyric(context, value) {
            try {
                let result = await getMusicLyric(value)
                context.commit('updateMusicLyric', result.data.lrc)

            } catch (error) {
                alert('getMusicLyric error')
            }
        }
    },
    modules: {}
})