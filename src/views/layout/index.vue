<template>
  <div class="layout-container">
    <router-view></router-view>
    <!-- 底部导航 -->
    <van-tabbar v-model="active" route>
    <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item to="/qa" icon="comment-o">问答</van-tabbar-item>
    <van-tabbar-item to="/video" icon="video-o">视频</van-tabbar-item>
    <van-tabbar-item to="/my" icon="manager-o">我的</van-tabbar-item>
  </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layoutIndex',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="less" scoped>

</style>
