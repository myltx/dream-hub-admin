import type { App } from 'vue';
import type { LogtoConfig } from '@logto/vue';
import { createLogto } from '@logto/vue';

export const setupLogto = (app: App) => {
  const { VITE_LOGTO_ENDPOINT, VITE_LOGTO_APP_ID, VITE_BACKEND_ENDPOINT } = import.meta.env;

  const config: LogtoConfig = {
    endpoint: VITE_LOGTO_ENDPOINT,
    appId: VITE_LOGTO_APP_ID,
    resources: [VITE_BACKEND_ENDPOINT]
  };

  app.use(createLogto, config);
};
