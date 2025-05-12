import { createApp } from 'vue';
import './plugins/assets';
import type { LogtoConfig } from '@logto/vue';
import { createLogto } from '@logto/vue';
import { setupAppVersionNotification, setupDayjs, setupIconifyOffline, setupLoading, setupNProgress } from './plugins';
import { setupStore } from './store';
import { setupRouter } from './router';
import { setupI18n } from './locales';
import App from './App.vue';

const config: LogtoConfig = {
  endpoint: 'https://5sj5z7.logto.app/',
  appId: 'ww36b2ltwd4unm0wto786'
};
async function setupApp() {
  setupLoading();

  setupNProgress();

  setupIconifyOffline();

  setupDayjs();

  const app = createApp(App);

  setupStore(app);

  await setupRouter(app);

  setupI18n(app);

  setupAppVersionNotification();
  app.use(createLogto, config);
  app.mount('#app');
}

setupApp();
