import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "@/store/index";
import "./styles/index.scss";
import ElementPlus from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(ElementPlus, { zIndex: 3000, locale: zhCn });

app.use(router);
app.use(store);
app.mount("#base-app");
