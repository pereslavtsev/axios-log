import { AxiosRequestConfig } from 'axios';
import {
  log,
  logRequestHeaders,
  logQSParameters,
  logRequestData,
  createMethodStyles,
} from '../helpers';

const onFullfilled = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const { method, baseURL, url } = config;

  const title = `request%c %c${method?.toUpperCase()}%c ${baseURL}${url}`;
  const titleStyle = 'color: gray; font-weight: lighter';
  const styles = [method ? createMethodStyles(method) : '', '', ''];

  log.group({ title, titleStyle, styles }, () => {
    // General Info
    log.group('General', () => {
      log.log('Request URL:', `${baseURL}${url}`);
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
