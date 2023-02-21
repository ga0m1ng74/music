<template>
    <div>
        <ItemMusicTop :playList="state.playList"/>
        <ItemMusicList :MusicList="state.MusicList" :subscribedCount="state.playList.subscribedCount"/>
    </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { onMounted, reactive } from 'vue';
import { getMusicItemList ,getMusicList} from '@/request/api/item.js'
import ItemMusicTop from '@/components/Item/ItemMusicTop'
import ItemMusicList from '@/components/Item/ItemMusicList'
export default {
    
    setup() {
        const state = reactive({
            playList: {},
            MusicList:[],
        })

        onMounted(async () => {
            //根据路有跳转获取id
            let id = useRoute().query.id;
            try {
                let result = await getMusicItemList(id)
                let result1 = await getMusicList(id)
                
                state.playList = result.data.playlist
                state.MusicList = result1.data.songs
            } catch (error) {
                alert('getMusicItemList error')
            }
            //放置页面刷新数据丢失，把数据保存在session storage里
            sessionStorage.setItem('itemDetail',JSON.stringify(state))
        })

        return {state}
    },
    components:{
        ItemMusicTop,ItemMusicList,
    }
}
</script>