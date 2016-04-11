/**
 * React Page Context (https://github.com/kriasoft/page-context)
 *
 * Copyright © 2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

class Page {

  constructor() {
    this.map = new Map();
  }

  get title() {
    return this.map.get('title');
  }

  set title(value) {
    this.map.set('title', value);
    document.title = value;
  }

}

export default Page;
