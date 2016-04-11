/**
 * Babel Starter Kit (https://www.kriasoft.com/babel-starter-kit)
 *
 * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import jsdom from 'mocha-jsdom';
import { expect } from 'chai';
import { Page, PageContext } from '../src';

describe('PageContext', () => {

  jsdom({
    html: '<html><body><div id="root"></div></body></html>',
    useEach: true,
  });

  it('should set document.title', (done) => {
    const container = document.getElementById('root');
    const Component = (props, { page }) => {
      page.title = 'test 1'; // eslint-disable-line no-param-reassign
      return <div />;
    };

    Component.contextTypes = {
      page: PropTypes.instanceOf(Page).isRequired,
    };

    ReactDOM.render(<PageContext><Component /></PageContext>, container, () => {
      expect(container.innerHTML).to.be.equal('<div data-reactroot=""></div>');
      expect(document.title).to.be.equal('test 1');
      done();
    });
  });

  it('should set a custom page context variable', (done) => {
    const pageObj = new Page();
    const container = document.getElementById('root');
    const Component = (props, { page }) => {
      page.title = 'test 2'; // eslint-disable-line no-param-reassign
      return <div />;
    };

    Component.contextTypes = {
      page: PropTypes.instanceOf(Page).isRequired,
    };

    ReactDOM.render(<PageContext page={pageObj}><Component /></PageContext>, container, () => {
      expect(document.title).to.be.equal('test 2');
      expect(pageObj.title).to.be.equal('test 2');
      done();
    });
  });

});
