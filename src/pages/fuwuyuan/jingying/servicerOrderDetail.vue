<template>
  <div class="order-detail-wrapper">
    <betterScroll>
      <bigTitle title="订单详情" @showPopup='showPopup' :icon='false'></bigTitle>
      <div class="order-detail ">
        <div class="order-wrapper">
          <div class="order-num">
            <h2>①&nbsp;&nbsp;门店接单</h2>
            <div>订单号：{{detail.order_num}}</div>
            <div>下单时间：{{detail.date}}</div>
          </div>
          <div class="order-info">
            <div class="line">
              <span class="title">服务名称：</span>
              <span class="content">{{detail.fw_mingzi}}</span>
            </div>
            <div class="line">
              <span class="title">下单用户：</span>
              <span class="content">{{detail.xingming}}</span>
            </div>
            <div class="line">
              <span class="title">联系方式：</span>
              <span class="content">{{detail.dianhua}}</span>
            </div>
            <div class="line">
              <span class="title">地址：</span>
              <span class="content">{{detail.three}} {{detail.adress}}</span>
            </div>
            <div class="line">
              <span class="title">交易数量：</span>
              <span class="content">{{detail.shop_num}}</span>
            </div>
            <div class="line">
              <span class="title">交易金额：</span>
              <span class="content" v-if="detail.order_price">{{detail.order_price}}</span>
              <span class="content" v-else>其他支付方式</span>
            </div>
            <!-- <div class="line">
              <span class="title">支持门店：</span>
              <span class="content">十一经路</span>
            </div> -->
            <div class="line">
            <span class="title">车辆牌照：</span>
            <span class="content">{{detail.car_card}}</span>
          </div>
          <div class="line">
            <span class="title">车辆颜色：</span>
            <span class="content">{{detail.car_color}}</span>
          </div>
          <div class="line">
            <span class="title">车型：</span>
            <span class="content">{{detail.car_xing}}</span>
          </div>
          </div>
        </div>
        <div class="jiedan" v-if="detail.paidan_status == 2">
          <div class="text">
            <div>派单人：{{detail.paidan_xingming}}</div>
            <div>服务人员：{{detail.fw_user}}</div>
          </div>
          <div class="date">派单时间：{{detail.paidan_time}}</div>
          <XButton type='warn' @click.native="jiedan">接单</XButton>
        </div>
        <div class="jiedan" v-if="detail.paidan_status == 3">
          <div class="text">
            <div>派单人：{{detail.paidan_xingming}}</div>
            <div>服务人员：{{detail.fw_user}}</div>
          </div>
          <div class="date">派单时间：{{detail.paidan_time}}</div>
          <XButton :disabled='true'>已接单</XButton>

          <div class="uploadImg">
            <h2>②&nbsp;&nbsp;上传服务图片</h2>
            <div class="fw-img">
              <h3>服务前照片</h3>
              <div class="upload-wrapper">
                <div class="upload-btn" @click="chooseImg(1)">上传图片</div>
                <div class="upload-box" v-for="(item,index) in beforeFwYulantu" :key="index">
                  <div class="img-box">
                    <img :src="item" alt="" class="img" @click="previewImg(item,beforeFwYulantu)">
                  </div>
                  <i class="iconfont icon-shanchuguanbicha2" @click="deleteImg(index,1)"></i>
                </div>
              </div>
              <h3>服务后照片</h3>
              <div class="upload-wrapper">
                <div class="upload-btn" @click="chooseImg(2)">上传图片</div>
                <div class="upload-box" v-for="(item,index) in afterFwYulantu" :key="index">
                  <div class="img-box">
                    <img :src="item" alt="" class="img" @click="previewImg(item,afterFwYulantu)">
                  </div>
                  <i class="iconfont icon-shanchuguanbicha2" @click="deleteImg(index,2)"></i>
                </div>
              </div>
            </div>
          </div>
          <div class="btns">
            <XButton type='warn' class="btn" @click.native='finishFw'>完成服务</XButton>
            <XButton class="btn" @click.native='tuidan'>退单</XButton>

          </div>
        </div>
        <div class="jiedan" v-if="detail.paidan_status == 4">
          <h2>派单</h2>
          <div class="text">
            <div>派单人：{{detail.paidan_xingming}}</div>
            <div>服务人员：{{detail.fw_user}}</div>
          </div>
          <h2>上传服务图片</h2>
          <h3>服务前照片</h3>
          <div class="img-boxs">
            <img :src="item" alt="" v-for="(item,index) in detail.q_img" :key="index" class="fw-img" @click="previewImg(item,detail.q_img)">
          </div>
          <h3>服务后照片</h3>
          <div class="img-boxs">
            <img :src="item" alt="" v-for="(item,index) in detail.h_img" :key="index" class="fw-img" @click="previewImg(item,detail.h_img)">
          </div>
        </div>
        <div class="jiedan" v-if="detail.paidan_status == 5">
          <div class="text">
            <div>派单人：{{detail.paidan_xingming}}</div>
            <div>服务人员：{{detail.fw_user}}</div>
          </div>
          <XButton :disabled='true'>申请退单中...</XButton>
        </div>


      </div>
    </betterScroll>
    <Popup v-model="alertShow" position='center'>
      <Group>
        <XTextarea v-model="tuidan_info"></XTextarea>
        <XButton @click.native='submit_tuidan' :disabled='td_submiting'>提交</XButton>
      </Group>
    </Popup>
  </div>

