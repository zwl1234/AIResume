<script setup lang="ts">
import { ref } from "vue";
import SvgIcon from "./SvgIcon.vue";

defineProps<{ msg: string }>();

const count = ref(0);
</script>

<script lang="ts">
export default {
  name: "HelloWorld",
};
</script>

<template>
  <SvgIcon iconName="example" className="custom-class" />
  <a-space wrap>
    <a-button type="primary">Primary Button</a-button>
    <a-button>Default Button</a-button>
    <a-button type="dashed">Dashed Button</a-button>
    <a-button type="text">Text Button</a-button>
    <a-button type="link">Link Button</a-button>
  </a-space>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}

.custom-class {
  background-color: black;
}
</style>
