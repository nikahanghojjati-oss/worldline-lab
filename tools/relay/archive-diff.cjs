'use strict';
const cp = require('node:child_process');
const assert = require('node:assert/strict');
const base = process.argv[2];
assert.ok(base && /^[A-Za-z0-9._/-]+$/.test(base), 'provide a trusted base git ref');
const diff = cp.execFileSync('git', ['diff','--name-status',base+'...HEAD','--','leads/relay/archive/'],{encoding:'utf8'});
const violations=diff.trim().split(/\r?\n/).filter(Boolean).filter(line => {
  const [status,...paths] = line.split('\t');
  return paths.some(p=>p.endsWith('.json')) && status!=='A';
});
if (violations.length) {
  console.error('Immutable archive was rewritten/deleted/renamed:\n'+violations.join('\n'));
  process.exit(1);
}
console.log('Immutable archive PR diff: no existing envelope modified or deleted');
