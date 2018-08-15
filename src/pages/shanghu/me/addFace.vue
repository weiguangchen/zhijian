<template>
  <div class="add-face">
    <betterScroll>
      <bigTitle title='修改门店' @showPopup='showPopup' v-if="faceId"></bigTitle>
      <bigTitle title='添加门店' @showPopup='showPopup' v-else></bigTitle>
      <div class="form-box">
        <h2 class="sub-title">门店名称:</h2>
        <Group class="reset-vux-input">
          <XInput v-model="face_name"></XInput>
        </Group>
        <h2 class="sub-title">门店位置:</h2>
        <Group class="reset-vux-input">
          <XInput v-model="map.poiaddress" @click.native='selectAdd'></XInput>
        </Group>
        <h2 class="sub-title">详细地址:</h2>
        <Group class="reset-vux-input">
          <XInput v-model="address"></XInput>
        </Group>
        <h2 class="sub-title">门店联系电话：</h2>
        <Group class="reset-vux-input">
          <XInput v-model="face_phone"></XInput>
        </Group>
        <h2 class="sub-title">标签:</h2>
        <div>
          <div class="tag1">
            <mu-checkbox value='WIFI' v-model="tag1" label='WIFI' color='#e03233'></mu-checkbox>
            <mu-checkbox value='刷卡' v-model="tag1" label='刷卡' color='#e03233'></mu-checkbox>
            <mu-checkbox value='手机支付' v-model="tag1" label='手机支付' color='#e03233'></mu-checkbox>
          </div>
          <div class="tag2">
            <iview-tag closable v-for="(item,index) in tag2" :key="index" :name='item' @on-close='delTag'>{{item}}</iview-tag>
            <iview-button type="dashed" size="small" @click="showAddTag">添加标签</iview-button>
          </div>
        </div>
        <h2 class="sub-title">营业时间:</h2>
        <div>
          <Selector :options='date_list' title='开始日期' direction='rtl' v-model='start_day'></Selector>
          <Selector :options='date_list' title='结束日期' direction='rtl' v-model='end_day'></Selector>
          <Datetime format='HH:mm' title='开始营业时间' v-model="start_time"></Datetime>
          <Datetime format='HH:mm' title='开始营业时间' v-model="end_time"></Datetime>
        </div>
        <Group>
          <Cell title='加盟城市' v-model="cityKey"></Cell>
          <Cell title='加盟区域' v-model="qyKey"></Cell>
          <Selector :options='sqList' title='加盟社区' :value-map="['id','sq_name']" direction='rtl' @on-change='changeSq' v-model='sqVal'></Selector>
        </Group>
        <h2 class="sub-title">门店图片：</h2>
        <uploadImage @uploadComplete='uploadComplete' :multiple='false' :oldImgs='tupian' v-if="tupian.length>0"></uploadImage>
        <myMap v-show="mapShow" @finishAdd='finishAdd'></myMap>
        <XButton type='warn' class="xbtn" @click.native='add_face' v-if="!faceId" :disabled='submiting'>增加门店</XButton>
        <XButton type='warn' class="xbtn" @click.native='change_face' v-else :disabled='submiting'>提交修改</XButton>
      </div>
    </betterScroll>
    <Popup v-model="alertShow" position='center'>
      <Group>
        <XInput v-model="tagVal"></XInput>
        <XButton @click.native='addTag' :mini='true' class="tag-btn">提交</XButton>
      </Group>
    </Popup>

  </div>
</template>

