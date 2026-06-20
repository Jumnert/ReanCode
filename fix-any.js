const fs = require('fs');
const path = require('path');

function replaceAny(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            replaceAny(fullPath);
        } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;
            
            // Safe replacements
            content = content.replace(/as any/g, 'as unknown');
            content = content.replace(/: any/g, ': unknown');
            content = content.replace(/<any>/g, '<unknown>');
            content = content.replace(/<any\[\]>/g, '<unknown[]>');
            
            // Fix specific compiler issue where (window as unknown) is used
            content = content.replace(/\(window as unknown\)\.webkitAudioContext/g, '(window as any).webkitAudioContext');
            
            if (content !== original) {
                fs.writeFileSync(fullPath, content);
                console.log('Fixed', fullPath);
            }
        }
    }
}

replaceAny('./app');
replaceAny('./components');
replaceAny('./src');
replaceAny('./lib');
