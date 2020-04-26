import { AxiosResponse } from 'axios';
import dateFormat from 'dateformat';
import * as HttpStatus from 'http-status-codes';
import {
  createMethodStyles,
  getFullUrl,
  log,
  logQSParameters,
  logRequestData,
  logRequestHeaders,
} from '../helpers';

const onFullfilled = (response: AxiosResponse): AxiosResponse => {
  const { config, data, headers, status, statusText } = response;
  const { method } = config;
  const fullUrl = getFullUrl(config);

  const date = dateFormat();
  const title = `response%c %c${method?.toUpperCase()}%c ${fullUrl} %c${date}`;
  const titleStyle = 'color: gray; font-weight: lighter';
  const styles = [
    method ? createMethodStyles(method) : '',
    '',
    `${titleStyle}; font-family: sans-serif;`,
    '',
  ];

  log.group({ title, titleStyle, styles }, () => {
    // General Info
    log.group('General', () => {
      log.log('Request URL:', `${fullUrl}`);
      log.log('Request Method:', method?.toUpperCase());
      log.log(
        'Status Code:',
        `${status} ${statusText ? statusText : HttpStatus.getStatusText(status)}`,
      );
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
