const fs = require('fs');
const path = require('path');

const fixMapping = [
  [/tracking-normalst/g, 'tracking-wider'],
  [/tracking-normalr/g, 'tracking-wide'],
  [/tracking-tighterer/g, 'tracking-tighter']
];

const mapping = {
  'tracking-[0.25em]': 'tracking-wider',
  'tracking-widest': 'tracking-wider',
  'tracking-wider': 'tracking-wide',
  'tracking-wide': 'tracking-normal',
  'tracking-normal': 'tracking-tight',
  'tracking-tight': 'tracking-tighter'
};

const regex = /tracking-(?:\[0\.25em\]|widest|wider|wide|normal|tight)(?![a-zA-Z0-9-])/g;

function walk(dir, callback) {
  fs.readdirSync(dir).forEach( f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
};

const srcDir = path.join(process.cwd(), 'frontend/src');

walk(srcDir, (filePath) => {
  if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts') && !filePath.endsWith('.css')) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // 1. Fix mess
  for (const [reg, rep] of fixMapping) {
    content = content.replace(reg, rep);
  }

  // 2. Apply proper mapping (single pass)
  content = content.replace(regex, (match) => {
    return mapping[match] || match;
  });

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content);
    console.log(`Processed ${filePath}`);
  }
});
