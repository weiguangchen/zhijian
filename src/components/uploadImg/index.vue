<template>
  <div class="uploadImage">
    <div class="upload-btn" @click="chooseImg">
      <img src="~img/public/uploadImgBtn.png" alt="" class="img">
    </div>
    <template v-if="previewImgs.length>0">
      <div class="img-box" v-for="(item,index) in previewImgs" :key="index" @click="previewImg(item,previewImgs)">
        <img :src="item" alt="" class="thumb">
        <i class="iconfont icon-shanchuguanbicha2" @click="deleteImg(index)"></i>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        system: 1,
        originImgs: [],
        previewImgs: [],
        tupian: []
      }
    },
    created() {
      this.checkSystem();
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
            _this.originImgs = _this.originImgs.concat(res.localIds);
            if (_this.system == 1) {
              // 安卓
              _this.previewImgs = _this.previewImgs.concat(res.localIds)
            } else if (_this.system == 2) {
              _this.$wx.getLocalImgData({
                localId: res.localIds[0], // 图片的localID
                success: function (res) {
                  _this.previewImgs = _this.previewImgs.concat(res.localData); // localData是图片的base64数据，可以用img标签显示
                }
              });
            }
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
              .get(_this.API_URL+"/Api/wechat/bcimg", {
                params: {
                  imgs: res.serverId
                }
              })
              .then(res => {
                console.log(res);
                _this.tupian = _this.tupian.concat(res.data);
                _this.$emit('uploadComplete', _this.tupian);
              });
          }
        });
      },
      deleteImg(index) {
        this.originImgs.splice(index, 1);
        this.previewImgs.splice(index, 1);
        this.tupian.splice(index, 1);
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
    .upload-btn,
    .img-box {
      margin-right: .48rem/* 36/75 */
      ;
      margin-bottom: .48rem/* 36/75 */
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
