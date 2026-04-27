const assert = require('assert');
const fs = require('fs');

const expectedRows = {
  'pulizie/scheda11.html': 2,
  'pulizie/scheda12.html': 3,
  'pulizie/scheda19.html': 3
};

for (const [file, count] of Object.entries(expectedRows)) {
  const html = fs.readFileSync(file, 'utf8');
  assert.ok(!html.includes('class="shared-layout"'), `${file} no longer uses a composite shared image`);
  const rows = [...html.matchAll(/class="step-row"/g)].length;
  assert.ok(rows >= count, `${file} has one image row per procedure step`);
  assert.ok(html.includes('class="storage-layout"'), `${file} keeps storage layout`);
  assert.ok(
    html.indexOf('<div class="section-bar dark">') > -1 &&
      html.indexOf('<div class="section-bar dark">') < html.indexOf('<div class="storage-layout">'),
    `${file} keeps the dark storage section bar before storage content`
  );
  assert.ok(html.includes('<h2>Stoccaggio</h2>'), `${file} keeps storage section title`);
}
