const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

function queryStringify(data:XMLHttpRequestBodyInit):string {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

export type options = {
    headers?: Record<string, string>,
    method?: string,
    timeout?: number,
    data?: XMLHttpRequestBodyInit
}

export default class HTTPTransport {
  get = (url:string, options:options = {}) => this.request(url, { ...options, method: METHODS.GET }, options.timeout);

  post = (url:string, options:options = {}) => this.request(url, { ...options, method: METHODS.POST }, options.timeout);

  put = (url:string, options:options = {}) => this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

  delete = (url:string, options:options = {}) => this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

  request = (url:string, options:options = {}, timeout:number = 5000) => {
    const { headers = {}, method, data } = options;

    return new Promise<XMLHttpRequest>((resolve, reject) => {
      if (!method) {
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;
      xhr.withCredentials = true;
      xhr.open(
        method,
        isGet && !!data
          ? `${url}${queryStringify(data)}`
          : url,
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;
      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
