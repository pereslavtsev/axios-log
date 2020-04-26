import { AxiosRequestConfig, Method } from 'axios';
import Logger from './logger';

export const log = new Logger();

export const getFullUrl = ({ baseURL, url }: AxiosRequestConfig): string | undefined => {
  return baseURL ? baseURL : '' + url ? url : '';
};

export const logRequestHeaders = ({ method, headers }: AxiosRequestConfig): void => {
  const headersCount = typeof headers === 'object' ? Object.keys(headers).length : null;
  const title = `Request Headers ${headersCount ? `(${headersCount})` : ''}`;
  log.group({ title, collapsed: true }, () => {
    log.table({
      ...headers.common,
      ...(method && typeof headers[method?.toLowerCase()] === 'object'
        ? headers[method?.toLowerCase()]
        : {}),
    });
  });
};

export const logQSParameters = ({ params }: AxiosRequestConfig): void => {
  const paramsCount = typeof params === 'object' ? Object.keys(params).length : null;
  const title = `Query String Parameters ${paramsCount ? `(${paramsCount})` : ''}`;
  log.group({ title, collapsed: true }, () => {
    log.table(params);
  });
};

export const logRequestData = ({ method, data }: AxiosRequestConfig): void => {
  switch (method) {
    case 'GET':
    case 'get':
      break;
    default: {
      const dataCount = typeof data === 'object' ? Object.keys(data).length : null;
      const title = `Request Data ${dataCount ? `(${dataCount})` : ''}`;
      log.group({ title, collapsed: true }, () => {
        log.table(data);
      });
    }
  }
};

export const createMethodStyles = (method: Method): string => {
  switch (method) {
    case 'GET':
    case 'get':
      return 'color: green';
    case 'POST':
    case 'post':
      return 'color: orange';
    case 'DELETE':
    case 'delete':
      return 'color: red';
    default:
      return 'color: lightGray';
  }
};
