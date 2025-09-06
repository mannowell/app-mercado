import { createPinia } from 'pinia';
import { App } from 'vue';

const pinia = createPinia();

export function setupStore(app: App) {
  app.use(pinia);
}

export * from './modules';
