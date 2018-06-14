<template>
    <div>
        <ViewBox class="shanghu-page creat-huodong">
            <bigTitle title='新建活动' @showPopup='showPopup'></bigTitle>
            <div class="form-box">
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
                <div class="form-group">
                    <h2 class="sub-title">服务缩略图:</h2>
                    <div class="uploadImage">
                        <div class="upload-btn" @click="chooseImg">点击添加<br/>图片</div>
                        <!-- 安卓预览图片 -->
                        <img :src="imgs || tupian" alt="" class="thumb" v-if="system == 1">
                        <!-- IOS预览图片 -->
                        <img :src="localData || tupian" alt="" v-else class="thumb">

                    </div>

                </div>
                <div class="form-group">
                    <h2 class="sub-title">城市</h2>
                    <Group class="reset-vux-input">
                        <Selector :options='add' :value-map="['id','city']" @on-change='changeCity' v-model="cityVal"></Selector>
                    </Group>
                </div>
                <div class="form-group" v-if="currentQy">
                    <h2 class="sub-title">区域</h2>
                    <Group class="reset-vux-input">
                        <Selector :options='currentQy' :value-map="['id','qy_name']" @on-change='changeQy' v-model="qyVal"></Selector>
                    </Group>
                </div>
                <div class="form-group" v-if="currentSq">
                    <h2 class="sub-title">社区</h2>
                    <Group class="reset-vux-input">
                        <Selector :options='currentSq' :value-map="['id','sq_name']" v-model="sqVal"></Selector>
                    </Group>
                </div>
                <div class="form-group">
                    <h2 class="sub-title">分类:</h2>
                    <Group class="reset-vux-input">
                        <Selector :options='one_class_list' :value-map="['id','class_name']" @on-change='changeOneClass' v-model="one_class_val"></Selector>
                    </Group>
                </div>
                <div class="form-group">
                    <h2 class="sub-title">支持门店:</h2>
                    <Checker type='checkbox' v-model="faceLVal" class="check-box" default-item-class="demo1-item" selected-item-class="demo1-item-selected icon-duigou iconfont">
                        <div class="check-item" v-for="(item,index) in face_list" :key="index">
                            <CheckerItem :value='item.id'></CheckerItem>
                            {{item.face_name}}
                        </div>

                    </Checker>
                </div>
                <div class="form-group">
                    <h2 class="sub-title">图文详情:</h2>
                    <Checker type='radio' v-model="detail" :radio-required='true' class="check-box" default-item-class="demo1-item" selected-item-class="demo1-item-selected icon-duigou iconfont">
                        <div class="check-item" v-for="(item,index) in detail_list" :key="index">
                            <CheckerItem :value='item.id'></CheckerItem>
                            {{item.hd_content_name}}(预览)
                        </div>
                    </Checker>
                </div>
                <div class="form-group">
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
                        <XInput v-model="jiesuanjia"></XInput>
                    </Group>
                </div>

                <XButton type='warn' class="xbtn" @click.native="submitFn" :disabled='submiting'>提交</XButton>
                <!-- <XButton type='warn' class="xbtn" @click.native="changeFw" v-else-if="step == 3 && querys">完成修改</XButton> -->
            </div>

        </ViewBox>

    </div>
</template>

<script>
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
  XNumber
} from "vux";
import { KeyBoard } from "vue-ydui/dist/lib.px/keyboard";
import bigTitle from "@/components/bigTitle/index";
import shanghuSelect from "@/components/shanghu_form/face_select";
import shanghuInput from "@/components/shanghu_form/input";
import wxConfig from "@/mixins/wxConfig.js";
import checkLogin from "@/mixins/checkLogin.js";
import Qs from "qs";

