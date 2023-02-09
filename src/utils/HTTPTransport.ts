import HTTPError from './HTTPError';

export { HTTPError };

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

function queryStringify(data: XMLHttpRequestBodyInit): string {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

export type TOptions = {
    headers?: Record<string, string>,
    method?: string,
    timeout?: number,
    data?: XMLHttpRequestBodyInit
}

type HTTPMethod = (url: string, options?: TOptions) => Promise<XMLHttpRequest>

export default class HTTPTransport {
  get: HTTPMethod = (url, options = {}) => (
    this.request((options.data ? `${url}${queryStringify(options.data)}` : url), { ...options, method: METHODS.GET }, options.timeout)
  );

  put: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: METHODS.PUT }, options.timeout)
  );

  post: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: METHODS.POST }, options.timeout)
  );

  delete: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: METHODS.DELETE }, options.timeout)
  );

  request = (url: string, options: TOptions = {}, timeout: number = 5000) => {
    const { headers = {}, method, data } = options;

    return new Promise<XMLHttpRequest>((resolve, reject) => {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;
      xhr.withCredentials = true;
      xhr.open(method, url);

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        if (xhr.status >= 400) {
          reject(new HTTPError(`Bad request${xhr.statusText ? `(${xhr.statusText})` : ''}, code ${xhr.status}`, xhr.status));
        } else {
          resolve(xhr);
        }
      };

      xhr.onabort = function () {
        reject(new HTTPError('Request aborted'));
      };
      xhr.onerror = function () {
        reject(new HTTPError('Bad request'));
      };

      xhr.timeout = timeout;
      xhr.ontimeout = function () {
        reject(new HTTPError('Request timeout'));
      };
      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
