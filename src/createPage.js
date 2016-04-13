/**
 * React Page Context (https://github.com/kriasoft/react-page-context)
 *
 * Copyright © 2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import Page from './Page';

let cache;
let canUseDOM;
const metaKeys = ['name', 'property', 'httpEquiv'];

function metaKeyToAttr(key) {
  return key === 'httpEquiv' ? 'http-equiv' : key;
}

function page(options, data) {
  let notifyChange = false;

  // Calling context.page() without any arguments returns the current's page metadata
  if (!data) {
    return options.cache;
  }

  const { title, description, meta = [] } = data;

  // Set page title
  // -------------------------------------------------------------------------
  if (title !== undefined && options.cache.title !== title) {
    options.cache.title = title; // eslint-disable-line no-param-reassign

    if (options.canUseDOM && document.title !== title) {
      document.title = title;
    }

    notifyChange = true;
  }

  // Set page description
  // -------------------------------------------------------------------------
  if (description !== undefined) {
    meta.unshift({ name: 'description', content: description });
  }

  // Set meta tags
  // -------------------------------------------------------------------------
  for (const item of meta) {
    for (const key of metaKeys) { // e.g. "name"
      const keyValue = item[key]; // e.g. "description"

      if (keyValue === undefined) {
        continue;
      }

      const attr = metaKeyToAttr(key); // "httpEquiv" => "http-equiv"

      let node;
      let metaItem = options.cache.meta.find(x => x[attr] === keyValue);

      if (metaItem) {
        if (metaItem.content === item.content) {
          continue;
        }

        if (options.canUseDOM) {
          if (key === 'name' && keyValue === 'description') {
            node = document.querySelector('meta[name="description"]');
            if (node) {
              node.parentNode.removeChild(node);
              node = undefined;
            }
          } else {
            node = document.querySelector(`meta[${attr}="${keyValue}"]`);
          }
        }

        metaItem.content = item.content;
      } else {
        metaItem = { [attr]: keyValue, content: item.content };
        options.cache.meta.push(metaItem);
      }

      if (options.canUseDOM) {
        if (node) {
          node.setAttribute('content', item.content);
        } else {
          node = document.createElement('meta');
          node.setAttribute(attr, keyValue);
          node.setAttribute('content', item.content);
          document.head.appendChild(node);
        }
      }

      notifyChange = true;
    }
  }

  if (notifyChange && options.onChange) {
    options.onChange(options.cache);
  }

  return undefined;
}

function createPage({ onChange } = {}) {
  canUseDOM = canUseDOM === undefined ? !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  ) : canUseDOM;
  return page.bind(undefined, { cache: cache || new Page(), canUseDOM, onChange });
}

export default createPage;
