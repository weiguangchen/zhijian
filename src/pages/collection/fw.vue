<template>
  <div class="collect-hd" @click="toDetail(fw.fw.shop_fw_id,fw.face.id)">
    <img :src="fw.fw.fw_img" alt="" class="img">
    <div class="info">
      <div class="info-warpper">
        <div class="title">{{fw.fw.fw_mingzi}}</div>
        <span>
          <em>{{fw.fw.money}}</em>元/{{fw.fw.fw_gg}}</span>
      </div>
      <div class="arrow-box">
        <i class="iconfont icon-jinru"></i>
      </div>
    </div>
    <i class="iconfont icon-cha" @click.stop="deleteFw(fw.id)"></i>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    props: {
      fw: {
        default: {}
      },
      index:{
        default:''
      }
    },
    methods: {
      deleteFw(id) {
        this.$axios.get( '/Api/UserShow/user_dlike', {
          params: {
            id
          }
        }).then(({
          data
        }) => {
          console.log(data);
          if (data.status == 1) {
            this.$emit('deleteFw',this.index)
          } 
        })
      },
      toDetail(fwId,faceId){
        this.$router.push({
          path:'/serviceDetail/'+fwId+'/'+faceId
        })
      }
    },  
    components: {

    }
  }

</script>

<style lang='scss' scoped>
  .collect-hd {
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
      flex: 1;
      display: flex;

      padding: .266667rem/* 20/75 */
      0 0 .266667rem/* 20/75 */
      ;
      .info-warpper {
        width: 4.133333rem/* 310/75 */
        ;
        flex: none;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title {
          font-size: .32rem/* 24/75 */
          ;
          line-height: 1.6;
        }
        em {
          font-size: .48rem/* 36/75 */
          ;
          color: #dd3434;
          font-weight: bold;
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