<script>
  import {
    Popup
  } from 'vue-ydui/dist/lib.px/popup';
  import betterScroll from '@/components/betterScroll';
  import bigTitle from "@/components/bigTitle/index";
  import myMap from "@/components/map/index";
  import wxConfig from "@/mixins/wxConfig.js";
  import {
    XInput,
    Group,
    XButton,
    Selector,
    Cell,
    Datetime
  } from "vux";
  import checkLogin from "@/mixins/checkLogin.js";
  import uploadImage from '@/components/uploadImg/index';

  export default {
    data() {
      return {
        submiting: false,
        mapShow: false,
        sqList: [],
        alertShow: false,
        tagVal: '',
        date_list: [{
            key: '星期一',
            value: '星期一'
          }, {
            key: '星期二',
            value: '星期二'
          }, {
            key: '星期三',
            value: '星期三'
          }, {
            key: '星期四',
            value: '星期四'
          },
          {
            key: '星期五',
            value: '星期五'
          }, {
            key: '星期六',
            value: '星期六'
          }, {
            key: '星期日',
            value: '星期日'
          },
        ],
        face_name: "",
        map: "",
        address: "",
        face_phone:'',
        tag1: [],
        tag2: [],
        start_day: '星期一',
        end_day: '星期日',
        start_time: '00:00',
        end_time: '24:00',
        cityVal: "",
        cityKey: "",
        qyVal: "",
        qyKey: "",
        sqVal: "",
        tupian: []
      };
    },
    created() {
      var _this = this;
      // this.$eruda.init();
      this.$emit("showPopup", false);
      if (this.faceId) {
        this.$axios
          .get("/Api/Shop/face_edit", {
            params: {
              id: _this.faceId
            }
          })
          .then(({
            data
          }) => {
            console.log(data);

            _this.face_name = data.face_name;
            if (data.map) {
              _this.map = JSON.parse(data.map);
            }
            this.address = data.adress;
            this.sqVal = data.sq_id;
            if (data.tag1) {
              this.tag1 = data.tag1;
            }else{
              this.tag1 = [];
            }
            this.tag2 = data.tag2;
            this.start_day = data.start_day;
            this.end_day = data.end_day;
            this.start_time = data.start_time;
            this.end_time = data.end_time;
            this.tupian = data.face_img;
            this.face_phone = data.face_phone;
            console.log('获取old图片')
          });
      }

      this.$axios.get("/Api/UserShow/city").then(({
        data
      }) => {
        console.log(data);
        // 获取城市信息
        data.map(m => {
          if (m.id == this.userinfo.shop[0].city) {
            this.cityKey = m.city;
            this.cityVal = m.id;
            if (m.qy) {
              m.qy.map(q => {
                if (q.id == this.userinfo.shop[0].qy) {
                  this.qyKey = q.qy_name;
                  this.qyVal = q.id;
                  if (q.sq) {
                    this.sqList = q.sq;
                  }
                }
              });
            }
          }
        });

        // 获取社区列表
      });
    },
    methods: {
      showPopup(val) {
        this.$emit("showPopup", val);
      },
      add_face() {
        this.submiting = true;
        var _this = this;
        console.log("提交");

        this.checkForm().then(res => {

          this.$axios
            .get("/Api/Shop/add_face", {
              params: this.params
            })
            .then(
              ({
                data
              }) => {
                if (data.status == 1) {
                  this.$vux.alert.show({
                    title: "提示",
                    content: "创建门店成功！",
                    onHide() {
                      _this.$router.replace({
                        path: "/shanghu/me/mendian"
                      });
                    }
                  });
                } else if (data.status == 0) {
                  this.submiting = false;
                  this.$vux.alert.show({
                    title: "提示",
                    content: "创建门店失败，请重试！",
                    onHide() {
                      _this.$router.replace({
                        path: "/shanghu/me/mendian"
                      });
                    }
                  });
                }
              },
              err => {
                this.submiting = false;
              }
            );
        }, err => {
          this.submiting = false;
        })

      },
      change_face() {
        var _this = this;
        this.submiting = true;
        this.checkForm().then(res => {
          this.$axios
            .get("/Api/Shop/edit_face", {
              params: this.params
            })
            .then(({
              data
            }) => {
              console.log(data);
              if (data.status == 1) {
                this.$vux.alert.show({
                  title: "提示",
                  content: "修改成功！",
                  onHide() {
                    _this.$router.replace({
                      path: "/shanghu/me/mendian"
                    });
                  }
                });
              } else if (data.status == 0) {
                this.$vux.alert.show({
                  title: "提示",
                  content: "修改失败！",
                  onHide() {
                    _this.$router.replace({
                      path: "/shanghu/me/mendian"
                    });
                  }
                });
              }
            });
        }, err => {
          this.submiting = false;
        })

      },
      selectAdd() {
        console.log(this.mapShow);
        this.mapShow = true;
      },
      finishAdd(map) {
        this.mapShow = false;
        console.log(map)
        this.map = map;
      },
      checkForm() {
        var _this = this;
        console.log(1)
        return new Promise((resolve, reject) => {
          if (!this.face_name) {
            _this.alertWarning("请填写门店名称！");
            reject();
          } else if (!this.map) {
            _this.alertWarning("请选择门店位置！");
            reject();
          } else if (!this.address) {
            _this.alertWarning("请填写详细地址！");
            reject();
          } else if (!this.sqVal) {
            _this.alertWarning("请选择加盟社区！");
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
      changeSq(val) {
        this.sqVal = val;
      },
      showAddTag() {
        this.alertShow = true;
      },
      addTag() {
        if (this.tagVal != '') {
          this.tag2 = this.tag2.concat(this.tagVal);
        }
        this.alertShow = false;
        this.tagVal = '';
      },
      delTag(e, name) {
        var index = this.tag2.indexOf(name);
        this.tag2.splice(index, 1);

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
      myMap,
      Cell,
      betterScroll,
      Popup,
      Datetime,
      uploadImage
    },
    computed: {
      faceId() {
        return this.$route.query.faceId;
      },
      finishBtn() {
        if (this.face_name && this.loc) {
          return false;
        } else {
          return true;
        }
      },
      params() {
        return {
          face_name: this.face_name,
          jd: this.map.latlng.lat,
          wd: this.map.latlng.lng,
          map: this.map,
          adress: this.address,
          face_phone:this.face_phone,
          city: this.cityVal,
          qy: this.qyVal,
          sq: this.sqVal,
          fw_shop_id: this.userinfo.shop[0].id,
          id: this.faceId,
          phone: this.userinfo.uphone,
          tag1: this.tag1,
          tag2: this.tag2,
          start_day: this.start_day,
          end_day: this.end_day,
          start_time: this.start_time,
          end_time: this.end_time,
          face_img: this.tupian
        }
      }
    },
    mixins: [checkLogin]
  };

</script>

<style lang='scss'>
  .add-face {
    height: 100%;
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
