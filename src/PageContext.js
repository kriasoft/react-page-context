/**
 * React Page Context (https://github.com/kriasoft/page-context)
 *
 * Copyright © 2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import { Component, PropTypes } from 'react';
import Page from './Page';

class PageContext extends Component {

  static propTypes = {
    page: PropTypes.instanceOf(Page),
    children: PropTypes.element.isRequired,
  };

  static childContextTypes = {
    page: PropTypes.instanceOf(Page).isRequired,
  };

  getChildContext() {
    return {
      page: this.props.page || new Page(),
    };
  }

  render() {
    return this.props.children;
  }
}

export default PageContext;
