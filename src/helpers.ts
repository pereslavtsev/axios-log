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
    if (!headers.common) {
      log.table(headers);
    } else {
      log.table({
        ...headers.common,
        ...(method && typeof headers[method?.toLowerCase()] === 'object'
          ? headers[method?.toLowerCase()]
          : {}),
      });
    }
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
      return 'color: #28a745';
    case 'POST':
    case 'post':
      return 'color: #ffc107';
    case 'PUT':
    case 'put':
      return 'color: #007bff';
    case 'DELETE':
    case 'delete':
      return 'color: #dc3545';
    case 'OPTIONS':
    case 'options':
      return 'color: #17a2b8';
    default:
      return 'color: lightGray';
  }
};
