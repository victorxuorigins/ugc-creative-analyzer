// Check that index.html's safeJSON survives a truncated Claude response.
// Run: node test-safejson.mjs
import assert from 'assert';
import { readFileSync } from 'fs';

const html = readFileSync(new URL('./index.html', import.meta.url), 'utf8');
const src = html.slice(html.indexOf('function safeJSON'), html.indexOf('function renderResults'));
const { safeJSON } = await import('data:text/javascript,' + encodeURIComponent(src + '\nexport {safeJSON};'));

const full = {creative_score:82,hook_analysis:"Strong open.",recommendations:[{title:"A",description:"d1"},{title:"B",description:"d2"}],rewrite_variants:[{variant:"VARIANT A",script:"line one\nline two"}]};
const text = JSON.stringify(full);

// clean response, with the chatter models like to wrap it in
assert.deepStrictEqual(safeJSON('Here you go:\n```json\n' + text + '\n```'), full);

// trailing commas
assert.strictEqual(safeJSON('{"a":1,"b":[1,2,],}').b.length, 2);

// truncated mid-string / mid-array / mid-object — the max_tokens bug
for (const cut of [0.35, 0.5, 0.6, 0.75, 0.9]) {
  const out = safeJSON(text.slice(0, Math.floor(text.length * cut)));
  assert.strictEqual(out.creative_score, 82, 'lost score at cut ' + cut);
  assert.ok(Array.isArray(out.recommendations || []), 'bad recs at cut ' + cut);
}

// every cut point past the first complete value should salvage something
let ok = 0;
for (let n = 1; n <= text.length; n++) {
  try { safeJSON(text.slice(0, n)); ok++; } catch (e) {}
}
assert.ok(ok > text.length * 0.9, 'only ' + ok + '/' + text.length + ' prefixes salvaged');

// no JSON at all still fails loudly
assert.throws(() => safeJSON('I cannot analyze this video.'), /no JSON/);

console.log('ok — ' + ok + '/' + text.length + ' truncation points salvaged');
