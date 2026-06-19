const fs = require('fs');
let code = fs.readFileSync('app/learn/html/page.tsx', 'utf-8');

if (!code.includes('useState')) {
  code = code.replace('import React from "react"', 'import React, { useState } from "react"');
}

code = code.replace('export default function LearnHtmlPage() {\n  return (', 
`export default function LearnHtmlPage() {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const totalChapters = 15;

  const handleNext = async () => {
    if (currentChapterIndex < totalChapters - 1) {
      setCurrentChapterIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Record study contribution
      fetch('/api/study', { method: 'POST' }).catch(console.error);
    }
  };

  const handleBack = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (`);

code = code.replace('<div className="divide-y divide-zinc-200 dark:divide-zinc-800 [&>section]:py-16 first:[&>section]:pt-0">',
`
  {/* Progress Bar */}
  <div className="w-full bg-muted rounded-full h-2 mb-2 overflow-hidden border border-border/50">
    <div className="bg-primary h-full rounded-full transition-all duration-500 ease-out" style={{ width: \`\${((currentChapterIndex + 1) / totalChapters) * 100}%\` }}></div>
  </div>
  <div className="text-sm font-mono text-muted-foreground mb-8 text-right">
    Chapter {currentChapterIndex + 1} of {totalChapters}
  </div>

  <div className="divide-y divide-zinc-200 dark:divide-zinc-800 [&>section]:py-16 first:[&>section]:pt-0">
`);

let sectionIndex = 0;
code = code.replace(/<section id="[^"]+" className="[^"]+">/g, (match) => {
  const repl = match.replace('className="', `style={{ display: currentChapterIndex === ${sectionIndex} ? "block" : "none" }} className="`);
  sectionIndex++;
  return repl;
});

// Assuming the file ends like this:
//  </section>
//
//  </div>
//  </div>
//  </div>
//  )
// }
code = code.replace('</section>\n\n  </div>', 
`</section>
    
    {/* Navigation Buttons */}
    <div className="flex justify-between items-center mt-12 pt-8 border-t border-border">
      <button 
        onClick={handleBack}
        disabled={currentChapterIndex === 0}
        className="px-6 py-2.5 rounded-lg border border-border bg-background hover:bg-muted text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2"
      >
        ← Back
      </button>
      <button 
        onClick={handleNext}
        disabled={currentChapterIndex === totalChapters - 1}
        className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium shadow-sm flex items-center gap-2"
      >
        {currentChapterIndex === totalChapters - 1 ? 'Finish Course' : 'Next Chapter'} →
      </button>
    </div>

  </div>`);

fs.writeFileSync('app/learn/html/page.tsx', code);
