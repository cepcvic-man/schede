const assert = require('assert');
const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

function mustInclude(value, message) {
  assert.ok(html.includes(value), message);
}

mustInclude('home-dashboard', 'home uses dashboard structure');
mustInclude('home-status-strip', 'home exposes compact status strip');
mustInclude('home-primary-section', 'home has primary available section');
mustInclude('future-list', 'future categories use compact list');
mustInclude('id="open-cleaning"', 'Pulizia entry keeps existing JS hook');
mustInclude('id="home-search"', 'home search keeps existing JS hook');
mustInclude('renderHomeSearch', 'home search behavior remains wired');
mustInclude('showManual', 'manual open behavior remains wired');

assert.ok(
  html.indexOf('id="home-search"') < html.indexOf('id="sections-title"'),
  'home search appears before manual sections heading'
);

assert.ok(
  html.indexOf('home-primary-section') < html.indexOf('future-list'),
  'available Pulizia section appears before future categories'
);

const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(match => match[1]);
assert.ok(scripts.length > 0, 'inline script exists');
scripts.forEach((script, index) => {
  assert.doesNotThrow(() => new Function(script), `inline script ${index + 1} parses`);
});
