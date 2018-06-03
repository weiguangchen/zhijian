<template>
    <div class="shanghu-page">
        <ViewBox>
            <bigTitle title='经营管理' ></bigTitle>
            <div class="my-form">
                <div class="form-box">
                    <Group>
                        <Cell title='优惠下载查看' :is-link='true'></Cell>
                        <Cell title='活动验证' :is-link='true'></Cell>
                        <Cell title='消费统计' :is-link='true' link='/shanghu/jingying/tongji'></Cell>
                        <Cell title='订单管理' :is-link='true' link='/shanghu/jingying/orderGl'></Cell>
                        
                    </Group>
                </div>

            </div>
        </ViewBox>
    </div>
</template>

<script>
import { ViewBox, Selector, Group, XButton, XInput, Confirm, Cell } from "vux";
import bigTitle from "@/components/bigTitle/index";
import shanghuSelect from "@/components/shanghu_form/face_select";
import shanghuInput from "@/components/shanghu_form/input";
export default {
  data() {
    return {
      pay_num: "",
      face_id: "",
      faceList: [],
      alertShow: false,
      xiaofeijuan: ""
    };
  },
  created() {},
  methods: {},
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
    Cell
  }
};
</script>

<style lang='scss' scoped>
.weui-cell {
  @include font-dpr(14px);
  height: 1.28rem;
  padding-left: 0;
  padding-right: 0;
  &::before {
    left: 0;
  }
}
</style>