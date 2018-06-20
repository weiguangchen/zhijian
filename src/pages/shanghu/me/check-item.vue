<template>
    <div>
        {{tabbar}}
        <CheckBoxGroup v-model="tabbar" class="check-title">
            <CheckBox shape="circle" :val='check.id'>{{check.name}}</CheckBox>
            {{tabbarSon}}
            <CheckBoxGroup v-model="tabbarSon" class="son-box">
                <CheckBox shape="circle" :val='son.id' v-for="(son,index) in check.son" :key="index">{{son.name}}</CheckBox>
            </CheckBoxGroup>
        </CheckBoxGroup>

    </div>
</template>

<script>
import { CheckBox, CheckBoxGroup } from "vue-ydui/dist/lib.rem/checkbox";
export default {
  data() {
    return {
      tabbar: [],
      tabbarSon: [],
      tabbared: false
    };
  },
  props: ["check"],
  methods: {},
  watch: {
    tabbarSon() {
      if (this.tabbar.length > 0) {
        this.$emit("changeCheck", this.tabbarItem);
      }
    },
    tabbar() {
      this.$emit("changeCheck", this.tabbarItem);
    }
  },
  computed: {
    tabbarItem() {
      let tabbar = {};
      if (this.tabbar.length > 0) {
        tabbar.tabbarRouter = true;
      } else {
        tabbar.tabbarRouter = false;
      }
      tabbar.id = this.tabbar[0];
      tabbar.son = this.tabbarSon;
      return tabbar;
    }
  },
  components: {
    CheckBox,
    CheckBoxGroup
  }
};
</script>

<style lang='scss'>
</style>