<template>
  <TopNav/>
  <SwiperTop/>
  <IconList/>
  <Musiclist/>
</template>

<script>
import TopNav from '@/components/Home/TopNav'
import SwiperTop from '@/components/Home/SwiperTop'
import IconList from '@/components/Home/IconList'
import Musiclist from '@/components/Home/MusicList'
export default {
  name: 'Home',
  components: {
    TopNav,SwiperTop,IconList,Musiclist
  }
}
</script>
