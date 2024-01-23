<template>
  <div class="base-main">
    <el-scrollbar ref="mainScrollbarRef" class="base-main__scroll">
      <router-view v-slot="{ Component }">
        <transition name="slide-right" mode="out-in">
          <keep-alive :include="tabsStore.keepaliveList">
            <component :is="Component" :key="tabsStore.activeKey" />
          </keep-alive>
        </transition>
      </router-view>
    </el-scrollbar>
  </div>
</template>

<!--
  keepalive不生效 
  1./utils/router.js 中的 keepalive 配置是否设置
  2.路由导入对应文件的 name 是否设置
-->

<script setup>
import { watch } from 'vue'
import { useTabsStore } from '@/store/modules/tabs'
import { useRoute } from 'vue-router'

const route = useRoute()
const tabsStore = useTabsStore()

watch(
  () => route.path,
  () => {
    tabsStore.setActiveKey(route.path)
    tabsStore.addKeepaliveList(route)
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
@include B(main) {
  height: calc(100vh - var(--base-header-height) - var(--base-tab-height));
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
  overflow: hidden;

  background-color: #e9eef3;

  @include e(scroll) {
    width: 100%;
    height: 100%;
  }
}
</style>
