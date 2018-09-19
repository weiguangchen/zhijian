<template>
  <div class="uploadImage">
    <div class="upload-btn" @click="chooseImg">
      <img src="~img/public/uploadImgBtn.png" alt="" class="img">
    </div>

    <div class="img-box" v-for="(item,index) in value" :key="index" @click="previewImg(item,value)">
      <img :src="item" alt="" class="thumb">
      <i class="iconfont icon-shanchuguanbicha2" @click="deleteOldImg(index)" v-if="multiple"></i>
    </div>
    <!-- <template v-if="old.length>0">
      <div class="img-box" v-for="(item,index) in old" :key="index" @click="previewImg(item,all_tupian)">
        <img :src="item" alt="" class="thumb">
        <i class="iconfont icon-shanchuguanbicha2" @click="deleteOldImg(index)" v-if="multiple"></i>
      </div>
    </template>
    <template v-if="previewImgs.length>0">
      <div class="img-box" v-for="(item,index) in previewImgs" :key="index" @click="previewImg(item,all_tupian)">
        <img :src="item" alt="" class="thumb">
        <i class="iconfont icon-shanchuguanbicha2" @click="deleteImg(index)" v-if="multiple"></i>
      </div>
    </template> -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        system: 1,
        old: [],
        originImgs: [],
        /* 原图 */
        previewImgs: [],
        /* 预览图 */
        tupian: [] /* 上传图 */
      }
    },
    props: {
      value: {
        default: [] /* 旧图片 */
      },
      multiple: {
        default: false
      },
      oldImgs: {
        required: false,
        default () {
          return []
        }
      }
    },
    computed: {
      all_tupian() {
        return this.old.concat(this.tupian);
      },
    },
    created() {
      this.checkSystem();
      console.log('初始化upload')
      // if (this.oldImgs) {
      //   this.old = this.oldImgs;
      // }
      // if (this.multiple) {
      //   // 多图上传
      // } else {
      //   // 单图上传
      // }

    },
    methods: {
      chooseImg() {
        var _this = this;
        this.$wx.chooseImage({
          count: 1, // 默认9
          sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片



            // if (!_this.multiple) {
            //   _this.originImgs = [];
            //   _this.previewImgs = [];
            //   _this.tupian = [];
            //   _this.old = [];
            // }
            // _this.originImgs = _this.originImgs.concat(res.localIds);
            // if (_this.system == 1) {
            //   // 安卓
            //   _this.previewImgs = _this.previewImgs.concat(res.localIds)
            // } else if (_this.system == 2) {
            //   _this.$wx.getLocalImgData({
            //     localId: res.localIds[0], // 图片的localID
            //     success: function (res) {
            //       _this.previewImgs = _this.previewImgs.concat(res.localData); // localData是图片的base64数据，可以用img标签显示
            //     }
            //   });
            // }

            // if (_this.system == 1) {
            //   // 安卓
            //   _this.previewImgs = _this.previewImgs.concat(res.localIds)
            // } else if (_this.system == 2) {
            //   _this.$wx.getLocalImgData({
            //     localId: res.localIds[0], // 图片的localID
            //     success: function (res) {
            //       _this.previewImgs = _this.previewImgs.concat(res.localData); // localData是图片的base64数据，可以用img标签显示
            //     }
            //   });
            // }


            _this.$vux.loading.show({
              text: '上传图片中'
            })
            _this.uploadImg(res.localIds[0]);

          }
        });
      },
      uploadImg(img) {
        var _this = this;
        this.$wx.uploadImage({
          localId: img.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
            console.log("上传返回值");
            console.log(res);
            var serverId = res.serverId; // 返回图片的服务器端ID
            _this.$axios
              .get("/Api/wechat/bcimg", {
                params: {
                  imgs: res.serverId
                }
              })
              .then(res => {
                _this.$vux.loading.hide()
                console.log(res);

                if (!_this.multiple) {
                  _this.value = []
                }
                _this.value = _this.value.concat(res.data);
                _this.$emit('input', _this.value);

                // _this.tupian = _this.tupian.concat(res.data);
                // _this.$emit('uploadComplete', _this.all_tupian);
              });
          },
          fail: function (err) {
            _this.$vux.alert.show({
              title: '提示',
              content: '上传失败,请重试'
            })
          }
        });
      },
      deleteImg(index) {
        this.originImgs.splice(index, 1);
        this.previewImgs.splice(index, 1);
        this.tupian.splice(index, 1);
        this.$emit('uploadComplete', this.all_tupian);
      },
      deleteOldImg(index) {
        this.value.splice(index, 1);
        this.$emit('input', this.value);
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
      previewImg(curimg, allimg) {
        this.$wx.previewImage({
          current: curimg, // 当前显示图片的http链接
          urls: allimg // 需要预览的图片http链接列表
        });
      },
    },
    components: {

    }
  }

</script>

<style lang='scss'>
  .uploadImage {
    padding: 0.4rem;
    background: #ffffff;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: -.48rem
      /* 36/75 */
    ;

    .upload-btn,
    .img-box {
      margin-right: .48rem
        /* 36/75 */
      ;
      margin-bottom: .48rem
        /* 36/75 */
      ;
    }

    .upload-btn {
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 2rem;
      height: 2rem;
      background: #ececec;

      .img {
        width: 0.853333rem;
      }
    }

    .img-box {
      width: 2rem;
      height: 2rem;
      flex: none;
      position: relative;

      .icon-shanchuguanbicha2 {
        position: absolute;
        right: 0;
        top: 0;
        transform: translate(50%, -50%);
      }

      .thumb {
        width: 100%;
        height: 100%;
      }
    }
  }

</style>
