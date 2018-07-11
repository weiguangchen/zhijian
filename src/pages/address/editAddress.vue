<template>
  <div class="edit-address">
    <Group class="box1">
      <XInput placeholder='联系人姓名' :required='true' v-model="lianxiren" :show-clear='true' type='text'></XInput>
      <XInput placeholder='手机号' is-type='china-mobile' required v-model="phone" :show-clear='true'></XInput>
      <XInput placeholder='省、市、区' @click.stop.native="select_add" v-model="ssq" :readonly='true'>
        <i class="iconfont icon-jinru" slot="right"></i>
      </XInput>
      <XTextarea placeholder='详细地址' required v-model="addDetail"></XTextarea>
    </Group>
    <Group>
      <XInput placeholder='车辆牌照' v-model="paizhao" :show-clear='true'></XInput>
      <XInput placeholder='品牌车型' v-model="chexing" :show-clear='true'></XInput>
      <XInput placeholder='车辆颜色' v-model="color" :show-clear='true'></XInput>
    </Group>
    <XButton type='warn' @click.native="save_add" :disabled='submiting' class="xbtn">保存地址</XButton>
    <XButton type='warn' @click.native="edit_add" class="xbtn" v-if="addressId">编辑地址</XButton>
    <CitySelect v-model="cityShow" :callback="finishSelectCity" :items="District"></CitySelect>
  </div>
</template>

<script>
  import {
    XInput,
    Group,
    XTextarea,
    XButton
  } from 'vux'
  import {
    CitySelect
  } from "vue-ydui/dist/lib.px/cityselect";
  import District from "ydui-district/dist/jd_province_city_area_id";
  import 'vue-ydui/dist/ydui.base.css';
  import checkLogin from "@/mixins/checkLogin.js";
  export default {
    data() {
      return {
        cityShow: false,
        District,
        submiting: false,

        lianxiren: '',
        phone: '',
        ssq: '',
        addDetail: '',
        paizhao: '',
        chexing: '',
        color: ''
      }
    },
    created() {
      if (this.addressId) {
        this.get_old_info()
      }
    },
    methods: {
      finishSelectCity(ret) {
        this.ssq = ret.itemName1 + ' ' + ret.itemName2 + ' ' + ret.itemName3;
      },
      save_add() {
        this.submiting = true;
        var _this = this;
        this.checkForm().then(res => {
          var params = {
            uid: this.id,
            name: this.lianxiren,
            phone: this.phone,
            three: this.ssq,
            adress: this.addDetail,
            car_card: this.paizhao,
            car_color: this.color,
            car_xing: this.chexing
          };
          console.log(params)
          this.$axios.get(this.API_URL + '/Api/Adress/add_adress', {
            params
          }).then(({
            data
          }) => {
            console.log(data)
            if (data.status == 1) {
              this.$vux.alert.show({
                title: '提示',
                content: data.msg,
                onHide() {
                  _this.$router.replace({
                    path: '/addressList'
                  })
                }
              })
            }
          }, err => {
            this.submiting = false;
          })
        }, err => {
          this.submiting = false;

        })

      },
      edit_add() {
        var _this = this;
        this.checkForm().then(res => {
          var params = {
            uid: this.id,
            id: this.addressId,
            name: this.lianxiren,
            phone: this.phone,
            three: this.ssq,
            adress: this.addDetail,
            car_card: this.paizhao,
            car_color: this.color,
            car_xing: this.chexing
          };
          console.log(params)
          this.$axios.get(this.API_URL + '/Api/Adress/edit_adress', {
            params
          }).then(({
            data
          }) => {
            console.log(data)
            if (data.status == 1) {
              this.$vux.alert.show({
                title: '提示',
                content: data.msg,
                onHide() {
                  _this.$router.replace({
                    path: '/addressList'
                  })
                }
              })
            }
          })
        })
      },
      checkForm() {
        return new Promise((resolve, reject) => {
          if (!this.lianxiren) {
            this.alertTip('请输入联系人姓名');
            reject();
          } else if (!this.phone) {
            this.alertTip('请输入手机号')
            reject();
          } else if (!this.ssq) {
            this.alertTip('请选择省市区')
            reject();
          } else if (!this.addDetail) {
            this.alertTip('请输入详细地址')
            reject();
          } else {
            resolve();
          }
        })

      },
      alertTip(text) {
        this.$vux.alert.show({
          title: '提示',
          content: text
        })
      },
      select_add() {
        console.log(1)
        this.cityShow = true;
      },
      get_old_info() {
        this.$axios.get(this.API_URL + '/Api/Adress/get_adress', {
          params: {
            uid: this.id,
            id: this.addressId
          }
        }).then(({
          data
        }) => {
          console.log(data)
          this.lianxiren = data[0].name;
          this.phone = data[0].phone;
          this.ssq = data[0].three;
          this.addDetail = data[0].adress;
          this.paizhao = data[0].car_card;
          this.chexing = data[0].car_xing;
          this.color = data[0].car_color;
        })
      }
    },
    computed: {
      addressId() {
        return this.$route.query.id;
      }
    },
    components: {
      Group,
      XInput,
      CitySelect,
      XTextarea,
      XButton
    },
    mixins: [checkLogin]
  }

</script>

<style lang='scss'>
  .edit-address {
    height: 100%;
    position: relative;
    background: #f0f0ff;
    .box1 {
      margin-bottom: .4rem/* 30/75 */
      ;
    }
    .weui-cells {
      margin-top: 0;
    }
    .xbtn {
      position: absolute;
      left: 0;
      bottom: 0;
      border-radius: 0;
      &:after {
        border-radius: 0;
      }
    }
  }

</style>
