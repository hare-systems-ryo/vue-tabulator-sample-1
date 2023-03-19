import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';


// import  "tabulator-tables/src/scss/themes/materialize/tabulator_materialize.scss"
// import  "tabulator-tables/src/scss/themes/tabulator_simple.scss"
// import  "tabulator-tables/src/scss/themes/tabulator_midnight.scss"

import './scss/style.scss';







import { createApp } from 'vue';
import App from './script/root-view.vue';
dayjs.extend(advancedFormat);
const vueApp = createApp(App);
vueApp.mount('#app');

//エラー確認用
vueApp.config.errorHandler = (err, vm, info) => {
  console.log(`Captured in Vue.config.errorHandler: ${info}`, err);
};
window.addEventListener('error', (event: any) => {
  if (
    'message' in event &&
    event.message === 'ResizeObserver loop limit exceeded'
  ) {
    return;
  }
  console.log('Captured in error EventListener', event, event.error);
});
window.addEventListener('unhandledrejection', (event) => {
  console.log('Captured in unhandledrejection EventListener', event.reason);
});
