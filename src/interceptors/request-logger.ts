import { AxiosRequestConfig } from 'axios';
import {
  log,
  logRequestHeaders,
  logQSParameters,
  logRequestData,
  createMethodStyles,
  getFullUrl,
} from '../helpers';

const onFullfilled = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const { method } = config;

  const fullUrl = getFullUrl(config);
  const title = `request%c %c${method?.toUpperCase()}%c ${fullUrl}`;
  const titleStyle = 'color: gray; font-weight: lighter';
  const styles = [method ? createMethodStyles(method) : '', '', ''];

  log.group({ title, titleStyle, styles }, () => {
    // General Info
    log.group('General', () => {
      log.log('Request URL:', `${fullUrl}`);
      log.log('Request Method:', method?.toUpperCase());
    });

    logRequestHeaders(config);
    logQSParameters(config);
    logRequestData(config);

    log.debug('Request Config', config);
  });

  return config;
};

export default onFullfilled;
