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
const fs = require('mz/fs');
const literateWeb = require('../');
const prism = require('prismjs');
const marked = require('marked');
const template = require('./template.js');

(async function() {
  const file = await fs.readFile(`examplecode.js`);
  const contents = file.toString('utf-8');
  /**
   * This call returns an array of sections. Each section is a comment with the
   * corresponding code (until the next comment).
   *
   * A section has the following structure:
   *
   * ```
   * {
   *    "commentType": "BlockComment | InlineComment",
   *    "commentText": "Raw comment text without comment markers",
   *    "codeText":    "Raw corresponding code"
   * }
   * ```
   */
  const sections = literateWeb.parse(contents);
  const output = template({sections, highlightJS, markdown, escape, trim, indentMarkers});
  await fs.writeFile(`output.html`, output);
})()
  .catch(err => console.log(err));


function highlightJS(text) {
  return prism.highlight(text, prism.languages.javascript);
}

function markdown(text) {
  return marked(text);
}

function escape(text) {
  return text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function trim(text) {
  return text
    .replace(/^\n*/, '')
    .replace(/\s*$/, '');
}

function indentMarkers(text){
  return text.replace(/  /g, '<span class="indent">&nbsp;&nbsp;</span>');
}
