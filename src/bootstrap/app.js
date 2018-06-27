import path from 'path';
import App from '@headnhead/astra-framework';
import routes from 'routes';

const app = new App({
  configDir: path.resolve(__dirname, '../config'),
});

app.use(routes);

export default app;
