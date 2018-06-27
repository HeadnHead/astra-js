import os from 'os';
import cluster from 'cluster';
import { delay } from 'lodash/fp';
import { times, multiply, pipe } from 'ramda';

import app from './app';

const logger = app.make('logger');

const startMaster = () => {
  const forkClusterWithDelay = pipe(multiply(1000), ms => delay(ms, cluster.fork));

  times(forkClusterWithDelay, process.env.WEB_CONCURRENCY || os.cpus().length);

  cluster.on('exit', (worker) => {
    logger.info(`Worker ${worker.process.pid} died, forking new worker`);
    cluster.fork();
  });
};

const startWorker = () => {
  const port = process.env.APP_PORT || 3000;

  app.listen(port);

  logger.info(`quinncia-resume-analysis-server worker ${process.pid} started on port ${port}`, {
    event: 'start',
    port,
  });

  if (process.send) {
    process.send('online');
  }

  process
    .on('unhandledRejection', (reason, p) => logger.warn(reason, p))
    .on('uncaughtException', () => process.exit(1));
};

if (cluster.isMaster) {
  startMaster();
} else {
  startWorker();
}
