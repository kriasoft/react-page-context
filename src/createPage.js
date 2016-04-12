/**
 * React Page Context (https://github.com/kriasoft/page-context)
 *
 * Copyright © 2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

function createPage() {
  const cache = Object.create(null);
  const canUseDOM = !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );

  return function page(data) {
    if (data) {
      const { title, meta } = data;
      if (title) {
        cache.title = title;

        if (canUseDOM) {
          document.title = title;
        }
      }

      if (meta) {
        cache.meta = meta;
        if (canUseDOM) {
          for (const item of meta) {
            // Remove and create a new <meta /> tag in order to make it work
            // with bookmarks in Safari
            const elements = document.getElementsByTagName('meta');
            Array.from(elements).forEach((element) => {
              if (element.getAttribute('name') === item.name) {
                element.parentNode.removeChild(element);
              }
            });
            const elem = document.createElement('meta');
            elem.setAttribute('name', item.name);
            elem.setAttribute('content', item.content);
            document
              .getElementsByTagName('head')[0]
              .appendChild(elem);
          }
        }
      }
    }

    return { title: cache.title };
  };
}

export default createPage;
