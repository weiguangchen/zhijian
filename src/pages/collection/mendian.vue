<template>
  <div class="collect-md" @click="toDetail(md.face.id)">
    <img src="~img/shangpu/banner.png" alt="" class="img">
    <div class="info">
      <div class="info-warpper">
        <div class="title">
          <i class="iconfont icon-dianpu"></i>{{md.face.face_name}}</div>
      </div>
      <div class="arrow-box">
        <i class="iconfont icon-jinru"></i>
      </div>
    </div>
    <i class="iconfont icon-cha" @click.stop="deleteMd(md.id)"></i>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    props: {
      md: {
        default: {}
      },
      index: {
        default: ''
      }
    },
    methods: {
      deleteMd(id) {
        this.$axios.get(this.API_URL + '/Api/UserShow/user_dlike', {
          params: {
            id
          }
        }).then(({
          data
        }) => {
          console.log(data);
          if (data.status == 1) {
            this.$emit('deleteMd', this.index)
          }
        })
      },
      toDetail(id) {
        this.$router.push({
          path: '/shangpu/' + id
        })
      }
    },
    computed: {

    },
    components: {

    }
  }

</script>

<style lang='scss' scoped>
  .collect-md {
    background: #ffffff;
    display: flex;
    padding: .266667rem/* 20/75 */
    ;
    position: relative;
    box-shadow: 0 .08rem/* 6/75 */
    10px 4px rgba(#000000, .1);
    margin-bottom: .533333rem/* 40/75 */
    ;

    .img {
      width: 2.133333rem/* 160/75 */
      ;
      height: 2.133333rem/* 160/75 */
      ;
    }
    .info {
      padding: .266667rem/* 20/75 */
      0 0 .266667rem/* 20/75 */
      ;
      flex: 1;
      display: flex;
      .info-warpper {
        width: 4.133333rem/* 310/75 */
        ;
        flex: none;
        display: flex;
        align-items: center;
        .title {
          font-size: .32rem/* 24/75 */
          ;
          line-height: 1.6;
          display: flex;
          .iconfont {
            font-size: .32rem/* 24/75 */
            ;
            margin-right: .186667rem/* 14/75 */
            ;
          }
        }

      }
      .arrow-box {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #bcbab8;
      }
    }
    .icon-cha {
      font-size: .293333rem/* 22/75 */
      ;
      position: absolute;
      top: .266667rem/* 20/75 */
      ;
      right: .266667rem/* 20/75 */
      ;
      font-weight: bold;
    }
  }

</style>
