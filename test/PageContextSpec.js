/**
 * React Page Context (https://github.com/kriasoft/page-context)
 *
 * Copyright © 2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import jsdom from 'mocha-jsdom';
import { expect } from 'chai';
import PageContext from '../src';

describe('PageContext', () => {

  jsdom({
    html: '<html><body><div id="root"></div></body></html>',
    useEach: true,
  });

  it('should set document.title', (done) => {
    const container = document.getElementById('root');
    const Component = (props, { page }) => {
      page({ title: 'test 1' });
      return <div />;
    };
    Component.contextTypes = { page: PropTypes.func.isRequired };

    ReactDOM.render(<PageContext><Component /></PageContext>, container, () => {
      expect(container.innerHTML).to.be.equal('<div data-reactroot=""></div>');
      expect(document.title).to.be.equal('test 1');
      done();
    });
  });

  it('should set meta tags', (done) => {
    const container = document.getElementById('root');
    const Component = (props, { page }) => {
      page({ meta: [{ name: 'description', content: 'some content' }] });
      return <div />;
    };
    Component.contextTypes = { page: PropTypes.func.isRequired };

    ReactDOM.render(<PageContext><Component /></PageContext>, container, () => {
      expect(container.innerHTML).to.be.equal('<div data-reactroot=""></div>');
      expect(document.title).to.be.empty;
      expect(document.head.innerHTML)
        .to.be.equal('<meta name="description" content="some content">');
      done();
    });
  });

  it('should read page metadata via ref={c => c.page}', (done) => {
    let pageCtx;
    const container = document.getElementById('root');
    const Component = (props, { page }) => {
      page({ title: 'test 2' });
      return <div />;
    };

    Component.contextTypes = { page: PropTypes.func.isRequired };

    ReactDOM.render(
      <PageContext ref={c => { pageCtx = c.page; }}>
        <Component />
      </PageContext>,
      container,
      () => {
        expect(document.title).to.be.equal('test 2');
        expect(pageCtx).to.be.ok.and.a('function');
        expect(pageCtx()).to.be.deep.equal({ title: 'test 2' });
        done();
      });
  });


});
