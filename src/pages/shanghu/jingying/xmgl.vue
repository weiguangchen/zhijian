<template>
  <div class="xmgl">
    <betterScroll>
      <bigTitle title='新建项目' @showPopup='showPopup'></bigTitle>
      <div class="form-box">
        <template v-if="step == 1">
          <div class="form-group">
            <h2 class="sub-title">服务名称</h2>
            <Group class="reset-vux-input">
              <XInput v-model="fw_name"></XInput>
            </Group>
          </div>
          <div class="form-group">
            <h2 class="sub-title">简短名称:
              <span class="tip">用于消费卷，邮件，短信，列表展示的显示</span>
            </h2>
            <Group class="reset-vux-input">
              <XInput v-model="fw_short_info"></XInput>
            </Group>
          </div>
          <div class="form-group">
            <h2 class="sub-title">服务介绍</h2>
            <Group class="reset-vux-input">
              <XTextarea :max='50' v-model="fw_intr"></XTextarea>
            </Group>
          </div>

        </template>
        <template v-else-if="step == 2">
          <div class="form-group">
            <h2 class="sub-title">分类:</h2>
            <Group class="reset-vux-input">
              <Selector title="1" :options='one_class_all' :value-map="['id','class_name']" v-model="one_class_val" @on-change='changeOneClass'
                v-if="one_class_all"></Selector>
            </Group>
          </div>
          <div class="form-group">
            <h2 class="sub-title">子分类列表:</h2>
            <Group class="reset-vux-input">
              <Selector title='1' :options='two_class' :value-map="['id','fw_name']" v-model="two_class_val" @on-change='changeTwoClass'></Selector>
            </Group>
          </div>
          <div class="form-group" v-if="two_class_val">
            <h2 class="sub-title">图文详情:</h2>
            <div v-for="(item,index) in twList" :key="index" class="radio-box">
              <mu-radio color='#e03233' :label="item.fw_content_name" v-model="tw" :value='item.id'></mu-radio>
              <span @click="previewDetail(item.id)" class="yulan">预览</span>
            </div>
            <span></span>
            <!-- <mu-radio label='测试' v-model="tw1" value='31' style="display:none;"></mu-radio> -->
            <div v-transfer-dom class="tw-preview-detail">
              <XDialog v-model="twDetailShow" :hide-on-blur='true' :scroll='true'>
                <!-- 123 -->
                <div v-html="twDetailContent"></div>
              </XDialog>
            </div>
          </div>
          <div class="form-group">
            <h2 class="sub-title">支持门店:</h2>
            <mu-checkbox v-model="face" :value='item.id' v-for="(item,index) in List" :key="index" :label='item.face_name' color='#e03233'></mu-checkbox>
          </div>
          <!-- <div class="form-group">
            <h2 class="sub-title">服务缩略图:</h2>
            <div class="uploadImage">
              <div class="upload-btn" @click="chooseImg">点击添加<br/>图片</div> -->
          <!-- 安卓预览图片 -->
          <!-- <img :src="imgs || tupian" alt="" class="thumb" v-if="system == 1"> -->
          <!-- IOS预览图片 -->
          <!-- <img :src="localData || tupian" alt="" v-else class="thumb"> -->
          <!-- </div>
          </div> -->
        </template>
        <template v-else-if="step == 3">
          <!-- <div class="form-group">
            <h2 class="sub-title">有效期(天):</h2>
            <Group class="reset-vux-input">
              <XInput v-model="youxiao" :required='true' placeholder='填写有效期'></XInput>
            </Group>
          </div> -->
          <div class="form-group">
            <h2 class="sub-title">原价(元):</h2>
            <Group class="reset-vux-input">
              <XInput v-model="yuanjia" :required='true' placeholder='填写原价'></XInput>
            </Group>
          </div>
          <div class="form-group">
            <h2 class="sub-title">现价(元):</h2>
            <Group class="reset-vux-input">
              <XInput v-model="xianjia" :required='true' placeholder='填写现价'></XInput>
            </Group>
          </div>
          <div class="form-group">
            <h2 class="sub-title">商户结算价(元):</h2>
            <Group class="reset-vux-input">
              <XInput v-model="jiesuanjia" :required='true' placeholder='填写商户结算价' :disabled='true'></XInput>
            </Group>
          </div>
          <div class="form-group">
            <h2 class="sub-title">规格:</h2>
            <Group class="reset-vux-input">
              <XInput v-model="fw_gg" :required='true' :disabled='true'></XInput>
            </Group>
          </div>

        </template>
        <XButton type='warn' class="xbtn" @click.native="next1" v-if="step == 1">下一步</XButton>
        <XButton type='warn' class="xbtn" @click.native="next2" v-else-if="step == 2">下一步</XButton>
        <XButton type='warn' class="xbtn" @click.native="finish" v-else-if="step == 3 && !querys" :disabled='submiting'>提交</XButton>
      </div>
    </betterScroll>

  </div>
