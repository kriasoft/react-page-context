/**
 * React Page Context (https://github.com/kriasoft/page-context)
 *
 * Copyright © 2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { Component, PropTypes } from 'react';
import createPage from './createPage';

class PageContext extends Component {

  static propTypes = {
    page: PropTypes.func,
    children: PropTypes.element.isRequired,
  };

  static childContextTypes = {
    page: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.page = props.page || createPage();
  }

  getChildContext() {
    return { page: this.page };
  }

  render() {
    return this.props.children;
  }
}

export default PageContext;
