<template>
  <div class="dashboard-container">
    <img src="../../../static/img/index.png" style="width: 100%;" />
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  components: {
  },
  data() {
    return {
    }
  },
  methods: {
  },
  created() {

  },
  computed: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-container {
  width: 100%;
  margin-top: -60px;
  margin-bottom: -23px;
  .title {
    width: 98%;
    margin: 0 auto;
    .name {
      font-size: 24px;
      width: 15%;
    }
    .line {
      display: inline-block;
      height: 3px;
      width: 85%;
      background: #aaa;
      position: relative;
      top: -8px;
      left: 8px;
    }
  }

  .appName {
    letter-spacing: 12px;
  }
  .logo {
    width: 120px;
    height: 120px;
    background: url("../../../static/img/LOGO_120.png") no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    margin: 0 auto;
  }
}
</style>
