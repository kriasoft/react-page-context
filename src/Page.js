/**
 * React Page Context (https://github.com/kriasoft/react-page-context)
 *
 * Copyright © 2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

function Page() {
  this.title = '';
  this.description = '';
  this.meta = [];
  this.links = [];
  this.scripts = [];
  this.attributes = {};
}

export default Page;
