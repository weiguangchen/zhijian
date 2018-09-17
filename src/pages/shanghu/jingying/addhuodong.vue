<template>
  <div class="creat-huodong">
    <betterScroll>
      <bigTitle title='新建活动' @showPopup='showPopup'></bigTitle>
      <div class="form-box">
        <template v-if="step == 1">
          <div class="form-group">
            <h2 class="sub-title">活动名称:</h2>
            <Group class="reset-vux-input">
              <XInput v-model="huodongname"></XInput>
            </Group>
          </div>
          <div class="form-group">
            <h2 class="sub-title">简短名称:</h2>
            <Group class="reset-vux-input">
              <XInput v-model="sub_name"></XInput>
            </Group>
          </div>
          <!-- <div class="form-group">
            <h2 class="sub-title">活动缩略图:</h2>
            <div class="uploadImage">
              <div class="upload-btn" @click="chooseImg">点击添加
                <br/>图片</div> -->
          <!-- 安卓预览图片 -->
          <!-- <img :src="imgs || tupian" alt="" class="thumb" v-if="system == 1"> -->
          <!-- IOS预览图片 -->
          <!-- <img :src="localData || tupian" alt="" v-else class="thumb"> -->

          <!-- </div>

          </div> -->
          <!-- <div class="form-group"> -->
          <!-- <h2 class="sub-title">上传图片集:</h2> -->
          <!-- <div class="uploadImage"> -->
          <!-- <div class="upload-btn" @click="chooseImg">点击添加<br/>图片</div> -->
          <!-- 安卓预览图片 -->
          <!-- <img :src="imgs || tupian" alt="" class="thumb" v-if="system == 1"> -->
          <!-- IOS预览图片 -->
          <!-- <img :src="localData || tupian" alt="" v-else class="thumb"> -->

          <!-- </div> -->

          <!-- </div> -->
        </template>
        <template v-if='step == 2'>
          <div class="form-group">
            <h2 class="sub-title">城市</h2>
            <Group class="reset-vux-input">
              <Selector title='1' :options='add' :value-map="['id','city']" @on-change='changeCity' v-model="cityVal"></Selector>
            </Group>
          </div>

          <div class="form-group" v-if="currentQy">
            <h2 class="sub-title">区域</h2>
            <Group class="reset-vux-input">
              <Selector title='1' :options='currentQy' :value-map="['id','qy_name']" @on-change='changeQy' v-model="qyVal"></Selector>
            </Group>
          </div>
          <div class="form-group" v-if="currentSq">
            <h2 class="sub-title">社区</h2>
            <Group class="reset-vux-input">
              <Selector title='1' :options='currentSq' :value-map="['id','sq_name']" v-model="sqVal"></Selector>
            </Group>
          </div>
          <div class="form-group" v-if="currentSq">
            <h2 class="sub-title">分类</h2>
            <Group class="reset-vux-input">
              <Selector :options='one_class_list' title='1' :value-map="['id','class_name']" @on-change='changeOneClass'
                v-model="one_class_val" v-if="one_class_list"></Selector>
            </Group>
          </div>

          <div class="form-group">
            <h2 class="sub-title">图文详情:</h2>

            <div v-for="(item,index) in twList" :key="index" class="radio-box">
              <mu-radio color='#e03233' :label="item.hd_content_name" v-model="tw" :value='item.id'></mu-radio>
              <span @click="previewDetail(item.id)" class="yulan">预览</span>
            </div>
            <mu-radio label='测试' v-model="tw1" value='31' style="display:none;"></mu-radio>
            <div v-transfer-dom class="tw-preview-detail">
              <XDialog v-model="twDetailShow" :hide-on-blur='true' :scroll='true'>
                <!-- 123 -->
                <div v-html="twDetailContent"></div>
              </XDialog>
            </div>
          </div>
          <div class="form-group" v-if="!hdId">
            <h2 class="sub-title">支持门店:</h2>

            <mu-checkbox v-model="faceVal" :value='item.id' v-for="(item,index) in face_list" :key="index" :label='item.face_name'
              color='#e03233'></mu-checkbox>
          </div>
          <div class="form-group" v-if="!hdId">
            <h2 class="sub-title">服务类别:</h2>
            <Group class="reset-vux-input">
              <div class="fw-item" v-for="(item,index) in fw_list" :key="index">
                <h2 class="sub-title">{{item.fw_mingzi}}</h2>
                <div class="select-num">
                  <span>数量</span>
                  <XNumber :min='0' v-model="fw_selceted[index]"></XNumber>
                </div>
              </div>

            </Group>
          </div>
          <div class="form-group">
            <h2 class="sub-title">单卡最大购买量(0为不限制):</h2>
            <Group class="reset-vux-input">
              <XNumber v-model="card_max_num" title='' :fillable='true' :min='0'></XNumber>
            </Group>
          </div>
          <div class="form-group">
            <h2 class="sub-title">原价:</h2>
            <Group class="reset-vux-input">
              <XInput v-model="yuanjia"></XInput>
            </Group>
          </div>
          <div class="form-group">
            <h2 class="sub-title">活动价:</h2>
            <Group class="reset-vux-input">
              <XInput v-model="huodongjia"></XInput>
            </Group>
          </div>
          <div class="form-group">
            <h2 class="sub-title">商户结算价:</h2>
            <Group class="reset-vux-input">
              <XInput v-model="jiesuanjia" :disabled='true'></XInput>
            </Group>
          </div>
        </template>
        <XButton type='warn' class="xbtn" @click.native="next1" v-if="step == 1">下一步</XButton>
        <XButton type='warn' class="xbtn" @click.native="submitFn" :disabled='submiting' v-if="step == 2">提交</XButton>
      </div>

    </betterScroll>
    <Popup position='right' v-model="popupShow">
      <div class="popup-list">
        <Group>
          <Cell title='管理活动' link='/shanghu/jingying/hdList'></Cell>
        </Group>

      </div>
    </Popup>
  </div>
