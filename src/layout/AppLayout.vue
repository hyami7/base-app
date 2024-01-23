<script setup>
import appMenu from './components/menu/appMenu'
import toggleSideBar from './components/menu/toggleSideBar'
import fullScreen from './components/header/fullScreen'
import setting from './components/header/setting'
import userInfo from './components/header/userInfo'
import message from './components/header/message'
import { useUserStore } from '@/store/modules/user'
import { useTabsStore } from '@/store/modules/tabs'
import { useRouter } from 'vue-router'
import { handleAdminRoute, getFirstRoute, routePush } from '@/utils/router'
import { ref, onMounted } from 'vue'
import tabs from './components/tabs/tab'
import mainView from './components/mainView'
import { initWaterMark } from '@/utils/watermark'
import { qiankunWindow } from 'vite-plugin-qiankun/dist/helper'
const isQiankun = qiankunWindow.__POWERED_BY_QIANKUN__

const userStore = useUserStore()
const tabsStore = useTabsStore()
const router = useRouter()
const inputRef = ref(null)
const handleSearch = () => {
  tabsStore.setIsSearchMenu(!tabsStore.isSearchMenu)
  if (tabsStore.isSearchMenu) {
    inputRef.value.focus()
  }
}

handleAdminRoute(userStore.user.menus[0].tree, router)
// 跳转到第一个菜单
let firstRoute = getFirstRoute(tabsStore.routeViews, router)
if (firstRoute) {
  routePush(firstRoute.path, router)
}

onMounted(() => {
  initWaterMark(userStore.user.username)
})
</script>

<template>
  <el-container class="base-layout">
    <el-header class="base-layout__header" v-if="!isQiankun">
      <div class="base-layout__header--logo">
        <img src="@/assets/images/home/logo@2x.png" alt="logo" />
      </div>
      <div class="base-layout__header--btns">
        <el-input
          v-model="tabsStore.searchMenuText"
          @change="(val) => tabsStore.setSearchMenuText(val)"
          style="width: 120px"
          v-show="tabsStore.isSearchMenu"
          @blur="tabsStore.setIsSearchMenu(false)"
          placeholder="请输入"
          ref="inputRef"
        ></el-input>
        <div @click="handleSearch">
          <el-icon>
            <Search />
          </el-icon>
        </div>

        <message />

        <fullScreen />

        <userInfo />

        <setting />
      </div>
    </el-header>
    <el-container>
      <el-aside class="base-layout__aside" width="200px" v-if="!isQiankun">
        <el-scrollbar style="height: calc(100vh - var(--base-header-height))">
          <appMenu class="base-layout__aside--menu" />

          <div class="base-layout__aside--collapse">
            <toggleSideBar />
          </div>
        </el-scrollbar>
      </el-aside>
      <el-main>
        <tabs v-if="!isQiankun" />
        <mainView />
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
@include B(layout) {
  width: 100%;
  height: 100%;

  @include e(header) {
    display: flex;
    align-items: center;
    background-color: #b3c0d1;
    justify-content: space-between;
    padding: 0;

    @include m(logo) {
      display: flex;
      align-items: center;
      width: 200px;
      height: 100%;

      img {
        width: 100%;
      }
    }

    @include m(btns) {
      cursor: pointer;
      height: 100%;
      display: flex;
      align-items: center;
      margin-right: 8px;
      font-size: 18px;

      > * {
        padding: 8px;
      }

      div {
        display: flex;
        align-items: center;
        height: 100%;
        padding: 8px;
      }
    }
  }

  @include e(aside) {
    overflow: hidden;
    position: relative;
    width: auto;
    background-color: var(--side-bg-color);

    @include m(menu) {
      height: calc(100% - 40px);
      padding-bottom: 40px;
    }

    @include m(collapse) {
      cursor: pointer;
      position: absolute;
      left: 0;
      bottom: 0;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      font-size: 18px;
      color: #fff;
      background-color: var(--side-bg-color);

      i {
        width: 100%;
      }
    }
  }

  .sk-menu {
    border: none;
  }

  .sk-main {
    padding: 0;
  }
}
</style>
