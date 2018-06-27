import Router from 'koa-router';
import WelcomeController from 'controllers/welcome-controller';

const router = new Router();

router.get('/', WelcomeController);

export default router.routes();
