<template>
  <div class="add-yhj">
    <betterScroll>
      <bigTitle :title="yhjId?'修改优惠券':'创建优惠券'" @showPopup='showPopup' class="bigtitle" :icon='false'></bigTitle>

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
              <XInput v-model.number="yhj_money" placeholder='请输入优惠券面额'></XInput>
            </Group>
          </div>
        </div>

        <div class="input-box">
          <div class="input-wrapper">
            <span class="label">满减：</span>
            <Group class="reset-vux-input">
              <XInput v-model.number="full_money" placeholder='请输入满足条件金额(限本店)'></XInput>
            </Group>
          </div>
          <div class="input-wrapper">
            <span class="label">有效期：</span>
            <Group class="reset-vux-input">
              <XInput v-model.number="youxiaoqi" placeholder='请输入优惠券的有效期天数'></XInput>
            </Group>
          </div>
          <div class="input-wrapper">
            <span class="label">数量：</span>
            <div class="num">
              <mu-radio color='#0fbd78' label="" v-model="provide_type" :value='2'></mu-radio>
              <Group class="reset-vux-input">
                <XInput v-model.number="provide_num" placeholder='发放数量' :disabled='provide_type != 2'></XInput>

              </Group>
            </div>
          </div>
          <div class="input-wrapper">
            <span class="label"></span>
            <div class="num">
              <mu-radio color='#0fbd78' label="" v-model="provide_type" :value='1'></mu-radio>
              <span>限每人一次领一张</span>
            </div>
          </div>
        </div>

        <div class="input-box">
          <div class="input-wrapper">
            <span class="label">条件:</span>
          </div>
          <div class="input-wrapper">
            <span class="label1">
              <mu-radio color='#0fbd78' label="店铺通用" v-model="tiaojian" :value='3'></mu-radio>
            </span>
          </div>
          <div class="input-wrapper">
            <span class="label1">
              <mu-radio color='#0fbd78' label="指定类别" v-model="tiaojian" :value='1'></mu-radio>
            </span>
            <Group class="reset-vux-input">
              <Selector title='1' :options='all_class' v-model="class_val"></Selector>
            </Group>
          </div>
          <div class="input-wrapper">
            <span class="label1">
              <mu-radio color='#0fbd78' label="指定服务" v-model="tiaojian" :value='2'></mu-radio>
            </span>
            <Group class="reset-vux-input">
              <Selector title='1' :options='fwList' :value-map="['shop_fw_id','fw_mingzi']" v-model="fw_val"></Selector>
            </Group>
          </div>
        </div>
        <XButton type='warn' :disabled='submiting' @click.native='submit'>提交</XButton>


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
  import JKeyboard from 'better-keyboard'
  import isInteger from 'is-integer';
  export default {
    data() {
      return {
        submiting: false,
        alertShow: false,
        all_class: [],
        fwList: [],
        faceList:[],

        yhj_name: "",
        yhj_money: "",
        type: '',
        youxiaoqi: '',
        provide_type: '',
        provide_num: '',
        full_money: '',
        tiaojian: '',
        class_val: '',
        fw_val: '',
      };
    },
    created() {
      var _this = this;
      this.$emit("showPopup", false);

      this.get_fw_class();
      this.get_fw();
      this.get_face();
      if (this.yhjId) {
        this.get_old_info();
      }
    },

    methods: {
      showPopup(val) {
        this.$emit("showPopup", val);
      },
      submit() {
        var _this = this;
        this.submiting = true;
        this.checkForm().then(() => {

          if (this.yhjId) {
            // 编辑
            var params = Object.assign({}, this.params, {
              id: this.yhjId
            })
            this.$axios.get('/Api/Yhq/yhq_edit', {
              params
            }).then(({
              data
            }) => {
              this.submiting = false;
              console.log(data)
              _this.$vux.alert.show({
                title: '提示',
                content: '修改优惠券成功！',
                onHide() {
                  _this.$router.push({
                    path: '/shanghu/jingying/yhjHandle'
                  })
                }
              })
            })
          } else {
            // 新增
            this.$axios.get('/Api/Yhq/add_yhq', {
              params: this.params
            }).then(({
              data
            }) => {
              this.submiting = false;
              console.log(data)
              _this.$vux.alert.show({
                title: '提示',
                content: '添加优惠券成功！',
                onHide() {
                  _this.$router.push({
                    path: '/shanghu/jingying/yhjHandle'
                  })
                }
              })
            })
          }

        }, () => {
          this.submiting = false;
        })

      },
      checkForm() {
        var _this = this;
        return new Promise((resolve, reject) => {
          if (!this.yhj_name) {
            _this.alertWarning("请填写优惠券名称！");
            reject();
          } else if (!this.yhj_money) {
            _this.alertWarning("请输入优惠券面额！");
            reject();
          } else if (!this.isMoney(this.yhj_money)) {
            _this.alertWarning("优惠券面额应为纯数字！");
            reject();
          } else if (!this.full_money) {
            _this.alertWarning("请填写满减金额！");
            reject();
          } else if (!this.isMoney(this.full_money)) {
            _this.alertWarning("满减金额格式有误！");
            reject();
          } else if (!this.youxiaoqi) {
            _this.alertWarning("请填写有效期！");
            reject();
          } else if (!isInteger(this.youxiaoqi)) {
            _this.alertWarning("有效期必须为整数！");
            reject();
          } else if (!this.provide_type) {
            _this.alertWarning("请选择优惠券发放方式！");
            reject();
          } else if (this.provide_type === 2 && !isInteger(this.provide_num)) {
            _this.alertWarning("请填写正确发放数量");
            reject();
          } else if (!this.tiaojian) {
            _this.alertWarning("请选择使用条件！");
            reject();
          } else if (this.tiaojian === 1 && !this.class_val) {
            _this.alertWarning("请选择指定类别！");
            reject();
          } else if (this.tiaojian === 2 && !this.fw_val) {
            _this.alertWarning("请选择指定服务！");
            reject();
          } else {
            resolve()
          }
        });
      },
      alertWarning(text) {
        this.$vux.alert.show({
          title: "提示",
          content: text
        });
      },
      get_fw_class() {
        this.$axios.get('/api/ShopFw/shop_fw', {
          params: {
            shop_id: this.userinfo.shop[0].id,
            phone: this.userinfo.uphone
          }
        }).then(({
          data
        }) => {
          console.log(data)
          var fwclass = [],
            fw = [];
          data.fw.map(m => {
            var obj = {};
            obj.value = m.fw_name;
            obj.key = m.id;
            fw.push(obj);
          })

          this.all_class = fw;
        })
      },
      get_fw() {
        var _this = this;
        this.$axios
          .get("/Api/ShopFw/fw_list", {
            params: {
              shop_id: this.userinfo.shop[0].id
            }
          })
          .then(({
            data
          }) => {
            console.log(data);
            this.fwList = data;
          });
      },
      get_face() {
        this.$axios
          .get("/Api/Shop/get_face", {
            params: {
              shop_id: this.userinfo.shop[0].id, //商户id
              phone: this.userinfo.uphone
            }
          })
          .then(({
            data
          }) => {
            console.log(data);
            this.faceList = data;
          });
      },
      uploadComplete(imgs) {
        this.tupian = imgs;
      },
      isMoney(s) {
        var regu = "^[0-9]+[\.][0-9]{0,3}|[0-9]+$";
        var re = new RegExp(regu);
        if (re.test(s)) {
          return true;
        } else {
          return false;
        }

      },
      get_old_info() {
        this.$axios.get('/Api/Yhq/edit_yhq', {
          params: {
            id: this.yhjId
          }
        }).then(({
          data
        }) => {
          console.log(data)
          this.yhj_name = data.yh_name;
          this.yhj_money = data.yh_money;
          this.youxiaoqi = data.yes_day;
          this.provide_type = parseInt(data.yh_num_status);
          this.provide_num = data.yh_num;
          this.full_money = data.man_jian;
          this.tiaojian = parseInt(data.yh_status);
          this.class_val = data.yh_class_id;
          this.fw_val = data.yh_fw_id;
        })
      },

    },

    computed: {
      params() {
        return {
          yh_name: this.yhj_name,
          yh_money: this.yhj_money,
          yes_day: this.youxiaoqi,
          yh_num: this.provide_num,
          yh_num_status: this.provide_type,
          yh_status: this.tiaojian,
          yh_class_id: this.class_val,
          yh_fw_id: this.fw_val,
          man_jian: this.full_money,
          shop_id: this.userinfo.shop[0].id,
          face_id:this.faceList[0].id
        }
      },
      yhjId() {
        return this.$route.query.id
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
      uploadImage,
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
      .label1,
      .label {
        display: flex;
        align-items: center;
        font-size: .373333rem/* 28/75 */
        ;
        flex: none;
      }
      .label1 {
        width: 3.013333rem/* 226/75 */
        ;
        .mu-radio {
          margin-right: .24rem/* 18/75 */
          ;
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
    .weui-label {
      width: 1px;
      visibility: hidden;
    }
  }

</style>
