<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <!-- <router-view :key="key"></router-view> -->
      <div class="input_position">
        <div class="common_wrap">

          <router-view></router-view>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  position: relative;
  overflow: hidden;
  background: rgb(230, 235, 244);
}
.input_position {
  margin: 20px;
}
.common_wrap {
  background: #f9fdfa;
  height: 100%;
  min-height: calc(100vh - 90px);
  padding-top: 60px;
  text-align: center;
  padding-bottom: 20px;
  box-shadow: 0 2px 2px rgba(158, 163, 173, 0.3);
}
</style>