export default {
  data() {
    return {
      system: 1,
      submiting: false,
      one_class_list: [],
      fw_list: [],
      add: [],
      currentQy: [],
      currentSq: [],
      face_list: [],
      detail_list: [],
      localData: "",
      imgs: "",

      huodongname: "",
      sub_name: "",
      tupian: "",
      cityVal: "",
      qyVal: "",
      sqVal: "",
      one_class_val: "",
      faceLVal: [],
      detail: "",
      fw_selceted: [],
      yuanjia: 0,
      huodongjia: 0,
      jiesuanjia: 0
    };
  },
  created() {
    var _this = this;
    this.$emit("showPopup", false);

    this.$axios
      .get(this.API_URL + "/Api/YouHui/card_add", {
        params: {
          uid: _this.id
        }
      })
      .then(({ data }) => {
        console.log(data);
        _this.add = data.city;
        _this.one_class_list = data.hd_class;
        _this.face_list = data.face;
        _this.fw_list = data.fw;
      });

    // this.$axios.get('Api/YouHui/get_hd_content',{
    //     params:{
    //         id:
    //     }
    // })
    // this.$eruda.init();

    // this.$axios
    //   .get(_this.API_URL + "/api/ShopFw/shop_fw", {
    //     params: { shop_id: 1 }
    //   })
    //   .then(res => {
    //     console.log(res);
    //     _this.faceList = res.data.face;
    //     _this.one_class_all = res.data.fw_class;
    //     _this.two_class_all = res.data.fw;
    //   });

    // if (this.querys) {
    //   this.getOldInfo().then(res => {
    //     console.log("旧数据");
    //     console.log(res.fw_face);
    //     // console.log('门店数组')
    //     // console.log(JSON.parse(res.fw_face))
    //     this.fw_name = res.fw_mingzi;
    //     this.fw_short_info = res.sub_name;
    //     this.fw_intr = res.sub_content;
    //     this.one_class_val = res.fw_cid;
    //     this.two_class_val = res.fw_id;
    //     var face = res.fw_face.map(item => {
    //       return item.face_id;
    //     });
    //     this.face = face;
    //     this.tupian = res.fw_img;
    //     this.youxiao = parseInt(res.use_day);
    //     this.yuanjia = res.y_money;
    //     this.xianjia = res.money;
    //     this.jiesuanjia = res.j_money;
    //   });
    // }
  },

  methods: {
    showPopup(val) {
      this.$emit("showPopup", val);
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
        .get(_this.API_URL + "/Api/YouHui/get_hd_content", {
          params: {
            id: val
          }
        })
        .then(({ data }) => {
          console.log(data);

          _this.detail_list = data;
        });
    },
    submitFn() {
      //   this.submiting = true;
      var _this = this;
      //   const myparams = new URLSearchParams();
      //   myparams.append("param1",  [{
      //                 fw_name: '2131',
      //                 num: '12312',
      //                 fw_id: 1
      //             }, {
      //                 fw_name: '2131',
      //                 num: '12312',
      //                 fw_id: 1
      //             }, {
      //                 fw_name: '2131',
      //                 num: '12312',
      //                 fw_id: 1
      //             }]);
      const params = {
        card_name: _this.huodongname,
        card_money: _this.huodongjia,
        card_shopid: 1,
        card_ymoney: _this.yuanjia,
        card_jmoney: _this.jiesuanjia,
        card_content_id: _this.detail,
        card_city: _this.cityVal,
        qy_id: _this.qyVal,
        sq_id: _this.sqVal,
        bk_num: _this.fw_num
      };
      console.log(_this.fw_num);
      this.$axios
        .get(_this.API_URL + "/Api/YouHui/add_card", {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          //   params:myparams,
          params: {
            card_name: _this.huodongname,
            card_money: _this.huodongjia,
            card_shopid: 1,
            card_ymoney: _this.yuanjia,
            card_jmoney: _this.jiesuanjia,
            card_class_id: _this.one_class_val,
            card_content_id: _this.detail,
            city_id: _this.cityVal,
            qy_id: _this.qyVal,
            sq_id: _this.sqVal,
            bk_num: _this.fw_num,
            card_subname:_this.sub_name
          }
        })
        .then(({ data }) => {
          _this.submiting = false;
          console.log(data);
          if(data.status==1){
              _this.$router.replace('/shanghu/me/addhuodong')
          }
        });
    },

    // 获取已有数据
    getOldInfo() {
      var _this = this;
      return this.$axios
        .get(this.API_URL + "/api/ShopFw/edit_fw", {
          params: {
            id: _this.querys
          }
        })
        .then(res => {
          console.log(res.data.list[0]);
          return res.data.list[0];
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
        success: function(res) {
          // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          _this.imgs = res.localIds;
          if (_this.system == 1) {
            _this.uploadImg();
            return false;
            // 安卓
          } else if (_this.system == 2) {
            _this.$wx.getLocalImgData({
              localId: res.localIds[0], // 图片的localID
              success: function(res) {
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
        success: function(res) {
          var serverId = res.serverId; // 返回图片的服务器端ID
          _this.$axios
            .get("/api/api/wechat/bcimg", {
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
    }
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
          //   item = JSON.stringify(item);
          arr.push(item);
        }
      });
      //   arr = JSON.stringify(arr);
      return arr;
    }
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
    XNumber
  },
  mixins: [wxConfig, checkLogin]
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
.creat-huodong {
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

  .check-box {
    display: flex;
    flex-wrap: wrap;
    %checker {
      width: 0.533333rem;
      height: 0.533333rem;
      border-radius: 50%;
      margin-right: 0.213333rem;
    }
    .demo1-item {
      @extend %checker;
      border: 1px solid #000000;
    }
    .demo1-item-selected {
      position: relative;
      color: #df3331;
      &::before {
        @include font-dpr(12px);
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
    .check-item {
      margin-bottom: 0.586667rem;
      margin-right: 1.333333rem;
      flex: none;
      @include font-dpr(14px);
      display: flex;
      align-items: center;
    }
  }
}
</style>