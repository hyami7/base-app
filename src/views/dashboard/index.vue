<template>
  <div ref="tableRef">
    <div>控制台</div>
    <span class="icon iconfont icon-sidebar_a1"></span>
    <span class="icon fa fa fa-dashboard"></span>
    <IconSelector @change="onCommitMenuDefaultIcon($event, 'menuDefaultIcon')" v-model:modelValue="icon" />
  </div>
</template>

<script setup>
import { ref, onMounted, onActivated } from 'vue';
import IconSelector from '@/components/iconSelector';
const icon = ref('search');
const onCommitMenuDefaultIcon = () => {};
const tableRef = ref(null);
onMounted(() => {
  console.log('onMounted');
});
onActivated(() => {
  console.log('onActivated');
});
</script>
