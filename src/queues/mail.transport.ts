import { IEmailLocals, winstonLogger } from '@edge47vuphuc/jobber-shared';
import { config } from '@notifications/config';
import { emailTemplate } from '@notifications/helper';
import { Logger } from 'winston';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'NotificationMailTransport', 'debug');

export const sendEmail = async (template: string, receiverEmail: string, locals: IEmailLocals): Promise<void> => {
  try {
    // mail tempalte
    emailTemplate(template, receiverEmail, locals);

    log.info('Email sent success.');
  } catch (error) {
    log.log('error', 'Notification service sendEmail() method error:', error);
  }
};
