const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.next' || file === '.git') continue;
    
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      const newContent = content
        .replace(/=\s*any\b/g, '= unknown')
        .replace(/:\s*any\b/g, ': unknown')
        .replace(/\bas\s+any\b/g, 'as unknown')
        .replace(/any\[\]/g, 'unknown[]')
        .replace(/<any>/g, '<unknown>');
        
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

const root = path.join(__dirname, '..');
processDir(path.join(root, 'src'));
processDir(path.join(root, 'components'));
processDir(path.join(root, 'lib'));
processDir(path.join(root, 'app'));
