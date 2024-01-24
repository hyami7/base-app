import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { store } from '@/store/index';
import './styles/index.scss';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import { renderWithQiankun, qiankunWindow } from 'vite-plugin-qiankun/dist/helper';

let app;

function render(props) {
  const { container } = props;
  app = createApp(App);
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }
  const element = container ? container.querySelector('#base-app') : document.getElementById('base-app');

  app.use(ElementPlus, { zIndex: 3000, locale: zhCn });
  app.use(router);
  app.use(store);
  app.mount(element);
}

renderWithQiankun({
  mount(props) {
    localStorage.setItem('inQianKun', qiankunWindow.__POWERED_BY_QIANKUN__);
    render(props);
  },
  bootstrap() {
    console.log('base-app bootstrap');
  },
  unmount(props) {
    console.log('base-app unmount');
    app.unmount();
  },
  update(props) {
    console.log('base-app update');
    console.log(props);
  },
});
if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  render({});
}
