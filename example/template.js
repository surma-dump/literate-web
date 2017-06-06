/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

module.exports = function(data) {
  let result = `
    <!doctype html>
    <link rel="stylesheet" href="../node_modules/prismjs/themes/prism.css">
    <style>
      code .indent {
        border-left: 1px solid hsla(0, 0%, 0%, 0.1);
      }
      section {
        margin-top: 50px;
      }
      section:first-of-type {
        margin-top: 0;
      }
    </style>
  `;
  for(let section of data.sections) {
    result += `
      <section>
        <div>
          ${data.markdown(data.trim(section.commentText))}
        </div>
        <code>
          <pre>${data.indentMarkers(data.highlightJS(data.trim(section.codeText)))}</pre>
        </code>
      </section>
    `;
  }
  return result;
}