</template>

<script>
  import {
    Popup
  } from "vue-ydui/dist/lib.px/popup";
  import betterScroll from '@/components/betterScroll/index';
  import {
    TransferDomDirective as TransferDom
  } from "vux";
  import {
    ViewBox,
    Selector,
    Group,
    XButton,
    XInput,
    Confirm,
    Checker,
    CheckerItem,
    XTextarea,
    XNumber,
    XDialog,
    Cell
  } from "vux";
  import {
    CheckBox,
    CheckBoxGroup
  } from "vue-ydui/dist/lib.px/checkbox";
  import {
    Radio,
    RadioGroup
  } from "vue-ydui/dist/lib.px/radio";
  import {
    KeyBoard
  } from "vue-ydui/dist/lib.px/keyboard";
  import bigTitle from "@/components/bigTitle/index";
  import shanghuSelect from "@/components/shanghu_form/face_select";
  import shanghuInput from "@/components/shanghu_form/input";
  import wxConfig from "@/mixins/wxConfig.js";
  import checkLogin from "@/mixins/checkLogin.js";
  import Qs from "qs";

  export default {
    data() {
      return {
        popupShow: false,
        step: 1,
        twDetailShow: false,
        twDetailContent: "",
        system: 1,
        submiting: false,
        one_class_list: [],
        fw_list: [],
        add: [],
        currentQy: [],
        currentSq: [],
        face_list: [],
        twList: [],
        localData: "",
        imgs: "",
        jsPrecent: 0.3,
        // 第一步
        huodongname: "",
        sub_name: "",
        // tupian: "",
        // tupianList: [],
        // 第二步
        cityVal: "",
        qyVal: "",
        sqVal: "",
        one_class_val: "",
        faceVal: [],
        tw: "",
        tw1: '',
        fw_selceted: [],
        card_max_num: 0,
        yuanjia: 0,
        huodongjia: 0,
        // jiesuanjia: 0,
      };
    },
    created() {
      // this.$eruda.init();
      var _this = this;
      this.checkSystem();
      this.popupShow = false;
      this.$emit("showPopup", false);
      if (this.hdId) {
        this.getOldInfo()
      }
      this.$axios
        .get("/Api/YouHui/card_add", {
          params: {
            phone: _this.userinfo.uphone
          }
        })
        .then(({
          data
        }) => {
          console.log(data);
          _this.add = data.city;
          _this.one_class_list = data.hd_class;
          _this.face_list = data.face;
          _this.fw_list = data.fw;
        });
    },

    methods: {
      showPopup(val) {
        this.popupShow = true;
      },
      changeCity(val) {
        console.log(val);
        let curCity = this.add.filter(m => {
          return m.id == val;
        });
        this.currentQy = curCity[0].qy;
        console.log(this.currentQy);
      },
      changeQy(val) {
        console.log(val);
        let curQy = this.currentQy.filter(m => {
          return m.id == val;
        });
        console.log(curQy);
        if (curQy.length > 0) {
          this.currentSq = curQy[0].sq;
        }
        console.log(this.currentSq);
      },
      changeOneClass(val) {
        var _this = this;
        this.$axios
          .get("/Api/YouHui/get_hd_content", {
            params: {
              id: val
            }
          })
          .then(({
            data
          }) => {
            console.log(data);

            _this.twList = data;
          });
      },
      submitFn() {
        this.submiting = true;
        var _this = this;
        var params = {
          card_img: this.tupian,
          card_name: this.huodongname,
          card_money: this.huodongjia,
          card_shopid: this.userinfo.shop[0].id,
          card_money: this.huodongjia,
          card_ymoney: this.yuanjia,
          card_class_id: this.one_class_val,
          card_content_id: this.tw,
          city_id: this.cityVal,
          qy_id: this.qyVal,
          sq_id: this.sqVal,
          bk_num: this.fw_num,
          card_subname: this.sub_name,
          face: this.faceVal,
          card_face_id: this.faceVal[0],
          card_max_num: this.card_max_num,
          card_fw_num: this.card_fw_num
        }
        this.checkStep2().then(
          res => {
            if (this.hdId) {
              Object.assign(params, {
                id: this.hdId
              })
              // 修改活动
              this.$axios
                .get("/Api/Card/card_edit", {
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  params
                })
                .then(({
                  data
                }) => {
                  _this.submiting = false;
                  console.log(data);
                  if (data == 1) {
                    this.$vux.alert.show({
                      title: "提示",
                      content: "修改活动成功!",
                      onHide() {
                        _this.$router.replace({
                          path: "/shanghu/jingying/hdList"
                        });
                      }
                    });
                  } else if (data == 0) {
                    this.$vux.alert.show({
                      title: "提示",
                      content: "修改活动失败!",
                      onHide() {
                        _this.$router.replace({
                          path: "/shanghu/jingying/hdList"
                        });
                      }
                    });
                  }
                });
            } else {
              // 添加活动
              this.$axios
                .get("/Api/YouHui/add_card", {
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  params
                })
                .then(({
                  data
                }) => {
                  _this.submiting = false;
                  console.log(data);
                  if (data.status == 1) {
                    this.$vux.alert.show({
                      title: "提示",
                      content: "添加活动成功!",
                      onHide() {
                        _this.$router.replace({
                          path: "/shanghu/jingying/hdList"
                        });
                      }
                    });
                  } else if (data.status == 0) {
                    this.$vux.alert.show({
                      title: "提示",
                      content: "添加活动失败!",
                      onHide() {
                        _this.$router.replace({
                          path: "/shanghu/jingying/hdList"
                        });
                      }
                    });
                  }
                });
            }

          },
          err => {
            this.submiting = false;
            return false;
          }
        );
      },
      checkStep1() {
        var _this = this;
        return new Promise((resolve, reject) => {
          if (!this.huodongname) {
            _this.alertWarning("请输入活动名称！");
            reject();
          } else if (!this.sub_name) {
            _this.alertWarning("请输入简短名称！");
            reject();
          } else {
            resolve();

          }


          //  else if (!this.tupian) {
          //   _this.alertWarning("请上传活动缩略图！");
          //   reject();
          // }

          //  else if (!this.tupianList) {
          //   _this.alertWarning("请上传活动图片集！");
          //   reject();
          // }
        });
      },
      checkStep2() {
        var _this = this;
        return new Promise((resolve, reject) => {
          if (!this.cityVal) {
            _this.alertWarning("请选择城市！");
            reject();
          } else if (!this.qyVal) {
            _this.alertWarning("请选择区域！");
            reject();
          } else if (!this.sqVal) {
            _this.alertWarning("请选择社区！");
            reject();
          } else if (!this.one_class_val) {
            _this.alertWarning("请选择分类");
            reject();
          } else if (this.faceVal.length <= 0 && !this.hdId) {
            _this.alertWarning("请选择门店！");
            reject();
          } else if (!this.tw) {
            _this.alertWarning("请选择图文详情！");
            reject();
          } else if (this.fw_selceted.length <= 0 && !this.hdId) {
            _this.alertWarning("请选择服务！");
            reject();
          } else if (!this.isPrice(this.yuanjia)) {
            _this.alertWarning("请填写原价！");
            reject();
          } else if (!this.isPrice(this.huodongjia)) {
            _this.alertWarning("请填写活动价！");
            reject();
          } else if (!this.isPrice(this.jiesuanjia)) {
            _this.alertWarning("请填写结算价！");
            reject();
          } else {
            resolve();
          }
        });
      },
      alertWarning(text) {
        this.$vux.alert.show({
          title: "提示",
          content: text
        });
      },
      previewDetail(id) {
        var _this = this;
        console.log(id);
        this.$axios
          .get("/Api/YouHui/content", {
            params: {
              id
            }
          })
          .then(({
            data
          }) => {
            this.twDetailShow = true;
            console.log(data);
            this.twDetailContent = data[0].hd_content;
          });
      },
      // 获取已有数据
      getOldInfo() {
        this.$axios.get('/Api/card/edit_card', {
          params: {
            id: this.hdId
          }
        }).then(({
          data
        }) => {
          console.log(data);
          this.huodongname = data[0].card_name;
          this.sub_name = data[0].card_subname;
          this.cityVal = data[0].city_id;
          this.qyVal = data[0].qy_id;
          this.sqVal = data[0].sq_id;
          this.one_class_val = data[0].card_class_id;
          this.tw = data[0].card_content_id;
          this.huodongjia = data[0].card_money;
          this.yuanjia = data[0].card_ymoney
        })
      },
      checkSystem() {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isAndroid) {
          this.system = 1;
        } else if (isiOS) {
          this.system = 2;
        }
        console.log("系统：" + this.system);
      },
      chooseImg() {
        var _this = this;
        this.$wx.chooseImage({
          count: 1, // 默认9
          sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            _this.imgs = res.localIds;
            if (_this.system == 1) {
              _this.uploadImg();
              return false;
              // 安卓
            } else if (_this.system == 2) {
              _this.$wx.getLocalImgData({
                localId: res.localIds[0], // 图片的localID
                success: function (res) {
                  _this.localData = res.localData; // localData是图片的base64数据，可以用img标签显示
                  _this.uploadImg();
                  return false;
                }
              });
            }
          }
        });
      },
      uploadImg() {
        var _this = this;
        this.$wx.uploadImage({
          localId: _this.imgs[0].toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
            var serverId = res.serverId; // 返回图片的服务器端ID
            _this.$axios
              .get("/api/wechat/bcimg", {
                params: {
                  imgs: res.serverId
                }
              })
              .then(res => {
                console.log(res);
                _this.tupian = res.data;
              });
          }
        });
      },
      next1() {
        this.checkStep1().then(
          res => {
            this.step = 2;
          },
          err => {
            return false;
          }
        );
      },
      isPrice(s) {
        var re = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
        return re.test(s);
      },
      isPositiveInteger(s) {
        var re = /^[1-9]\d*$/;
        return re.test(s);
      },
    },
    computed: {
      querys() {
        return this.$route.query.fwId;
      },
      fw_num() {
        var arr = [];
        this.fw_list.map((m, index) => {
          if (this.fw_selceted[index] >= 0) {
            var item = [];
            item[0] = m.fw_mingzi;
            item[1] = m.shop_fw_id;
            item[2] = this.fw_selceted[index];
            arr.push(item);
          }
        });
        return arr;
      },
      card_fw_num() {
        var len = 0;
        this.fw_selceted.map(m => {
          len += m;
        })
        return len;
      },
      jiesuanjia() {
        return (this.huodongjia * (1 - this.jsPrecent)).toFixed(2);
      },
      hdId() {
        return this.$route.query.hdId;
      },

    },
    directives: {
      TransferDom
    },
    components: {
      bigTitle,
      ViewBox,
      Selector,
      Group,
      shanghuSelect,
      shanghuInput,
      XButton,
      XInput,
      Confirm,
      Checker,
      CheckerItem,
      XTextarea,
      KeyBoard,
      XNumber,
      CheckBoxGroup,
      CheckBox,
      RadioGroup,
      Radio,
      XDialog,
      betterScroll,
      Popup,
      Cell
    },
    mixins: [checkLogin]
  };

