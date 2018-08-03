<template>
  <div class="add-yhj">
    <betterScroll>
      <!-- <bigTitle :title="faceId?'修改优惠券':'创建优惠券'" @showPopup='showPopup' class="bigtitle"></bigTitle> -->
      <bigTitle title="创建优惠券" @showPopup='showPopup' class="bigtitle"></bigTitle>

      <div class="form-box">
        <div class="input-box">
          <div class="input-wrapper">
            <Group class="reset-vux-input">
              <XInput v-model="yhj_name" placeholder='请输入优惠券名称'></XInput>
            </Group>
          </div>
          <div class="input-wrapper">
            <span class="label">面额：</span>
            <Group class="reset-vux-input">
              <XInput v-model="yhj_money" placeholder='请输入优惠券面额'></XInput>
            </Group>
          </div>
        </div>

        <div class="input-box">
          <div class="input-wrapper">
            <span class="label">类型：</span>
            <div class="type">
              <mu-radio color='#0fbd78' label="优惠券" v-model="type" :value='1'></mu-radio>
              <mu-radio color='#0fbd78' label="优惠券" v-model="type" :value='2'></mu-radio>
            </div>
          </div>
          <div class="input-wrapper">
            <span class="label">有效期：</span>
            <Group class="reset-vux-input">
              <XInput v-model="youxiaoqi" placeholder='请输入优惠券的有效期天数'></XInput>
            </Group>
          </div>
          <div class="input-wrapper">
            <span class="label">数量：</span>
            <div class="num">
              <mu-radio color='#0fbd78' label="" v-model="provide_type" :value='1'></mu-radio>
              <Group class="reset-vux-input">
                <XInput v-model="provide_num" placeholder='发放数量'></XInput>
              </Group>
            </div>
          </div>
          <div class="input-wrapper">
            <span class="label"></span>
            <div class="num">
              <mu-radio color='#0fbd78' label="" v-model="provide_type" :value='2'></mu-radio>
              <span>限每人一次领一张</span>
            </div>

          </div>
        </div>
        
        <div class="input-box">
          <div class="input-wrapper">
            <span class="label">条件:</span>
          </div>
          <div class="input-wrapper">
            <span class="label1"><mu-checkbox v-model="full_down" :value='1'  label='满减' color='#0fbd78'></mu-checkbox></span>
             <Group class="reset-vux-input">
              <XInput v-model="full_money" placeholder='总共多少钱'></XInput>
            </Group>
          </div>
          <div class="input-wrapper">
            <span class="label1"><mu-radio color='#0fbd78' label="指定类别" v-model="tiaojian1" :value='1'></mu-radio></span>
             <Group class="reset-vux-input">
              <!-- <Selector title='1' :options='two_class' :value-map="['id','fw_name']" v-model="two_class_val" @on-change='changeTwoClass'></Selector> -->
            </Group>
          </div>
          <div class="input-wrapper">
            <span class="label1"><mu-radio color='#0fbd78' label="指定服务" v-model="tiaojian1" :value='2'></mu-radio></span>
             <Group class="reset-vux-input">
              <!-- <Selector title='1' :options='two_class' :value-map="['id','fw_name']" v-model="two_class_val" @on-change='changeTwoClass'></Selector> -->
            </Group>
          </div>
        </div>

        <XButton type='warn' :disabled='submiting' >提交</XButton>

        
      </div>
    </betterScroll>
    <!-- <Popup v-model="alertShow" position='center'>
      <Group>
        <XInput v-model="tagVal"></XInput>
        <XButton @click.native='addTag' :mini='true' class="tag-btn">提交</XButton>
      </Group>
    </Popup> -->

  </div>
</template>

<script>
  import {
    Popup
  } from 'vue-ydui/dist/lib.px/popup';
  import betterScroll from '@/components/betterScroll';
  import bigTitle from "@/components/bigTitle/index";
  import wxConfig from "@/mixins/wxConfig.js";
  import {
    XInput,
    Group,
    XButton,
    Selector,
    Cell,
    
  } from "vux";
  import checkLogin from "@/mixins/checkLogin.js";
  import uploadImage from '@/components/uploadImg/index';

  export default {
    data() {
      return {
        submiting: false,
        alertShow: false,

        yhj_name: "",
        yhj_money: "",
        type: '',
        youxiaoqi:'',
        provide_type:'',
        provide_num:'',
        full_down:'',
        full_money:'',
        tiaojian:'',
        tiaojian1:'',
        tupian:''

      };
    },
    created() {
      var _this = this;
      this.$emit("showPopup", false);



    },
    methods: {
      showPopup(val) {
        this.$emit("showPopup", val);
      },

      checkForm() {
        var _this = this;
        console.log(1)
        return new Promise((resolve, reject) => {
          // if (!this.face_name) {
          //   _this.alertWarning("请填写门店名称！");
          //   reject();
          // } else if (!this.map) {
          //   _this.alertWarning("请选择门店位置！");
          //   reject();
          // } else if (!this.address) {
          //   _this.alertWarning("请填写详细地址！");
          //   reject();
          // } else if (!this.sqVal) {
          //   _this.alertWarning("请选择加盟社区！");
          //   reject();
          // } else {
          //   resolve()
          // }
        });
      },
      alertWarning(text) {
        this.$vux.alert.show({
          title: "提示",
          content: text
        });
      },

      uploadComplete(imgs) {
        this.tupian = imgs;
      }
    },
    components: {
      bigTitle,
      XInput,
      Group,
      XButton,
      Selector,
      Cell,
      betterScroll,
      Popup,
      uploadImage
    },
    computed: {

    },
    mixins: [checkLogin]
  };

</script>

<style lang='scss'>
  .add-yhj {
    height: 100%;
    .bigtitle {
      margin-bottom: $bot;
    }
    .input-box {
      border-bottom: 1px solid #f0f0f0;
      padding-top: .666667rem/* 50/75 */
      ;
    }
    .input-wrapper {
      display: flex;
      align-items: center;
      margin-bottom: .666667rem/* 50/75 */
      ;
      .label1,.label{
        display: flex;
        align-items: center;
        font-size: .373333rem/* 28/75 */
        ;
        flex: none;
      }
      .label1{
        width: 3.013333rem /* 226/75 */;
        .mu-radio{
          margin-right: .24rem /* 18/75 */;
        }
      }
      .label {
        width: 1.8rem/* 135/75 */
        ;
      }
      .reset-vux-input {
        flex: 1;
      }
      .type {
        display: flex;
        justify-content: space-between;
        .mu-radio {
          margin-right: 2rem/* 150/75 */
          ;
        }
      }
      .num {
        display: flex;
        align-items: center;
        .mu-radio {
          margin-right: .666667rem/* 50/75 */
          ;
        }
      }
    }

    .xbtn {
      margin-top: 0.666667rem;
    }
    .tag1 {
      padding-bottom: 1rem;
      border-bottom: 1px solid #f0f0f0;
      .mu-checkbox {
        margin-right: 1rem/* 75/75 */
        ;
      }
    }
    .tag2 {
      padding: .666667rem/* 50/75 */
      0;
    }
    .tag-btn {
      display: block;
      margin-top: .6rem/* 45/75 */
      ;
    }
  }

</style>
