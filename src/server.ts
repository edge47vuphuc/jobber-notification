import { winstonLogger } from '@edge47vuphuc/jobber-shared';
import { config } from '@notifications/config';
import { checkConnection } from '@notifications/elasticsearch';
import { createConnection } from '@notifications/queues/connection';
import { appRoutes } from '@notifications/routes';
import { Channel } from 'amqplib';
import { Application } from 'express';
import 'express-async-errors';
import http from 'http';
import { Logger } from 'winston';

const SERVER_PORT = 4001;
const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'NotificationServer', 'debug');

export const start = (app: Application): void => {
  startQueues();
  startElasticSearch();
  startServer(app);
  app.use('', appRoutes());
};

const startQueues = async (): Promise<void> => {
  const emailChannel: Channel = (await createConnection()) as Channel;
};

const startElasticSearch = (): void => {
  checkConnection();
};

const startServer = (app: Application): void => {
  try {
    const httpServer: http.Server = new http.Server(app);

    log.info(`Notification service has started with process id ${process.pid}`);

    httpServer.listen(SERVER_PORT, () => {
      log.info(`Notification service running on port ${SERVER_PORT}...`);
    });
  } catch (error) {
    log.log('error', 'Notification service startServer() method error:', error);
  }
};
