<template>
    <div class="form-group">
        <Group>
            <XInput v-model="val"></XInput>
        </Group>
    </div>
</template>

<script>
import { XInput, Group } from "vux";
export default {
  data() {
    return {};
  },
  props: ['val'],
  components: {
    Group,
    XInput
  }
};
</script>

<style lang='scss'>
</style>