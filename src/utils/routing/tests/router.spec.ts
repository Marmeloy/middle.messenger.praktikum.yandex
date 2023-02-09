import { expect } from 'chai';
import { JSDOM } from 'jsdom';
import { Router } from '../router';

const dom = new JSDOM(
  `
            <div class="app"></div>`,
  {
    url: 'http://localhost:3000',
  },
);

(global as any).document = dom.window.document;
(global as any).window = dom.window;

describe('Router', () => {
  it('should change history', () => {
    const router = new Router('.app');
    const { history } = window;

    router.go('/login');
    expect(history.length).to.equal(2);

    router.go('/register');
    expect(history.length).to.equal(3);
  });
});
