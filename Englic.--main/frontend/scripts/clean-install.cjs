const fs = require('fs');
const cp = require('child_process');
const path = require('path');

for (const target of ['node_modules', '.next']) {
  const full = path.join(process.cwd(), target);
  if (fs.existsSync(full)) {
    fs.rmSync(full, { recursive: true, force: true });
    console.log(`Removed ${target}`);
  }
}

console.log(`Node ${process.version} / ${process.platform} / ${process.arch}`);
console.log('Installing dependencies with optional packages enabled...');
cp.execSync('npm install --include=optional', { stdio: 'inherit', shell: true });
console.log('Done. Now run: npm run dev');
