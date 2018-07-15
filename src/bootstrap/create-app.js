import path from 'path';
import App from '@headnhead/astra-framework';

global.app = new App({
  configDir: path.resolve(__dirname, '../config'),
});

export default app;
