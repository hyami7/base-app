import { nextTick } from "vue";
import { loadCss, loadJs } from "./common";
import * as elIcons from "@element-plus/icons-vue";
import { qiankunWindow } from "vite-plugin-qiankun/dist/helper";
const routePrefix = qiankunWindow.__POWERED_BY_QIANKUN__
  ? import.meta.env.VITE_AXIOS_BASE_URL
  : "";

/**
 * 动态的加载样式表，以实现：获取样式表内容（图标名称列表等）
 */
const cssUrls = [routePrefix + "/fontAwesome/font-awesome.min.css"];
const jsUrls = [];

/*
 * 加载预设的字体图标资源
 */
export default function init() {
  if (cssUrls.length > 0) {
    cssUrls.map((v) => {
      loadCss(v);
    });
  }

  if (jsUrls.length > 0) {
    jsUrls.map((v) => {
      loadJs(v);
    });
  }
}
