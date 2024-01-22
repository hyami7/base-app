<template>
  <div ref="tableRef">
    <div>控制台</div>
    <IconSelector
      @change="onCommitMenuDefaultIcon($event, 'menuDefaultIcon')"
      v-model:modelValue="icon"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onActivated } from "vue";
import IconSelector from '@/components/iconSelector'
const icon = ref('search');
const onCommitMenuDefaultIcon = () => {};
const tableRef = ref(null);
onMounted(() => {
  console.log("onMounted");
});
onActivated(() => {
  console.log("onActivated");
});
</script>
