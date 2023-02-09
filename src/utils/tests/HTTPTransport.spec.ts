import { expect } from 'chai';
import * as sinon from 'sinon';
import HTTPTransport from '../HTTPTransport';

describe('HTTPTransport', () => {
  let xhr;
  let http: HTTPTransport;
  const requests = [];

  beforeEach(() => {
    http = new HTTPTransport();
    xhr = sinon.useFakeXMLHttpRequest();
    global.XMLHttpRequest = xhr;
    xhr.onCreate = function (req) {
      // @ts-ignore
      requests.push(req);
    };
  });

  afterEach(() => {
    requests.length = 0;
  });

  it('should create GET request', () => {
    http.get('/');
    // @ts-ignore
    expect(requests[0].method).to.equal('GET');
  });

  it('should create PUT request', () => {
    http.put('/');
    // @ts-ignore
    expect(requests[0].method).to.equal('PUT');
  });

  it('should create POST request', () => {
    http.post('/');
    // @ts-ignore
    expect(requests[0].method).to.equal('POST');
  });

  it('should create DELETE request', () => {
    http.delete('/');
    // @ts-ignore
    expect(requests[0].method).to.equal('DELETE');
  });
});
