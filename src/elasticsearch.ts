import { winstonLogger } from '@edge47vuphuc/jobber-shared';
import { Client } from '@elastic/elasticsearch';
import { ClusterHealthHealthResponseBody } from '@elastic/elasticsearch/lib/api/types';
import { config } from '@notifications/config';
import { Logger } from 'winston';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'NotificationElasticSearchService', 'debug');

const elasticSearchClient = new Client({
  node: `${config.ELASTIC_SEARCH_URL}`
});

export const checkConnection = async (): Promise<void> => {
  let isConnected = false;

  while (!isConnected) {
    try {
      const health: ClusterHealthHealthResponseBody = await elasticSearchClient.cluster.health({});
      log.info(`Notification service ElasticSearch health status - ${health.status}`);
      isConnected = true;
    } catch (error) {
      log.error('Connection to ElasticSearch failed. Retrying...');
      log.log('error', 'Notification service checkConnection() method error:', error);
    }
  }
};
