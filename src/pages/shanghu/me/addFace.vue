<template>
    <div class="shanghu-page add-face">
        <bigTitle title='添加门店'></bigTitle>
        <div class="form-box">
            <h2 class="sub-title">门店名称:</h2>
            <Group class="reset-vux-input">
                <XInput v-model="face_name"></XInput>
            </Group>
            <XButton type='warn' class="xbtn" @click.native='add_face' v-if="!faceId">增加门店</XButton>
            <XButton type='warn' class="xbtn" @click.native='change_face' v-else>提交修改</XButton>
        </div>

    </div>
</template>

<script>
import bigTitle from "@/components/bigTitle/index";
import wxConfig from "@/mixins/wxConfig.js";
import { XInput, Group, XButton } from "vux";
export default {
  data() {
    return {
      face_name: ""
    };
  },
  created() {
    var _this = this;
    if (this.faceId) {
      this.$axios
        .get(this.API_URL + "/Api/Shop/face_edit", {
          params: {
            id: _this.faceId
          }
        })
        .then(({ data }) => {
          console.log(data);
          _this.face_name = data[0].face_name;
        });
    }
  },
  methods: {
    add_face() {
      var _this = this;
      this.$axios
        .get(this.API_URL + "/Api/Shop/add_face", {
          params: {
            face_name: _this.face_name,
            fw_shop_id: 1
          }
        })
        .then(({ data }) => {
          console.log(data);
          if (data.status == 1) {
            this.$vux.alert.show({
              title: "提示",
              content: "添加门店成功！",
              onHide() {
                _this.$router.replace({
                  path: "/shanghu/me/mendian"
                });
              }
            });
          } else if (data.status == 0) {
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
        });
    },
    change_face() {
      var _this = this;
      if (!this.face_name) {
        this.$vux.alert.show({
          title: "提示",
          content: "请填写正确店名！"
        });
        return false;
      } else {
        this.$axios
          .get(this.API_URL + "/Api/Shop/edit_face", {
            params: {
              face_name: _this.face_name,
              id: _this.faceId
            }
          })
          .then(({ data }) => {
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
      }
    }
  },
  components: {
    bigTitle,
    XInput,
    Group,
    XButton
  },
  computed: {
    faceId() {
      return this.$route.query.faceId;
    }
  },
  mixins: [wxConfig]
};
</script>

<style lang='scss'>
.add-face {
  .xbtn {
    margin-top: 0.666667rem;
  }
}
</style>