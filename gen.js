const fs = require('fs');
const path = require('path');
// const {writeIfChanged} = require('./ninja/write-if-changed.js');
const writeIfChanged = fs.writeFileSync

const entrypoints = [
  "devtools_app",
  "inspector",
  "js_app",
  "ndb_app",
  "node_app",
  "worker_app",
  "device_mode_emulation_frame",
]

const template = './entrypoint_template.html'
const templateContent = fs.readFileSync(template, 'utf-8');

const outDirectory = './'

for (const entrypoint of entrypoints) {
  const rewrittenTemplateContent = templateContent.replace(new RegExp('%ENTRYPOINT_NAME%', 'g'), entrypoint).replace(/(?<!min)\.js/, '.ts')
  writeIfChanged(path.join(outDirectory, `${entrypoint}.html`), rewrittenTemplateContent);
}
