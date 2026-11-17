// What `npm publish` would ship, checked against an allowlist and scanned for
// secrets. Anything else in the tarball fails the build. Run in CI and before
// every release.
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const ALLOWED = [ /^package\.json$/, /^index\.js$/, /^lib\/.+\.js$/, /^LICENSE$/, /^README\.md$/ ];
const SECRET = /client_secret|GOCSPX-|api[_-]?key\s*[:=]|BEGIN [A-Z ]*PRIVATE KEY|refresh_token\s*[:=]|AKIA[0-9A-Z]{16}|Bearer [A-Za-z0-9._-]{20,}|password\s*[:=]\s*['"][^'"]+|token=[A-Za-z0-9]/i;

const [ pack ] = JSON.parse(execFileSync('npm', [ 'pack', '--dry-run', '--json', '--ignore-scripts' ], { encoding: 'utf8' }));
const files = pack.files.map(f => f.path);
const bad = files.filter(f => !ALLOWED.some(re => re.test(f)));
const leaks = files.filter(f => SECRET.test(readFileSync(f, 'utf8')));
if (bad.length || leaks.length) {
  for (const f of bad) console.error(`not on the allowlist: ${f}`);
  for (const f of leaks) console.error(`looks like a secret: ${f}`);
  process.exit(1);
}
console.log(`check-pack: ${files.length} files, all on the allowlist, no secret patterns (${files.join(', ')})`);
