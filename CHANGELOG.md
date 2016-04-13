## React Page Context Change Log

All notable changes to this project will be documented in this file.

### [Unreleased][unreleased]

- Add support of setting `<link>` and `<script>` tags (PLANNED)

### [v0.0.5]
> 2016-04-13

- Add `onChange` property to the `PageContext` React component
- Allow to set a "description" meta tag by calling `context.page({ description: 'hello' })`
- Minimize the number of DOM manipulations to improve client-side performance

### [v0.0.3]
> 2016-04-12

- Rename `page-context` npm module to `react-page-context` (BREAKING CHANGE)

### [v0.0.2]
> 2016-04-12

- Convert `context.page` to a function, so it can be used like this:
  `context.page({ title: 'Hello', meta: [...] })` (BREAKING CHANGE)

### [v0.0.1]
> 2016-04-11

- Initial pre-release

[unreleased]: https://github.com/kriasoft/react-page-context/compare/v0.0.5...HEAD
[v0.0.5]: https://github.com/kriasoft/react-page-context/compare/v0.0.3...v0.0.5
[v0.0.3]: https://github.com/kriasoft/react-page-context/compare/v0.0.2...v0.0.3
[v0.0.2]: https://github.com/kriasoft/react-page-context/compare/v0.0.1...v0.0.2
[v0.0.1]: https://github.com/kriasoft/react-page-context/compare/6f695ade34cf673892389271d157310ce1111ad1...v0.0.1
