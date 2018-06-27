import path from 'path';
import App from '@headnhead/astra-framework';
import Boom from 'boom';
import router from 'routes';
import parseBody from 'koa-body';
import helment from 'koa-helmet';

const app = new App({
  configDir: path.resolve(__dirname, '../config'),
});

app.on('error', error => app.make('logger').error(error));

app.use(helment());
app.use(parseBody());

app.use(router.routes());

app.use(router.allowedMethods({
  throw: true,
  notImplemented: () => (new Boom()).notImplemented(),
  methodNotAllowed: () => (new Boom()).methodNotAllowed(),
}));

export default app;
