import { AxiosResponse } from 'axios';
import {
  createMethodStyles,
  log,
  logQSParameters,
  logRequestData,
  logRequestHeaders,
} from '../helpers';

const onFullfilled = (response: AxiosResponse): AxiosResponse => {
  const { config, data, headers, status, statusText } = response;
  const { method, baseURL, url } = config;

  const title = `response%c %c${method?.toUpperCase()}%c ${baseURL}${url}`;
  const titleStyle = 'color: gray; font-weight: lighter';
  const styles = [method ? createMethodStyles(method) : '', '', ''];

  log.group({ title, titleStyle, styles }, () => {
    // General Info
    log.group('General', () => {
      log.log('Request URL:', `${baseURL}${url}`);
      log.log('Request Method:', method?.toUpperCase());
      log.log('Status Code:', `${status} ${statusText}`);
    });
    logRequestHeaders(config);
    log.group({ title: 'Response Headers', collapsed: true }, () => {
      log.table(headers);
    });
    logQSParameters(config);
    logRequestData(config);
    log.log('Response Data:', data);
  });

  log.debug('Response Object:', response);

  return response;
};

export default onFullfilled;
