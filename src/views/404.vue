<template>
  <div class="wscn-http404-container">
    <div class="wscn-http404">
      <div class="pic-404">
        <img class="pic-404__parent" :src="img_404" alt="404">
        <div class="message">{{ message }}</div>
        <div class="backhome">
          <svg-icon icon-class="home"></svg-icon>
          <a href class="bullshit__return-home">返回首页</a>
        </div>
      </div>
      <!-- <div class="bullshit"> -->
      <!-- <div class="bullshit__oops">OOPS!</div>
        <div class="bullshit__info">版权所有
          <a class='link-type' href='https://wallstreetcn.com' target='_blank'>华尔街见闻</a>
        </div>
        <div class="bullshit__headline">{{ message }}</div>
        <div class="bullshit__info">请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告</div>
      <a href="" class="bullshit__return-home">返回首页</a>-->
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import img_404 from '@/assets/404_images/404.png'
export default {
  name: 'page404',
  data() {
    return {
      img_404,
      message: 'Sorry！您访问的地址有误或者页面不存在~' // '网管说这个页面你不能进......
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.wscn-http404-container {
  transform: translate(-50%, -50%);
  position: absolute;
  top: 40%;
  left: 50%;

  .wscn-http404 {
    .pic-404 {
      width: 640px;
      height: 320px;

      img {
        width: 100%;
        border-radius: 10px;
        height: auto;
      }
    }

    .message {
      position: relative;
      top: -45%;
      left: 40%;
    }

    .backhome {
      position: relative;
      top: -40%;
      left: 40%;
      width: 120px;
      height: 36px;
      background: rgba(71, 84, 119, 1);
      line-height: 36px;
      color: white;
      padding: 0 8px;

      a {
        padding-left: 8px;
      }
    }
  }
}
</style>
