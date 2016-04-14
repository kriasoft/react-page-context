# React Page Context

[![NPM version](http://img.shields.io/npm/v/react-page-context.svg?style=flat-square)](https://www.npmjs.com/package/react-page-context)
[![NPM downloads](http://img.shields.io/npm/dm/react-page-context.svg?style=flat-square)](https://www.npmjs.com/package/react-page-context)
[![Build Status](http://img.shields.io/travis/kriasoft/react-page-context/master.svg?style=flat-square)](https://travis-ci.org/kriasoft/react-page-context)
[![Coverage Status](https://img.shields.io/coveralls/kriasoft/react-page-context.svg?style=flat-square)](https://coveralls.io/github/kriasoft/react-page-context)
[![Dependency Status](http://img.shields.io/david/kriasoft/react-page-context.svg?style=flat-square)](https://david-dm.org/kriasoft/react-page-context)
[![Online Chat](http://img.shields.io/badge/chat_room-%23react--starter--kit-blue.svg?style=flat-square)](https://gitter.im/kriasoft/react-starter-kit)

> A higher-order React component that allows to set document's title, description and other meta
> tags, as well as `<link>` and `<script>` tags from inside regular [React](https://facebook.github.io/react/)
> components via `context.page` [context variable](https://facebook.github.io/react/docs/context).

See the [changelog](CHANGELOG.md) for past and future (planned) changes to the project &nbsp;|&nbsp;
Join [#react-starter-kit](https://gitter.im/kriasoft/react-starter-kit) on Gitter to stay up to date

### How to Install

```sh
$ npm install react-page-context --save
```

### Getting Started

1. Import `PageContext` types from `react-page-context` npm module
2. Add `contextTypes` static property to your React component that needs access to
   `document.title` and other `<head>` elements
3. Use `context.page` function to manipulate document's `<head>` section

Here is an example:

#### `components/HomePage.js`

```js
import React, { PropTypes } from 'react';

function HomePage(props, { page }) {
  page({
   title: 'My Home Page',
   description: 'Some page description',
   meta: [
     { name: 'twitter:card', content: 'summary' }
   ]
  });
  return (
    <div>
      <h1>Welcome!</h1>
      <p>This is my personal home page.</p>
    </div>
  );
}

HomePage.contextTypes = { page: PropTypes.func.isRequired };

export default HomePage;
```

#### `main.js`

```js
import React from 'react';
import ReactDOM from 'react-dom';
import PageContext from 'react-page-context';
import HomePage from './components/HomePage';

ReactDOM.render(
  <PageContext>
    <HomePage />
  </PageContext>,
  document.getElementById('root')
);
```

It should yield the following HTML markup:

```html
<html>
  <head>
    <title>My Home Page</title>
    <meta name="description" content="Some page description">
    <meta name="twitter:card" content="summary">
  </head>
  <body>
    ...
  </body>
</html>
```

### Server-side Rendering Example

#### `server.js`

```js
import express from 'express';
import ReactDOM from 'react-dom/server';
import PageContext from 'react-page-context';
import HomePage from './components/HomePage';

const app = express();

app.get('/', (req, res) => {
  let page;
  const body = ReactDOM.renderToString(
    <PageContext onChange={value => (page = value)}>
      <HomePage />
    </PageContext>
  );
  res.send(`
    <html>
      <head>
        <title>${page.title}</title>
        ${page.meta.map(meta => `<meta name="${meta.name}" content="${meta.content}">`)}
      </head>
      <body><div id="root">${body}</div></body>
    </html>
  `)
});

app.listen(3000);
```

**Node**: This is a simplified example. In a real-world app you would need to replace the ES6
template string above with a real template powered by Jade or EJS for security and performance
considerations.

### Contribute

♥ React Page Context and willing to [contribute](CONTRIBUTING.md)? Great! Here is a list of
challenges you can help with:

* Comment on the API design [here](https://github.com/kriasoft/react-page-context/issues/1)
* Add support of setting `<link>` and `<script>` elements via `context.page(...)`
* Add support of setting HTML attributes such as `lang="..."`
* Review and improve documentation to the project ([README.md](README.md))
* Review and improve the source code ([createPage.js](src/createPage.js), [PageContext.js](src/PageContext.js))
* Review and improve tests and test coverage ([PageContextSpec.js](test/PageContextSpec.js))
* Suggest ways to improve performance of this component
* Configure automated tests in real browsers via Travis and Sauce Labs or Browserstack
* ...

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
Made with ♥ by Konstantin Tarkus ([@koistya](https://twitter.com/koistya)) and [contributors](https://github.com/kriasoft/react-page-context/graphs/contributors)
