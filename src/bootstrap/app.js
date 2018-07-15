import app from 'bootstrap/create-app';
import Boom from 'boom';
import router from 'routes';
import parseBody from 'koa-body';
import helment from 'koa-helmet';

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
