<template>
  <div class="edit-address">
    <Group class="box1">
      <XInput placeholder='联系人姓名' :required='true' v-model="lianxiren" :show-clear='true' type='text'></XInput>
      <XInput placeholder='手机号' is-type='china-mobile' required v-model="phone" :show-clear='true'></XInput>
      <XInput placeholder='定位' :value="map_address" @on-focus='openMap'></XInput>
      <XInput placeholder='省、市、区' @click.stop.native="select_add" v-model="ssq" :readonly='true'>
        <i class="iconfont icon-jinru" slot="right"></i>
      </XInput>
      <XTextarea placeholder='详细地址' required v-model="addDetail"></XTextarea>
    </Group>
    <Group>
      <XInput placeholder='车辆牌照' v-model="paizhao" :show-clear='true'></XInput>
      <XInput placeholder='品牌车型' v-model="chexing" :show-clear='true'></XInput>
      <XInput placeholder='车辆颜色' v-model="color" :show-clear='true'></XInput>
      <XInput placeholder='车位' v-model="chewei" :show-clear='true'></XInput>
    </Group>
    <XButton type='warn' @click.native="save_add" :disabled='submiting' class="xbtn">保存地址</XButton>
    <XButton type='warn' @click.native="edit_add" class="xbtn" v-if="addressId">编辑地址</XButton>
    <CitySelect v-model="cityShow" :callback="finishSelectCity" :items="District"></CitySelect>
    <tx-map @finishAdd='finishAdd' v-if="showMap"></tx-map>
  </div>
</template>

<script>
  import map from '@/components/map/index';

  import {
    mapState,
    mapMutations
  } from 'vuex';
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
  import setTitle from '@/mixins/setTitle.js'
  export default {
    data() {
      return {
        cityShow: false,
        District,
        submiting: false,
        showMap:false,

        lianxiren: '',
        phone: '',
        map: {},
        ssq: '',
        addDetail: '',
        paizhao: '',
        chexing: '',
        color: '',
        chewei: ''
      }
    },
    created() {
      if (this.addressId) {
        this.get_old_info()
      }
      this.map = this.tx_map_info;
      console.log('123')
      console.log(this.map)

    },
    methods: {
      ...mapMutations(['SET_TX_MAP']),
      finishSelectCity(ret) {
        this.ssq = ret.itemName1 + ' ' + ret.itemName2 + ' ' + ret.itemName3;
      },
      save_add() {
        this.submiting = true;
        var _this = this;
        this.checkForm().then(res => {

          this.$axios.get( '/Api/Adress/add_adress', {
            params: this.params
          }).then(({
            data
          }) => {
            console.log(data)
            if (data.status == 1) {
              this.$vux.alert.show({
                title: '提示',
                content: data.msg,
                onHide() {
                  _this.SET_TX_MAP({});
                  _this.$router.go(-1)
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
          this.$axios.get( '/Api/Adress/edit_adress', {
            params: this.params
          }).then(({
            data
          }) => {
            console.log(data)
            if (data.status == 1) {
              this.$vux.alert.show({
                title: '提示',
                content: data.msg,
                onHide() {
                  _this.$router.go(-1)
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
      openMap() {
        // this.$router.push({
        //   path: '/map'
        // })
        this.showMap = true;
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
        this.$axios.get( '/Api/Adress/get_adress', {
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
          this.chewei = data[0].car_wei;
          if (data[0].map) {
            this.map = JSON.parse(data[0].map);
          } else {
            this.map = {}
          }
        })
      },
      finishAdd(map){
        this.showMap = false;
        this.map = map
      }
    },
    computed: {
      ...mapState(['tx_map_info']),
      addressId() {
        return this.$route.query.id;
      },
      params() {
        return {
          uid: this.id,
          id: this.addressId,
          name: this.lianxiren,
          phone: this.phone,
          three: this.ssq,
          adress: this.addDetail,
          car_card: this.paizhao,
          car_color: this.color,
          car_xing: this.chexing,
          car_wei: this.chewei,
          jd: this.map.latlng.lat,
          wd: this.map.latlng.lng,
          map: this.map
        };
      },
      map_address() {
        console.log('555')
        console.log(this.map)
        console.log(Object.keys(this.map).length)
        if (Object.keys(this.map).length > 0) {
          return this.map.poiaddress
        } else {
          return '';
        }
      },
      map_lat(){

      }
    },
    components: {
      Group,
      XInput,
      CitySelect,
      XTextarea,
      XButton,
      'tx-map':map
    },
    mixins: [checkLogin, setTitle]
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
