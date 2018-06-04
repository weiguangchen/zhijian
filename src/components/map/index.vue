<template>
    <div class="map-box">
        <iframe id="mapPage" width="100%" height="100%" frameborder=0 src="http://apis.map.qq.com/tools/locpicker?search=1&type=1&key=62KBZ-2WXKQ-5GI53-GDT33-LKMPV-34FWO&referer=myapp">
        </iframe>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {
    var _this = this;
    window.addEventListener(
      "message",
      function(event) {
        // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
        var loc = event.data;
        if (loc && loc.module == "locationPicker") {
          //防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
          _this.$emit("finishAdd", loc);
        }
      },
      false
    );
  },
  methods: {},
  components: {}
};
</script>

<style lang='scss'>
.map-box {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background-color: #ffffff;
}
</style>