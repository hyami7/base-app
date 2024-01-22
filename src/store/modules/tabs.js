import { defineStore } from "pinia";
import { store } from "@/store/index";
import { Local } from "@/utils/storage";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";
import { TAB_STORE } from "../constants";

const state = {
  // tab
  tabs: [],
  routeViews: [],

  // 菜单搜索
  searchMenuText: "",
  isSearchMenu: false,

  // keepalive
  activeKey: "",
  keepaliveList: [],
};

export const useTabsStore = defineStore({
  id: "tabs",
  state: () => state,
  getters: {},
  actions: {
    // tab
    setTabs(tabs) {
      this.tabs = tabs;
    },
    addTabs(tab) {
      const target = this.tabs.find((item) => item.name === tab.name);
      if (target) return;
      this.tabs.push(tab);
    },
    setRouteViews(menus) {
      this.routeViews = menus;
    },

    // 菜单搜索
    setSearchMenuText(val) {
      this.searchMenuText = val;
    },
    setIsSearchMenu(bool) {
      this.isSearchMenu = bool;
    },

    // keepalive
    setActiveKey(path) {
      this.activeKey = path;
    },
    addKeepaliveList(menu) {
      const target = this.keepaliveList.find((x) => x === menu.name);
      if (target) return;
      this.keepaliveList.push(menu.name);
    },
    setKeepaliveList(list) {
      this.keepaliveList = list;
    },
  },
  persist: {
    key: TAB_STORE,
  },
});

// 在组件setup函数外使用
export function useTabsStoreWithOut() {
  return useTabsStore(store);
}