</template>

<script>
  import betterScroll from '@/components/betterScroll/index';
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
    XDialog
  } from "vux";
  import bigTitle from "@/components/bigTitle/index";
  import shanghuSelect from "@/components/shanghu_form/face_select";
  import shanghuInput from "@/components/shanghu_form/input";
  import checkLogin from "@/mixins/checkLogin.js";
  import {
    CheckBox,
    CheckBoxGroup
  } from "vue-ydui/dist/lib.px/checkbox";
  import {
    Radio,
    RadioGroup
  } from "vue-ydui/dist/lib.px/radio";
  import {
    TransferDomDirective as TransferDom
  } from "vux";
  import JKeyboard from "better-keyboard";

  export default {
    data() {
      return {
        scroll: "",
        jsPrecent: 0.3 /* 结算比例 */ ,
        alertShow: false,
        submiting: false,
        fw_gg: "",
        keyboardShow: false,
        twList: [],
        twDetailShow: false,
        twDetailContent: "",
        step: 1,
        imgs: "",
        localData: "",
        system: 1,
        one_class_all: [],
        two_class_all: [],
        two_class: [],
        List: [],
        // 第一步
        fw_name: "",
        fw_short_info: "",
        fw_intr: "",
        // 第二步
        one_class_val: "",
        two_class_val: "",
        tw: "",
        face: [],
        tupian: "",
        //   第三部
        youxiao: 0,
        yuanjia: "",
        xianjia: ""
        // jiesuanjia: ""
      };
    },
    created() {
      var _this = this;
      /* 关闭侧栏 */
      this.$emit("showPopup", false);
      /* 判断系统 */
      this.checkSystem();
      // this.$eruda.init();

      /* 获取表单所需列表 */
      this.$axios
        .get( "/api/ShopFw/shop_fw", {
          params: {
            shop_id: _this.userinfo.shop[0].id,
            phone: _this.userinfo.uphone
          }
        })
        .then(res => {
          console.log(res);
          _this.List = res.data.face;
          console.log(this.faceList);
          _this.one_class_all = res.data.fw_class;
          _this.two_class_all = res.data.fw;
        });
    },
    watch: {
      tw(newval) {
        var _this = this;
        if (this.twList.length > 0) {
          this.twList.map(m => {
            if (m.id == newval) {
              _this.fw_gg = m.fw_gg;
            }
          });
        }
      }
    },
    methods: {
      showPopup(val) {
        this.$emit("showPopup", val);
      },
      next1() {
        if (!this.fw_name) {
          this.alertWarning("请填写服务名称！");
          return false;
        } else if (!this.fw_short_info) {
          this.alertWarning("请填写简短名称！");
          return false;
        } else if (!this.fw_intr) {
          this.alertWarning("请填写服务介绍！");
          return false;
        }
        this.step = 2;
      },
      next2() {
        if (!this.one_class_val) {
          this.alertWarning("请选择分类！");
          return false;
        } else if (!this.two_class_val) {
          this.alertWarning("请选择子分类！");
          return false;
        } else if (!this.tw) {
          this.alertWarning("请选择图文详情！");
          return false;
        } else if (this.face.length <= 0) {
          this.alertWarning("请请选择支持的门店！");
          return false;
        }
        // else if (!this.tupian) {
        //   this.alertShow = true;
        //   this.modalInfo = "请上传服务缩略图";
        //   return false;
        // }

        this.step = 3;
      },
      finish() {
        var _this = this;
        this.submiting = true;
        this.checkForm().then(
          res => {
            this.$axios
              .get( "/api/ShopFw/add_shop_fw", {
                params: {
                  fw_mingzi: this.fw_name,
                  sub_name: this.fw_short_info,
                  sub_content: this.fw_intr,
                  fw_cid: this.one_class_val,
                  fw_id: this.two_class_val,
                  fw_content_id: this.tw,
                  fw_face: this.face,
                  // fw_img: this.tupian,
                  use_day: this.youxiao,
                  y_money: this.yuanjia,
                  money: this.xianjia,
                  j_money: this.jiesuanjia,
                  shop_id: this.userinfo.shop[0].id,
                  fw_gg: this.fw_gg
                }
              })
              .then(res => {
                //   成功返回1不成功返回0
                console.log(res);
                if (res.data.status == 1) {
                  this.$vux.alert.show({
                    title: "提示",
                    content: "上传服务成功，请等待审核",
                    onHide() {
                      _this.$router.replace({
                        path: "/shanghu/jingying/index"
                      });
                    }
                  });
                } else if (res.data.status == 0) {
                  this.$vux.alert.show({
                    title: "提示",
                    content: "上传服务失败，请重新上传",
                    onHide() {
                      _this.$router.replace({
                        path: "/shanghu/jingying/index"
                      });
                    }
                  });
                }
              });
          },
          err => {
            this.submiting = false;
          }
        );
      },
      previewDetail(id) {
        var _this = this;
        this.$axios
          .get( "/Api/ShopFw/content", {
            params: {
              id
            }
          })
          .then(({
            data
          }) => {
            console.log(data);
            this.twDetailContent = data[0].fw_content;
            this.twDetailShow = true;
          });
      },
      checkForm() {
        var _this = this;
        console.log(this.isPositiveInteger(this.youxiao));
        return new Promise((resolve, reject) => {
          // if (!this.isPositiveInteger(this.youxiao)) {
          //   this.alertWarning("请填写正确有效期！");
          //   reject();
          // } else
          if (!this.isPrice(this.yuanjia)) {
            this.alertWarning("请填写原价！");
            reject();
          } else if (!this.isPrice(this.xianjia)) {
            this.alertWarning("请填写现价！");
            reject();
          } else if (!this.isPrice(this.jiesuanjia)) {
            this.alertWarning("请填写结算价！");
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
      changeOneClass(val) {
        console.log(val);
        this.two_class = this.two_class_all.filter(item => {
          return item.fid == val;
        });
        console.log(this.one_class_all);
      },
      changeTwoClass(id) {
        var _this = this;
        this.$axios
          .get( "/Api/ShopFw/get_fw_content", {
            params: {
              id
            }
          })
          .then(({
            data
          }) => {
            console.log(data);
            if (data.length <= 0) {
              this.tw = "";
            }
            this.twList = data;
          });
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
              .get( "/api/wechat/bcimg", {
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
      isPrice(s) {
        var re = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
        return re.test(s);
      },
      isPositiveInteger(s) {
        var re = /^[1-9]\d*$/;
        return re.test(s);
      }
    },
    computed: {
      querys() {
        return this.$route.params.fwId;
      },
      jiesuanjia() {
        return (this.xianjia * (1 - this.jsPrecent)).toFixed(2);
      }
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
      CheckBoxGroup,
      CheckBox,
      RadioGroup,
      Radio,
      XDialog,
      betterScroll
    },
    mixins: [checkLogin]
  };

</script>

<style lang='scss'>
  .xmgl {
    height: 100%;
    .vux-selector {
      .weui-cell__hd {
        visibility: hidden;
        width: 1px;
      }
    }
    .demo1-item {
      border: 1px solid #ececec;
      padding: 5px 15px;
    }

    .demo1-item-selected {
      border: 1px solid green;
    }

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

    .check-box {
      margin-right: .2rem/* 20/100 */
      ;
      margin-bottom: .15rem/* 15/100 */
      ;
    }

    .mu-checkbox {
      margin-right: .2rem/* 20/100 */
      ;
      margin-bottom: .2rem/* 20/100 */
      ;
    }

    .radio-box {
      display: flex;
      align-items: center;
      margin-right: .2rem/* 20/100 */
      ;
      margin-bottom: .2rem/* 20/100 */
      ;
      .yulan {
        border-radius: .1rem/* 10/100 */
        ;
        padding: .1rem/* 10/100 */
        ;
        color: #e03233;
        margin-left: .1rem/* 10/100 */
        ;
        border: 1px solid #e03233;
      }
    }
  }

</style>
