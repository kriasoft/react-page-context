# React Page Context

[![NPM version](http://img.shields.io/npm/v/page-context.svg?style=flat-square)](https://www.npmjs.com/package/page-context)
[![NPM downloads](http://img.shields.io/npm/dm/page-context.svg?style=flat-square)](https://www.npmjs.com/package/page-context)
[![Build Status](http://img.shields.io/travis/kriasoft/page-context/master.svg?style=flat-square)](https://travis-ci.org/kriasoft/page-context)
[![Coverage Status](https://img.shields.io/coveralls/kriasoft/page-context.svg?style=flat-square)](https://coveralls.io/github/kriasoft/page-context)
[![Dependency Status](http://img.shields.io/david/kriasoft/page-context.svg?style=flat-square)](https://david-dm.org/kriasoft/page-context)
[![Online Chat](http://img.shields.io/badge/chat_room-%23react--starter--kit-blue.svg?style=flat-square)](https://gitter.im/kriasoft/react-starter-kit)

> A higher-order React component that allows to set document's title, description and other meta
> tags, as well as `<link>` and `<script>` tags from inside regular [React](https://facebook.github.io/react/)
> components via `context.page` [context variable](https://facebook.github.io/react/docs/context).

See the [changelog](CHANGELOG.md) for past and future (planned) changes to the project &nbsp;|&nbsp;
Join [#react-starter-git](https://gitter.im/kriasoft/react-starter-kit) on Gitter to stay up to date

### How to Install

```sh
$ npm install page-context --save
```

### Getting Started

1. Import `Page` and `PageContext` types from `page-context` npm module
2. Add `contextTypes` static property to your React component that needs access to the
   `document.title` and other `head` elements
3. Use `context.page` variable to manipulate document's `head` section

Here is an example:

#### `components/HomePage.js`

```js
import React, { PropTypes} from 'react';
import { Page } from 'page-context';

function HomePage(props, { page }) {
  page.title = 'My Home Page';
  return (
    <div>
      <h1>Welcome!</h1>
      <p>This is my personal home page.</p>
    </div>
  );
}

HomePage.contextTypes = { page: PropTypes.instanceOf(Page).isRequired };

export default HomePage;
```

#### `main.js`

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { PageContext } from 'page-context';
import HomePage from './components/HomePage';

const container = document.getElementById('root');
ReactDOM.render(<PageContext><HomePage /></PageContext>, container);
```

### Backers

♥ React Page Context? Help us keep it alive by donating funds to cover project expenses via
[Patreon](https://www.patreon.com/tarkus) or [PayPal](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RETHAJHV3T972)!

<a href="https://twitter.com/koistya" target="_blank" title="Konstantin Tarkus">
  <img src="https://github.com/koistya.png?size=64" width="64" height="64">
</a>
<a href="https://www.patreon.com/tarkus" target="_blank">
  <img src="https://opencollective.com/static/images/become_backer.svg" width="64" height="64">
</a>

### Related Projects

* [React Starter Kit](https://github.com/kriasoft/react-starter-kit) — Isomorphic web app boilerplate (Node.js/Express, React.js, GraphQL)
* [Babel Starter Kit](https://github.com/kriasoft/react-starter-kit) — JavaScript library boilerplate (ES2015+, Babel)

### Get in Touch

 * [#react-starter-kit](https://gitter.im/kriasoft/react-starter-kit) on Gitter
 * [@koistya](https://twitter.com/koistya) on [Codementor](https://www.codementor.io/koistya)

### License

Copyright © 2016 Kriasoft, LLC. This source code is licensed under the MIT license found in 
the [LICENSE.txt](https://github.com/kriasoft/react-starter-kit/blob/master/LICENSE.txt) file.
The documentation to the project is licensed under the [CC BY-SA 4.0](http://creativecommons.org/licenses/by-sa/4.0/)
license.

---
Made with ♥ by Konstantin Tarkus ([@koistya](https://twitter.com/koistya)) and [contributors](https://github.com/kriasoft/page-context/graphs/contributors)