</template>

<script>
  import betterScroll from '@/components/betterScroll/index';
  import {
    Popup
  } from 'vue-ydui/dist/lib.px/popup';
  import {
    Selector,
    XButton,
    Group,
    XTextarea
  } from 'vux';
  import bigTitle from "@/components/bigTitle/index";
  import checkLogin from '@/mixins/checkLogin.js';
  export default {
    data() {
      return {
        system: 1,
        son: [],
        detail: {},
        alertShow: false,
        td_submiting: false,
        tuidan_info: '',

        // 服务前本地图片地址
        beforeFwOriginImgs: [],
        beforeFwYulantu: [],
        beforeFwImgs: [],
        /* 服务后本地图片地址 */
        afterFwOriginImgs: [],
        afterFwYulantu: [],
        afterFwImgs: [],
      };
    },
    created() {
      var _this = this;
      this.checkSystem();
      this.$emit("showPopup", false);
      // this.$eruda.init();
      this.get_detail();
    },
    methods: {
      showPopup(val) {
        this.$emit("showPopup", val);
      },
      jiedan() {
        this.$axios
          .get(this.API_URL + "/Api/order/js_order", {
            params: {
              zf: this.zf,
              id: this.orderId
            }
          })
          .then(({
            data
          }) => {
            console.log(data);
            this.$vux.alert.show({
              title: '提示',
              content: '接单成功！',
            })
            this.get_detail();
          });
      },
      tuidan() {
        this.alertShow = true;
      },
      submit_tuidan() {
        var _this = this;
        this.td_submiting = true;

        if (!this.tuidan_info) {
          this.$vux.alert.show({
            title: '提示',
            content: '请填写申请信息！'
          })
          this.td_submiting = false;
        } else {
          this.$axios.get(this.API_URL + '/Api/order/jj_order', {
            params: {
              phone: this.userinfo.uphone,
              tui_liyou: this.tuidan_info,
              zf: this.zf,
              order_id: this.orderId
            }
          }).then(({
            data
          }) => {
            console.log(data)
            _this.alertShow = false;
            _this.$vux.alert.show({
              title: '提示',
              content: data.log,
              onHide() {
                _this.$router.push({
                  path: '/fuwuyuan/jingying/orderGl'
                })
              }
            })

          })
        }

      },
      get_son() {
        this.$axios
          .get(this.API_URL + "/Api/UserShow/get_son", {
            params: {
              shop_id: this.userinfo.shop[0].id
            }
          })
          .then(res => {
            console.log(res);
            this.son = res.data;
          });
      },
      get_detail() {
        this.$axios
          .get(this.API_URL + "/Api/Order/get_order_content", {
            params: {
              id: this.orderId,
              zf: this.zf
            }
          })
          .then(res => {
            console.log(res);
            this.detail = res.data;
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
      chooseImg(type) {
        var _this = this;
        console.log('选择图片')
        this.$wx.chooseImage({
          count: 1, // 默认9
          sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            console.log('本地图片地址')
            console.log(res.localIds)
            if (type == 1) {
              // 服务前图片
              _this.beforeFwOriginImgs.push(res.localIds);
              if (_this.system == 1) {
                // 安卓
                _this.beforeFwYulantu.push(res.localIds);
              } else if (_this.system == 2) {
                // 生成ios预览图
                _this.$wx.getLocalImgData({
                  localId: res.localIds[0], // 图片的localID
                  success: function (res) {
                    _this.beforeFwYulantu.push(res.localData); // localData是图片的base64数据，可以用img标签显示
                    return false;
                  }
                });
              }
              _this.uploadImg(res.localIds[0], 1)
            } else if (type == 2) {
              console.log(2)
              // 服务后图片
              _this.afterFwOriginImgs.push(res.localIds);
              if (_this.system == 1) {
                // 安卓
                _this.afterFwYulantu.push(res.localIds);
              } else if (_this.system == 2) {
                // ios 复制原图
                _this.$wx.getLocalImgData({
                  localId: res.localIds[0], // 图片的localID
                  success: function (res) {
                    _this.afterFwYulantu.push(res.localData); // localData是图片的base64数据，可以用img标签显示
                    return false;
                  }
                });
              }
              _this.uploadImg(res.localIds[0], 2)
            }
          }
        });
      },
      uploadImg(img, type) {
        console.log('上传图片')
        console.log(img)
        var _this = this;
        this.$wx.uploadImage({
          localId: img.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
            var serverId = res.serverId; // 返回图片的服务器端ID
            _this.$axios
              .get(_this.API_URL + "/api/wechat/bcimg", {
                params: {
                  imgs: res.serverId
                }
              })
              .then(res => {
                console.log(res);
                if (type == 1) {
                  _this.beforeFwImgs.push(res.data);
                } else if (type == 2) {
                  _this.afterFwImgs.push(res.data);
                }
              });
          }
        });
      },
      previewImg(curimg, allimg) {
        this.$wx.previewImage({
          current: curimg, // 当前显示图片的http链接
          urls: allimg // 需要预览的图片http链接列表
        });
      },
      deleteImg(index, type) {
        if (type == 1) {
          //   删除服务前图片
          this.beforeFwOriginImgs.splice(index, 1);
          this.beforeFwYulantu.splice(index, 1);
          this.beforeFwImgs.splice(index, 1);
          console.log('删除服务前图片')
          console.log(this.beforeFwOriginImgs)
          console.log(this.beforeFwYulantu)
          console.log(this.beforeFwImgs)

        } else if (type == 2) {
          //   删除服务后图片
          this.afterFwOriginImgs.splice(index, 1);
          this.afterFwYulantu.splice(index, 1);
          this.afterFwImgs.splice(index, 1);
          console.log('删除服务后图片')
          console.log(this.afterFwOriginImgs)
          console.log(this.afterFwYulantu)
          console.log(this.afterFwImgs)
        }
      },
      getLocalImgData(img, type) {
        var _this = this;
        if (img.length > 0) {
          var curimg = img.shift();
          console.log('当前img')
          console.log(curimg)
          this.$wx.getLocalImgData({
            localId: curimg, // 图片的localID
            success: function (res) {
              if (type == 1) {
                _this.beforeFwYulantu.push(res.localData); // localData是图片的base64数据，可以用img标签显示
              } else if (type == 2) {
                _this.afterFwYulantu.push(res.localData); // localData是图片的base64数据，可以用img标签显示
              }
              console.log('beforeFwYulantu')
              console.log(_this.beforeFwYulantu)
              _this.getLocalImgData(img);
            }
          });
        }
      },
      finishFw() {
        var _this = this;
        console.log('服务前')
        console.log(this.beforeFwImgs)
        if (this.beforeFwImgs.length <= 0) {
          this.$vux.alert.show({
            title: '提示',
            content: '请上传服务前图片'
          })
        } else if (this.afterFwImgs.length <= 0) {
          this.$vux.alert.show({
            title: '提示',
            content: '请上传服务后图片'
          })
        } else {
          this.$axios.get(this.API_URL + '/Api/order/yes_order', {
            params: {
              zf: this.zf,
              id: this.orderId,
              q_img: this.beforeFwImgs,
              h_img: this.afterFwImgs
            }
          }).then(({
            data
          }) => {
            console.log(data)
            if (data.status == 1) {
              this.$vux.alert.show({
                title: '提示',
                content: '完成服务！',
                onHide() {
                  _this.$router.push({
                    path: '/fuwuyuan/jingying/orderGl'
                  })
                }
              })
            } else if (data.status == 0) {
              this.$vux.alert.show({
                title: '提示',
                content: data.log,
                onHide() {
                  _this.$router.push({
                    path: '/fuwuyuan/jingying/orderGl'
                  })
                }
              })
            }
          })
        }

      }
    },
    computed: {
      orderId() {
        return this.$route.params.id;
      },
      zf() {
        return this.$route.params.zf;
      },
    },
    components: {
      bigTitle,
      Selector,
      XButton,
      Group,
      Popup,
      betterScroll,
      XTextarea
    },
    mixins: [checkLogin]
  };

</script>

<style lang='scss'>
  .order-detail-wrapper {
    height: 100%;
  }

  .order-detail {
    height: 100%;
    background: #f0f0f0;
    font-size: .373333rem/* 28/75 */
    ;
    .order-wrapper {
      margin-bottom: $bot;
      background: #ffffff;
      padding-left: .533333rem/* 40/75 */
      ;
      padding-bottom: .4rem/* 30/75 */
      ;
      .order-num {
        line-height: .853333rem/* 64/75 */
        ;

        border-bottom: 1px solid #f0f0f0;
      }
      .order-info {
        font-size: .32rem/* 24/75 */
        ;
        line-height: 2;
        .line {
          padding-right: .4rem/* 30/75 */
          ;
          display: flex;
          .title {
            flex: auto;
          }
          .content {
            flex: none;
            width: 7.333333rem/* 550/75 */
            ;
            ;
          }
        }

      }
    }
    .jiedan {
      padding: .533333rem/* 40/75 */
      ;
      background: #ffffff;
      line-height: 2;
      .date {
        margin-bottom: .533333rem/* 40/75 */
        ;
      }
      h2 {
        font-size: .48rem/* 36/75 */
        ;
        font-weight: bold;
      }
      h3 {
        font-size: .426667rem/* 32/75 */
        ;
        line-height: 2;
        margin-bottom: .266667rem/* 20/75 */
        ;
      }
      .text {
        font-size: .373333rem/* 28/75 */
        ;
        line-height: 2;
      }
      .img-boxs {
        .fw-img {
          float: left;
          width: 1.533333rem/* 115/75 */
          ;
          height: 1.533333rem/* 115/75 */
          ;
          margin-bottom: .4rem/* 30/75 */
          ;
        }
        &:after {
          content: '';
          display: block;
          clear: both;
        }
      }
    }

    .uploadImg {
      margin-bottom: $bot;
      padding: .533333rem 0;
      background: #ffffff;
      line-height: 2;
      .upload-wrapper {
        margin-bottom: .4rem/* 30/75 */
        ;
        margin-right: -.746667rem/* 56/75 */
        ;
        &::after {
          content: '';
          display: block;
          height: 0;
          clear: both;
        }
      }
      h3 {
        margin-bottom: .4rem/* 30/75 */
        ;
      }
      %box {
        width: 1.533333rem/* 115/75 */
        ;
        height: 1.533333rem/* 115/75 */
        ;
        margin-right: .746667rem/* 56/75 */
        ;
        float: left;
      }
      .upload-btn {
        @extend %box;
        border: 1px dashed #000000;
        line-height: 1.533333rem/* 115/75 */
        ;
      }
      .upload-box {
        position: relative;
        @extend %box;
        .img-box {
          width: 100%;
          height: 100%;
          overflow: hidden;
          .img {
            height: 100%;
          }
        }
        .icon-shanchuguanbicha2 {
          position: absolute;
          right: 0;
          top: 0;
          line-height: 1;
          transform: translate(50%, -50%);
        }
      }
    }
    .btns {
      display: flex;
      justify-content: space-between;
      background: #ffffff;
      padding: .533333rem/* 40/75 */
      ;
      .btn {
        width: 40%;
        margin-top: 0;
      }
    }
  }

</style>
