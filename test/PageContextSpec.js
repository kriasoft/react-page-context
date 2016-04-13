/**
 * React Page Context (https://github.com/kriasoft/react-page-context)
 *
 * Copyright © 2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import jsdom from 'mocha-jsdom';
import { expect } from 'chai';
import { PageContext } from '../src';

describe('PageContext', () => {

  jsdom({
    html: '<html><body><div id="root"></div></body></html>',
    useEach: true,
  });

  it('should set document.title', (done) => {
    const container = document.getElementById('root');
    const Component = (props, { page }) => {
      page({ title: 'test 1' });
      return <div>test</div>;
    };
    Component.contextTypes = { page: PropTypes.func.isRequired };

    ReactDOM.render(<PageContext><Component /></PageContext>, container, () => {
      expect(container.innerHTML).to.be.equal('<div data-reactroot="">test</div>');
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

  it('should set description', (done) => {
    const container = document.getElementById('root');
    const Component = (props, { page }) => {
      page({ description: 'desc 2' });
      return <div />;
    };
    Component.contextTypes = { page: PropTypes.func.isRequired };

    ReactDOM.render(<PageContext><Component /></PageContext>, container, () => {
      expect(document.title).to.be.empty;
      expect(document.head.innerHTML)
        .to.be.equal('<meta name="description" content="desc 2">');
      done();
    });
  });

  it('should set other meta tags', (done) => {
    const container = document.getElementById('root');
    const Component = (props, { page }) => {
      page({
        meta: [
          { property: '1', content: '2' },
          { property: '3', content: '4' },
          { httpEquiv: '5', content: '6' },
        ],
      });
      return <div />;
    };
    Component.contextTypes = { page: PropTypes.func.isRequired };

    ReactDOM.render(<PageContext><Component /></PageContext>, container, () => {
      expect(document.head.innerHTML)
        .to.be.equal(
          '<meta property="1" content="2">' +
          '<meta property="3" content="4">' +
          '<meta http-equiv="5" content="6">'
        );
      done();
    });
  });

  it('should read page metadata via ref={c => c.page}', (done) => {
    let result;
    const container = document.getElementById('root');
    const Component = (props, { page }) => {
      page({
        title: 'test 3',
        meta: [{ name: 'description', content: 'desc 3' }],
      });
      return <div />;
    };

    Component.contextTypes = { page: PropTypes.func.isRequired };

    ReactDOM.render(
      <PageContext ref={c => { result = c.page(); }}>
        <Component />
      </PageContext>,
      container,
      () => {
        expect(document.title).to.be.equal('test 3');
        expect(result).to.be.an('object');
        expect(result).to.have.property('title', 'test 3');
        expect(result.meta).to.be.deep.equal([{ name: 'description', content: 'desc 3' }]);
        done();
      });
  });

  it('should work with ReactDOM.renderToString()', () => {
    let result;
    const Component = (props, { page }) => {
      page({ title: 'test 4' });
      return <div />;
    };
    Component.contextTypes = { page: PropTypes.func.isRequired };
    ReactDOMServer.renderToString(
      <PageContext onChange={x => (result = x)}>
        <Component />
      </PageContext>
    );
    expect(result).to.be.an('object');
    expect(result).to.have.property('title', 'test 4');
  });
});
