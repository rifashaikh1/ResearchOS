import fs from 'node:fs';
import path from 'node:path';

function walk(d, acc = []) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) walk(p, acc);
    else if (/\.(tsx|ts)$/.test(f.name)) acc.push(p);
  }
  return acc;
}

const files = walk('src');
const set = new Set();
for (const file of files) {
  const t = fs.readFileSync(file, 'utf8');
  const re = /className=\{?`([\s\S]*?)`\}?|className="([^"]*)"|className='([^']*)'/g;
  let m;
  while ((m = re.exec(t))) {
    const raw = (m[1] || m[2] || m[3] || '').replace(/\$\{[^}]+\}/g, ' ');
    raw.split(/\s+/).forEach((c) => {
      if (c && !c.includes('${')) set.add(c);
    });
  }
}
console.log([...set].sort().join('\n'));
console.log('---COUNT---', set.size);
console.log('---FILES---');
files.forEach((f) => console.log(f, fs.readFileSync(f, 'utf8').split(/\n/).length));
