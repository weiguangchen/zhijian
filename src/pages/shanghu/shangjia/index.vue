<template>
    <div class="page">
        <Group>
            <x-input title="服务项目名称" v-model="fw_name"></x-input>
            <x-input title="原价" v-model="yuanjia"></x-input>
            <x-input title="现价" v-model="xianjia"></x-input>
            <x-input title="平台结算价" v-model="jiesuanjia"></x-input>
            <x-input title="有效期" v-model="youxiao"></x-input>
            <Selector title='一级类' :options='one_class' :value-map="['id','class_name']" v-model="one_class_val"></Selector>
            <Selector title='二级类' :options='two_class' :value-map="['id','fw_name']" v-model="two_class_val"></Selector>
            <Checker type='checkbox' v-model="face" default-item-class="demo1-item" selected-item-class="demo1-item-selected">
                <CheckerItem :value='item.id' v-for="(item,index) in faceList" :key="index">{{item.face_name}}</CheckerItem>
            </Checker>
        </Group>
        <span @click='chooseImg'>选择图片</span>
        <span @click="uploadImg">上传图片</span>
        <div class="imgs">
            <!-- <img :src="item" alt="" v-for="(item,index) in androidImgs" :key="index" class="an img" v-if="system == 1"> -->
            <!-- <img :src="item" alt="" v-for="(item,index) in iosImgs" :key="index" class="ios img"> -->
            <!-- <img :src="iosImgs" alt=""> -->
        </div>
        <XButton type='warn' @click.native="submit">提交</XButton>
    </div>
</template>

<script>
import { Group, XInput, Selector, Checker, CheckerItem, XButton } from "vux";
export default {
  data() {
    return {
      imgs: [],
      localData: [],
      system: 1,
      one_class: [],
      two_class: [],
      faceList: [],

      fw_name: "",
      yuanjia: "",
      xianjia: "",
      jiesuanjia: "",
      youxiao: "",
      one_class_val: "",
      two_class_val: "",
      face: [],
      tupian: ""
    };
  },
  created() {
    var _this = this;
    this.$eruda.init();
    this.checkSystem();
    this.$axios
      .get("/api/api/wechat/sharewx", {
        params: {
          url: window.location.href
        }
      })
      .then(res => {
        console.log(res);
        return res.data;
      })
      .then(res => {
        this.$wx.config({
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: "wxa9ee7e36e84d8478", // 必填，公众号的唯一标识
          timestamp: res.time, // 必填，生成签名的时间戳
          nonceStr: res.noncestr, // 必填，生成签名的随机串
          signature: res.signature, // 必填，签名
          jsApiList: [
            "chooseImage",
            "previewImage",
            "uploadImage",
            "getLocalImgData"
          ] // 必填，需要使用的JS接口列表
        });
      });

    this.$axios
      .get("/api/api/ShopFw/shop_fw", {
        params: { shop_id: 1 }
      })
      .then(res => {
        console.log(res);
        _this.faceList = res.data.face;
        _this.one_class = res.data.fw_class;
        _this.two_class = res.data.fw;
      });
  },
  methods: {
    submit() {
        // console.log(this.fw_name);
        // console.log(this.yuanjia);
        // console.log(this.xianjia);
        // console.log(this.jiesuanjia);
        // console.log(this.youxiao);
        // console.log(this.one_class_val);
        // console.log(this.two_class_val);
        // console.log(this.face);
      //   var data = {};
      //   data.fw_mingzi = this.fw_name;
      //   data.y_money = this.yuanjia;
      //   data.money = this.xianjia;
      //   data.j_money = this.jiesuanjia;
      //   data.use_day = this.youxiao;
      //   data.fw_cid = this.one_class_val;
      //   data.fw_id = this.two_class_val;
      //   data.fw_face = this.face;
      //   data.fw_img = this.tupian;
      //   data.shop_id = 1;

      this.$axios
        .get("/api/api/ShopFw/add_shop_fw", {
          params: {
            fw_mingzi: this.fw_name,
            y_money: this.yuanjia,
            money: this.xianjia,
            j_money: this.jiesuanjia,
            use_day: this.youxiao,
            fw_cid: this.one_class_val,
            fw_id: this.two_class_val,
            fw_face: this.face,
            fw_img: this.tupian,
            shop_id: 1
          }
        })
        .then(res => {
          //   成功返回1不成功返回0
          console.log(res);
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
            // 安卓
          } else if (_this.system == 2) {
            _this.$wx.getLocalImgData({
              localId: res.localIds[0], // 图片的localID
              success: function(res) {
                _this.localData.push(res.localData); // localData是图片的base64数据，可以用img标签显示
              }
            });
          }
        }
      });
    },
    uploadImg() {
      var _this = this;
      var imgs;
      //   if(_this.system == 1){
      //       imgs = this.androidImgs;
      //   }else{
      //       imgs = this.iosImgs;
      //   }
      console.log(this.imgs);
      this.$wx.uploadImage({
        localId: _this.imgs[0].toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function(res) {
          console.log("上传返回值");
          console.log(res);
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
          var serverId = res.serverId; // 返回图片的服务器端ID
        }
      });
    }
  },
  components: {
    Group,
    XInput,
    Selector,
    Checker,
    CheckerItem,
    XButton
  }
};
</script>

<style lang='scss'>
.imgs {
  display: flex;
  .img {
    width: 30%;
    flex: none;
  }
}
.demo1-item {
  border: 1px solid #ececec;
  padding: 5px 15px;
}
.demo1-item-selected {
  border: 1px solid green;
}
</style>