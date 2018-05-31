<template>
    <div class="my-title">
        <div class="left">
            <slot></slot>
        </div>
        <div class="right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {}
};
</script>

<style lang='scss'>
.my-title{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 1.026667rem;
    background: #ffffff;
    padding: 0 .4rem;
    border-bottom: 1px solid #dfdfdf;
    .left{
        @include font-dpr(17px);
    }
    .right{
        @include font-dpr(14px);
        color: #484848;
    }
}
</style>