</script>

<style lang='scss'>
  .uploadImage {
    display: flex;

    .upload-btn {
      margin: 0 0.4rem;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 2rem;
      height: 2rem;
      border: 1px dashed #2a2a2a;
      border-radius: 0.133333rem;
    }

    .thumb {
      width: 2rem;
      height: 2rem;
      flex: none;
    }
  }

  .tw-preview-detail {
    .weui-dialog {
      display: block;
      top: 0.4rem;
      bottom: 0.4rem;
      background: #ffffff;
      overflow: scroll;
    }
  }

  .creat-huodong {
    height: 100%;
    background: #ffffff;

    .fw-item {
      margin: 0 0.426667rem;
      border-bottom: 1px solid #e4e4e4;
    }

    .select-num {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .weui-cell {
        &::before {
          border-top: none;
        }
      }
    }

    .mu-checkbox {
      margin-right: .2rem
        /* 20/100 */
      ;
      margin-bottom: .2rem
        /* 20/100 */
      ;
    }


    .radio-box {
      display: flex;
      align-items: center;
      margin-right: .2rem
        /* 20/100 */
      ;
      margin-bottom: .2rem
        /* 20/100 */
      ;

      .yulan {
        border-radius: .1rem
          /* 10/100 */
        ;
        padding: .1rem
          /* 10/100 */
        ;
        color: #e03233;
        margin-left: .1rem
          /* 10/100 */
        ;
        border: 1px solid #e03233;
      }
    }

    .weui-dialog {
      display: block;
      top: 0.4rem;
      bottom: 0.4rem;
      background: #ffffff;
      overflow: scroll;
    }

    .vux-selector {
      .weui-cell__hd {
        visibility: hidden;
        width: 1px;
      }
    }
  }

</style>
