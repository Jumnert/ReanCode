"use client"

import { Code2, Info, Lightbulb, AlertTriangle, CheckCircle2, Flame, Zap, Sparkles, FileText, Beaker, Check, X, XCircle, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HtmlCompiler } from "@/components/html-compiler"
import { useWebHaptics } from "web-haptics/react"

/* ─────────────────────── Per-section starter code ─────────────────────── */
const code = {
 intro: `<!DOCTYPE html>
<html lang="km">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>ទំព័រដំបូងរបស់ខ្ញុំ</title>
</head>
<body>
 <h1>សួស្តីពិភពលោក! 👋</h1>
 <p>នេះជាកថាខណ្ឌដំបូងរបស់ខ្ញុំ។</p>
 <p>HTML ងាយស្រួលរៀន!</p>
</body>
</html>`,

 basic: `<!DOCTYPE html>
<html lang="km">
<head>
 <meta charset="UTF-8">
 <title>HTML Basic</title>
</head>
<body>
 <h1>ចំណងជើងទី ១</h1>
 <h2>ចំណងជើងទី ២</h2>
 <h3>ចំណងជើងទី ៣</h3>

 <p>នេះជាកថាខណ្ឌ HTML ដំបូង។</p>
 <p>នេះជាកថាខណ្ឌ HTML ទីពីរ។</p>

 <hr>
 <p>ខ្សែបន្ទាត់ &lt;hr&gt; បំបែកខ្លឹមសារ។</p>
</body>
</html>`,

 elements: `<!DOCTYPE html>
<html>
<body>
 <!-- Element ជាមួយ Start tag + Content + End tag -->
 <p>នេះជា <b>Element</b> ធម្មតា។</p>

 <!-- Element ដែលឧទ្ទានក្នុង Element ផ្សេង (Nested) -->
 <p>អំបិល <strong>ស្ករ</strong> និង <em>ម្រេច</em>។</p>

 <!-- Void Element — គ្មាន End tag -->
 <p>បន្ទាត់ទី ១<br>បន្ទាត់ទី ២</p>
 <hr>
 <p>មាតិកាបន្ទាប់</p>
</body>
</html>`,

 attributes: `<!DOCTYPE html>
<html>
<body>
 <!-- href Attribute -->
 <a href="https://www.google.com" target="_blank">
 ចូលទៅ Google (Tab ថ្មី)
 </a>
 <br><br>

 <!-- src + alt + width Attributes -->
 <img
 src="https://placehold.co/300x120?text=HTML+Image"
 alt="រូបភាពឧទាហរណ៍"
 width="300"
 style="border-radius:8px;">
 <br><br>

 <!-- style Attribute -->
 <p style="color:steelblue; font-size:18px;">
 Inline style ប្រើ Attribute!
 </p>

 <!-- title Attribute -->
 <p title="អត្ថបទ Tooltip នេះ">
 រំកិល Mouse លើអត្ថបទនេះ...
 </p>
</body>
</html>`,

 headings: `<!DOCTYPE html>
<html>
<head>
<style>
 body { font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif; padding: 16px; }
 h1 { color: #0066cc; border-bottom: 2px solid #0066cc; }
 h2 { color: #0055aa; }
 h3 { color: #004488; }
 .note { background:#fff3cd; padding:8px 12px;
 border-left:4px solid #f0ad4e; border-radius:4px;
 font-size:14px; margin-top:12px; }
</style>
</head>
<body>
 <h1>Heading 1 — ធំបំផុត (SEO )</h1>
 <h2>Heading 2 — ចំណងជើងរង</h2>
 <h3>Heading 3</h3>
 <h4>Heading 4</h4>
 <h5>Heading 5</h5>
 <h6>Heading 6 — តូចបំផុត</h6>

 <div class="note">
 💡 ប្រើ h1 តែ <b>មួយ</b> ក្នុងទំព័រ
 ដើម្បី SEO ល្អ!
 </div>
</body>
</html>`,

 paragraphs: `<!DOCTYPE html>
<html>
<head>
<style>
 body { font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif; padding: 16px; line-height: 1.8; }
 p { margin-bottom: 16px; }
 .box { border:1px solid #ccc; padding:12px;
 border-radius:6px; background:#f9f9f9; }
</style>
</head>
<body>
 <h2>ការប្រើប្រាស់ &lt;p&gt; Tag</h2>

 <p>នេះជា <b>កថាខណ្ឌទី ១</b>។ Browser
 ផ្ញើអត្ថបទទាំងអស់ក្នុង p Tag មួយ
 ជាប្លុកតែមួយ — space ច្រើនត្រូវបានលុបចេញ។</p>

 <p>នេះជា <b>កថាខណ្ឌទី ២</b>។ Browser
 បន្ថែម margin ស្វ័យប្រវត្តិរវាង p Tags។</p>

 <div class="box">
 <p>ប្រើ &lt;br&gt; ដើម្បី<br>
 បំបែកបន្ទាត់<br>
 ដោយគ្មានកថាខណ្ឌថ្មី</p>
 </div>

 <p>ប្រើ &lt;pre&gt; ដើម្បីរក្សាទុក spaces:</p>
 <pre> ឈ្មោះ: ខ្ញុំ
 អាយុ: ២០</pre>
</body>
</html>`,

 styles: `<!DOCTYPE html>
<html>
<head>
<style>
 /* Internal CSS */
 body { font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif; padding: 20px; }
 .card {
 background: white;
 border: 1px solid #e0e0e0;
 border-radius: 10px;
 padding: 16px;
 margin: 10px 0;
 box-shadow: 0 2px 8px rgba(0,0,0,0.08);
 }
 .blue { color: #0066cc; }
 .green { color: #28a745; }
 .big { font-size: 24px; font-weight: bold; }
 .center { text-align: center; }
</style>
</head>
<body>
 <h2 class="blue center">ប្រភេទ CSS ៣ប្រភេទ</h2>

 <!-- ១. Inline CSS -->
 <div class="card">
 <b>Inline CSS:</b>
 <p style="color:#0066cc; font-size:18px; margin:6px 0;">
 Inline style ដោយ attribute
 </p>
 </div>

 <!-- ២. Internal CSS -->
 <div class="card">
 <b>Internal CSS:</b>
 <p class="green big">class="green big"</p>
 </div>

 <!-- ៣. Properties ចម្រុះ -->
 <div class="card" style="background:#0066cc;color:white;">
 <p style="margin:0">background gradient + ពណ៌ text</p>
 </div>
</body>
</html>`,

 formatting: `<!DOCTYPE html>
<html>
<head>
<style>
 body { font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif; padding: 20px; }
 table { border-collapse: collapse; width: 100%; }
 td { padding: 8px 12px; border: 1px solid #eee; }
 tr:nth-child(even) { background: #f9f9f9; }
 .tag { font-family: monospace; background: #f0f0f0;
 padding: 1px 6px; border-radius: 4px; }
</style>
</head>
<body>
 <h2>HTML Formatting Tags</h2>
 <table>
 <tr>
 <td><span class="tag">&lt;b&gt;</span></td>
 <td><b>អក្សរដិត (Bold)</b></td>
 </tr>
 <tr>
 <td><span class="tag">&lt;i&gt;</span></td>
 <td><i>អក្សរទ្រេត (Italic)</i></td>
 </tr>
 <tr>
 <td><span class="tag">&lt;strong&gt;</span></td>
 <td><strong>សំខាន់ (Semantic Bold)</strong></td>
 </tr>
 <tr>
 <td><span class="tag">&lt;em&gt;</span></td>
 <td><em>គួរចាំ (Semantic Italic)</em></td>
 </tr>
 <tr>
 <td><span class="tag">&lt;mark&gt;</span></td>
 <td><mark>Highlight ពណ៌លឿង</mark></td>
 </tr>
 <tr>
 <td><span class="tag">&lt;small&gt;</span></td>
 <td><small>អក្សរតូចជាង</small></td>
 </tr>
 <tr>
 <td><span class="tag">&lt;del&gt;</span></td>
 <td><del>អត្ថបទ​លុចចោល</del></td>
 </tr>
 <tr>
 <td><span class="tag">&lt;ins&gt;</span></td>
 <td><ins>អត្ថបទ​បញ្ចូល</ins></td>
 </tr>
 <tr>
 <td><span class="tag">&lt;sub&gt;</span></td>
 <td>H<sub>2</sub>O — Subscript</td>
 </tr>
 <tr>
 <td><span class="tag">&lt;sup&gt;</span></td>
 <td>x<sup>2</sup> — Superscript</td>
 </tr>
 </table>
</body>
</html>`,

 comments: `<!DOCTYPE html>
<html>
<head>
<style>
 body { font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif; padding: 20px; }
 .tip {
 background: #e8f4fd; border-left: 4px solid #0066cc;
 padding: 10px 14px; border-radius: 4px; margin: 10px 0;
 }
</style>
</head>
<body>
 <!-- ===========================
 ចំណងជើងទំព័រ
 =========================== -->
 <h1>HTML Comments</h1>

 <!-- កំណត់ចំណាំបន្ទាត់តែមួយ -->
 <p>អត្ថបទនេះត្រូវបានបង្ហាញ។</p>

 <!--
 នេះជាកំណត់ចំណាំ
 ច្រើនបន្ទាត់
 Browser មិនបង្ហាញ!
 -->

 <!-- TODO: បន្ថែម Form ក្នុង Version បន្ទាប់ -->

 <div class="tip">
 💡 Comments ជួយ Developer ដទៃ
 (ឬខ្លួនឯង) យល់ពីកូដ។
 </div>

 <!-- Comment ប្រើដើម្បី disable code ជាបណ្ដោះអាសន្ន -->
 <!--
 <p>ខ្ញុំនឹងមិនបង្ហាញ</p>
 <button>Button ផ្អាក</button>
 -->

 <p>✅ Section ខាងក្រោម...</p>
</body>
</html>`,

 links: `<!DOCTYPE html>
<html>
<head>
<style>
 body { font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif; padding: 20px; }
 a { display: block; margin: 8px 0; }
 .box { border: 1px solid #e0e0e0; border-radius: 8px;
 padding: 14px; margin: 12px 0; background: #fafafa; }
 .label { font-size: 12px; color: #888; margin-bottom: 4px; }
</style>
</head>
<body>
 <h2>HTML Links — ប្រភេទ href</h2>

 <div class="box">
 <div class="label">🌐 External link</div>
 <a href="https://www.google.com" target="_blank">
 Google.com (Tab ថ្មី)
 </a>
 </div>

 <div class="box">
 <div class="label">📧 Email link</div>
 <a href="mailto:hello@rean2code.org">
 hello@rean2code.org
 </a>
 </div>

 <div class="box">
 <div class="label">📞 Phone link</div>
 <a href="tel:+85512345678">
 +855 12 345 678
 </a>
 </div>

 <div class="box">
 <div class="label">🖼 Image as Link</div>
 <a href="https://www.google.com" target="_blank">
 <img src="https://placehold.co/200x60?text=Click+Me"
 alt="Image Link" style="border-radius:6px;">
 </a>
 </div>

 <div class="box">
 <div class="label">🔖 Button-style Link</div>
 <a href="#"
 style="display:inline-block; padding:10px 20px;
 background:#0066cc; color:white;
 border-radius:6px; text-decoration:none;">
 ចុចខ្ញុំ!
 </a>
 </div>
</body>
</html>`,

 images: `<!DOCTYPE html>
<html>
<head>
<style>
 body { font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif; padding: 20px; }
 img { border-radius: 8px; display: block; margin: 8px 0; }
 .caption { font-size: 13px; color: #666; margin-bottom: 16px; }
 h3 { margin-bottom: 4px; color: #333; font-size: 15px; }
</style>
</head>
<body>
 <h2>HTML Images</h2>

 <h3>ទំហំដោយ width & height</h3>
 <img src="https://placehold.co/300x150?text=300x150"
 alt="ទំហំ 300x150" width="300" height="150">
 <div class="caption">width="300" height="150"</div>

 <h3>responsive — 100%</h3>
 <img src="https://placehold.co/600x200?text=Full+Width"
 alt="Full width" style="width:100%; height:auto;">
 <div class="caption">style="width:100%; height:auto;"</div>

 <h3>ស្នាម Border + Radius</h3>
 <img src="https://placehold.co/200x200?text=Avatar"
 alt="Avatar"
 style="border-radius:50%; width:100px; height:100px;
 border:3px solid #0066cc;">
 <div class="caption">border-radius:50% → រូបភាពមូល</div>
</body>
</html>`,

 tables: `<!DOCTYPE html>
<html>
<head>
<style>
 body { font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif; padding: 20px; }
 table {
 border-collapse: collapse;
 width: 100%;
 margin: 12px 0;
 border-radius: 8px;
 overflow: hidden;
 box-shadow: 0 1px 6px rgba(0,0,0,0.1);
 }
 th {
 background: #0066cc;
 color: white;
 padding: 10px 14px;
 text-align: left;
 }
 td {
 padding: 9px 14px;
 border-bottom: 1px solid #eee;
 }
 tr:nth-child(even) td { background: #f5f8ff; }
 tr:hover td { background: #e8f0fe; }
 .badge {
 display: inline-block; padding: 2px 8px;
 border-radius: 99px; font-size: 12px;
 background: #d4edda; color: #155724;
 }
</style>
</head>
<body>
 <h2>តារាង HTML</h2>

 <table>
 <thead>
 <tr>
 <th>#</th>
 <th>ឈ្មោះ</th>
 <th>តួនាទី</th>
 <th>ស្ថានភាព</th>
 </tr>
 </thead>
 <tbody>
 <tr>
 <td>1</td>
 <td>សំណាង</td>
 <td>Frontend Dev</td>
 <td><span class="badge">Active</span></td>
 </tr>
 <tr>
 <td>2</td>
 <td>ចន្ទ</td>
 <td>UI Designer</td>
 <td><span class="badge">Active</span></td>
 </tr>
 <tr>
 <td>3</td>
 <td>ម៉ារីណា</td>
 <td>Backend Dev</td>
 <td><span class="badge">Active</span></td>
 </tr>
 </tbody>
 </table>

 <!-- colspan / rowspan -->
 <h3 style="margin-top:20px">colspan & rowspan</h3>
 <table>
 <tr>
 <th colspan="2">ឈ្មោះ</th>
 <th>អាយុ</th>
 </tr>
 <tr>
 <td>នាម</td>
 <td>គ្នា</td>
 <td rowspan="2">25</td>
 </tr>
 <tr>
 <td>ពី</td>
 <td>ភ្នំពេញ</td>
 </tr>
 </table>
</body>
</html>`,

 lists: `<!DOCTYPE html>
<html>
<head>
<style>
 body { font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif; padding: 20px; }
 h3 { color: #0066cc; margin: 16px 0 6px; }
 ul, ol { margin: 0; padding-left: 24px; line-height: 2; }
 dl dt { font-weight: bold; color: #333; margin-top: 10px; }
 dl dd { margin-left: 20px; color: #555; font-size: 14px; }
 .custom-ul {
 list-style: none; padding: 0;
 }
 .custom-ul li::before {
 content: "✅ ";
 }
</style>
</head>
<body>
 <h3>Unordered List &lt;ul&gt;</h3>
 <ul>
 <li>HTML</li>
 <li>CSS</li>
 <li>JavaScript</li>
 <li>React</li>
 </ul>

 <h3>Ordered List &lt;ol&gt;</h3>
 <ol>
 <li>រៀន HTML</li>
 <li>រៀន CSS</li>
 <li>រៀន JavaScript</li>
 <li>បង្កើតគម្រោង</li>
 </ol>

 <h3>Nested List</h3>
 <ul>
 <li>Frontend
 <ul>
 <li>HTML</li>
 <li>CSS</li>
 <li>JavaScript</li>
 </ul>
 </li>
 <li>Backend
 <ul>
 <li>Node.js</li>
 <li>Python</li>
 </ul>
 </li>
 </ul>

 <h3>Description List &lt;dl&gt;</h3>
 <dl>
 <dt>HTML</dt>
 <dd>HyperText Markup Language — ភាសារចនាសម្ព័ន្ធ</dd>
 <dt>CSS</dt>
 <dd>Cascading Style Sheets — ភាសាបំប៉ន</dd>
 </dl>

 <h3>Custom List (CSS)</h3>
 <ul class="custom-ul">
 <li>ងាយស្រួលរៀន</li>
 <li>ប្រើបានគ្រប់ Browser</li>
 <li>ជំហានដំបូងក្លាយជា Developer</li>
 </ul>
</body>
</html>`,

 fullPlayground: `<!DOCTYPE html>
<html lang="km">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>HTML + CSS + JS Playground</title>
 <style>
 * { box-sizing: border-box; margin: 0; padding: 0; }
 body {
 font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
 background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
 min-height: 100vh;
 display: flex;
 align-items: center;
 justify-content: center;
 padding: 20px;
 }
 .card {
 background: white;
 border-radius: 16px;
 padding: 32px;
 max-width: 400px;
 width: 100%;
 box-shadow: 0 20px 60px rgba(0,0,0,0.3);
 text-align: center;
 }
 h1 { color: #764ba2; margin-bottom: 8px; }
 p { color: #666; margin-bottom: 20px; font-size: 15px; }
 input {
 width: 100%; padding: 10px 14px; border: 2px solid #e0e0e0;
 border-radius: 8px; font-size: 15px; margin-bottom: 12px;
 outline: none; transition: border 0.2s;
 }
 input:focus { border-color: #764ba2; }
 button {
 background: linear-gradient(135deg, #667eea, #764ba2);
 color: white; border: none; padding: 12px 28px;
 border-radius: 8px; font-size: 16px; cursor: pointer;
 width: 100%; transition: transform 0.1s;
 }
 button:hover { transform: scale(1.02); }
 #result {
 margin-top: 16px; font-size: 20px; font-weight: bold;
 color: #764ba2; min-height: 28px;
 }
 </style>
</head>
<body>
 <div class="card">
 <h1>Playground 🚀</h1>
 <p>បញ្ចូលឈ្មោះ ហើយចុចប៊ូតុង</p>
 <input id="nameInput" type="text" placeholder="ឈ្មោះរបស់អ្នក...">
 <button onclick="greet()">ជំរាបសួរ!</button>
 <div id="result"></div>
 </div>
 <script>
 function greet() {
 const name = document.getElementById('nameInput').value;
 const result = document.getElementById('result');
 if (name.trim()) {
 result.textContent = '👋 សួស្តី, ' + name + '!';
 } else {
 result.textContent = '⚠️ សូមបញ្ចូលឈ្មោះ!';
 }
 }
 </script>
</body>
</html>`,
}

/* ─────────────────── Reusable UI helpers ─────────────────── */
function Note({ children }: { children: React.ReactNode }) {
 return (
 <div className="flex gap-3 bg-card border border-border rounded-[14px] p-4 text-[14px] shadow-sm my-4 transition-colors">
 <Info className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
 <div className="text-muted-foreground leading-relaxed [&>strong]:text-foreground [&>b]:text-foreground">{children}</div>
 </div>
 )
}

function Tip({ children }: { children: React.ReactNode }) {
 return (
 <div className="flex gap-3 bg-card border border-border rounded-[14px] p-4 text-[14px] shadow-sm my-4 transition-colors">
 <Lightbulb className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
 <div className="text-muted-foreground leading-relaxed [&>strong]:text-foreground [&>b]:text-foreground">{children}</div>
 </div>
 )
}

function Warn({ children }: { children: React.ReactNode }) {
 return (
 <div className="flex gap-3 bg-card border border-border rounded-[14px] p-4 text-[14px] shadow-sm my-4 transition-colors">
 <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
 <div className="text-muted-foreground leading-relaxed [&>strong]:text-foreground [&>b]:text-foreground">{children}</div>
 </div>
 )
}

function Good({ children }: { children: React.ReactNode }) {
 return (
 <div className="flex gap-3 bg-card border border-border rounded-[14px] p-4 text-[14px] shadow-sm my-4 transition-colors">
 <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
 <div className="text-muted-foreground leading-relaxed [&>strong]:text-foreground [&>b]:text-foreground">{children}</div>
 </div>
 )
}

function CodeBlock({ children }: { children: string }) {
 return (
 <pre className="bg-muted text-foreground p-4 rounded-lg font-mono text-sm overflow-x-auto leading-relaxed border border-border">
 {children}
 </pre>
 )
}

function Tag({ name }: { name: string }) {
 return (
 <code className="font-mono bg-muted text-foreground px-1.5 py-0.5 rounded text-[13px]">
 {name}
 </code>
 )
}

import React, { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import confetti from "canvas-confetti"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

const playSuccessChime = () => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const gain = ctx.createGain();
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1);

    const playNote = (freq: number, delay: number) => {
      const osc = ctx.createOscillator();
      osc.connect(gain);
      osc.type = "sine";
      osc.frequency.value = freq;
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + Math.max(delay + 0.3, 0.8));
    };

    playNote(523.25, 0);    // C5
    playNote(659.25, 0.1);  // E5
    playNote(783.99, 0.2);  // G5
    playNote(1046.50, 0.3); // C6
  } catch (e) {
    console.error(e);
  }
}

/* ─────────────────────── Quizzes & Quiz Component ─────────────────────── */
const QUIZZES: Record<string, {
  questionKhmer: string;
  questionEnglish: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}> = {
  intro: {
    questionKhmer: "តើពាក្យថា HTML មកពីពាក្យពេញមួយណា?",
    questionEnglish: "What does HTML stand for?",
    options: [
      "Hyperlinks and Text Markup Language",
      "HyperText Markup Language",
      "Home Tool Markup Language",
      "Hyperlink Text Management Language"
    ],
    correctIndex: 1,
    explanation: "HTML តំណាងឱ្យ HyperText Markup Language ដែលជាភាសាគ្រោងឆ្អឹងស្តង់ដារសម្រាប់បង្កើតទំព័រវេបសាយ។"
  },
  editors: {
    questionKhmer: "តើកន្ទុយឯកសារ (file extension) មួយណាដែលត្រូវបានប្រើសម្រាប់រក្សាទុកឯកសារ HTML?",
    questionEnglish: "Which file extension is used to save HTML documents?",
    options: [
      ".css",
      ".js",
      ".html",
      ".txt"
    ],
    correctIndex: 2,
    explanation: "ឯកសារ HTML ត្រូវតែរក្សាទុកជាមួយកន្ទុយ .html ឬ .htm ដើម្បីឱ្យកម្មវិធីរុករក (Browser) អាចអាន និងបង្ហាញវាបានត្រឹមត្រូវ។"
  },
  basic: {
    questionKhmer: "តើ element មួយណាជា root container (ធុងផ្ទុកធំបំផុត) នៃឯកសារ HTML ទាំងមូល?",
    questionEnglish: "Which element is the root container of an HTML document?",
    options: [
      "<body>",
      "<html>",
      "<head>",
      "<!DOCTYPE>"
    ],
    correctIndex: 1,
    explanation: "Element <html> គឺជា root element ដែលផ្ទុកនូវរាល់ element ទាំងអស់នៃទំព័រវេបសាយ លើកលែងតែការប្រកាសប្រភេទឯកសារ <!DOCTYPE html>។"
  },
  elements: {
    questionKhmer: "តើ element មួយណាខាងក្រោមនេះជា Void Element (element គ្មាន tag បិទ)?",
    questionEnglish: "Which of the following is a Void Element?",
    options: [
      "<p>",
      "<div>",
      "<img>",
      "<a>"
    ],
    correctIndex: 2,
    explanation: "<img> គឺជា Void Element (ឬ Self-closing) ដែលមិនមាន tag បិទ </img> ទេ ដោយសារវាផ្ទុកព័ត៌មាននៅក្នុង attributes (ដូចជា src និង alt)។"
  },
  attributes: {
    questionKhmer: "តើ attribute មួយណាដែលប្រើសម្រាប់កំណត់ទីតាំង URL គោលដៅនៃតំណភ្ជាប់នៅក្នុង tag <a>?",
    questionEnglish: "Which attribute specifies the destination URL of a link in an <a> tag?",
    options: [
      "src",
      "href",
      "link",
      "target"
    ],
    correctIndex: 1,
    explanation: "Attribute href (Hypertext Reference) ត្រូវបានប្រើនៅក្នុង tag <a> ដើម្បីប្រាប់ពីអាសយដ្ឋានវេបសាយ ឬទីតាំងដែលត្រូវទៅដល់។"
  },
  headings: {
    questionKhmer: "ហេតុអ្វីបានជាគេណែនាំឱ្យប្រើប្រាស់ tag <h1> តែមួយគត់នៅលើទំព័រនីមួយៗ?",
    questionEnglish: "Why is it recommended to use only one <h1> tag per page?",
    options: [
      "ព្រោះវាជាលក្ខខណ្ឌបង្ខំរបស់ Browser បើមិនដូច្នោះទេកូដនឹងគាំង។",
      "ដើម្បីជួយដល់ SEO និងការយល់ដឹងរបស់ Search Engine អំពីប្រធានបទចម្បងនៃទំព័រ។",
      "ដើម្បីធ្វើឱ្យទំព័រដំណើរការលឿនជាងមុន។",
      "ដើម្បីកាត់បន្ថយទំហំឯកសារ HTML។"
    ],
    correctIndex: 1,
    explanation: "Search Engine ដូចជា Google ប្រើប្រាស់ <h1> ដើម្បីកំណត់ប្រធានបទសំខាន់បំផុតរបស់ទំព័រ។ ការប្រើប្រាស់វាលើសពីមួយ អាចធ្វើឱ្យប៉ះពាល់ដល់ SEO របស់វេបសាយ។"
  },
  paragraphs: {
    questionKhmer: "តើ tag មួយណាដែលប្រើសម្រាប់បង្ហាញអត្ថបទដោយរក្សាទុកដកឃ្លា (spaces) និងការចុះបន្ទាត់ (newlines) ដូចកូដប្រភពដើម?",
    questionEnglish: "Which tag is used to preserve whitespace and line breaks exactly as written in the HTML code?",
    options: [
      "<br>",
      "<p>",
      "<pre>",
      "<span>"
    ],
    correctIndex: 2,
    explanation: "Tag <pre> (Preformatted Text) នឹងបង្ហាញអត្ថបទទៅតាមទម្រង់ដើមទាំងស្រុង រួមទាំងរាល់ការចុះបន្ទាត់ និងដកឃ្លាច្រើនដង។"
  },
  styles: {
    questionKhmer: "តើវិធីសរសេរ CSS មួយណាដែលត្រូវបានសរសេរដោយផ្ទាល់នៅក្នុង attribute style របស់ element HTML?",
    questionEnglish: "Which CSS implementation method is used inside the style attribute of an HTML element?",
    options: [
      "External CSS",
      "Internal CSS",
      "Inline CSS",
      "Embedded CSS"
    ],
    correctIndex: 2,
    explanation: "Inline CSS គឺជាការកំណត់ស្ទីលដោយផ្ទាល់លើ element នីមួយៗតាមរយៈ attribute style (ឧទាហរណ៍៖ <p style=\"color: red;\">)។"
  },
  formatting: {
    questionKhmer: "តើ tag <b> និង tag <strong> មានភាពខុសគ្នាដូចម្តេច?",
    questionEnglish: "What is the difference between <b> and <strong> tags?",
    options: [
      "គ្មានភាពខុសគ្នាទាល់តែសោះ។",
      "<b> ធ្វើឱ្យអក្សរដិតធម្មតា (Visual) ចំណែក <strong> បន្ថែមអត្ថន័យសំខាន់សម្រាប់ SEO និង Screen Reader (Semantic)។",
      "<strong> ធ្វើឱ្យអក្សរធំជាង <b>។",
      "<b> ជា block element ចំណែក <strong> ជា inline element។"
    ],
    correctIndex: 1,
    explanation: "បើទោះបីជាបង្ហាញជាអក្សរដិតដូចគ្នា ប៉ុន្តែ <strong> ផ្ដើមអត្ថន័យជាសេម៉ង់ទិក (Semantic) ថាអត្ថបទនោះមានសារៈសំខាន់ ដែលជួយដល់បច្ចេកវិទ្យាជំនួយ (Screen Reader) និង SEO។"
  },
  comments: {
    questionKhmer: "តើការសរសេរកំណត់ចំណាំ (Comment) ក្នុង HTML មួយណាដែលត្រឹមត្រូវ?",
    questionEnglish: "Which is the correct way to write an HTML comment?",
    options: [
      "// នេះជា comment",
      "/* នេះជា comment */",
      "<!-- នេះជា comment -->",
      "# នេះជា comment"
    ],
    correctIndex: 2,
    explanation: "ក្នុង HTML កូដកំណត់ចំណាំត្រូវតែសរសេរនៅក្នុងចន្លោះ <!-- និង -->។ Browser នឹងមិនបង្ហាញ comment ទាំងនេះនៅលើទំព័រវេបសាយឡើយ។"
  },
  links: {
    questionKhmer: "តើតម្លៃ (value) មួយណានៃ attribute target ដែលប្រើសម្រាប់បើកតំណភ្ជាប់ (link) នៅក្នុង Tab ថ្មី?",
    questionEnglish: "Which target value is used to open a link in a new tab?",
    options: [
      "target=\"_self\"",
      "target=\"_parent\"",
      "target=\"_blank\"",
      "target=\"_new\""
    ],
    correctIndex: 2,
    explanation: "target=\"_blank\" ប្រាប់ឱ្យ Browser បើក link នោះនៅក្នុង Tab ថ្មី ឬ Window ថ្មី។"
  },
  images: {
    questionKhmer: "តើ attribute alt នៅក្នុង tag <img> មានតួនាទីអ្វី?",
    questionEnglish: "What is the purpose of the alt attribute in an <img> tag?",
    options: [
      "កំណត់កម្រិតពន្លឺរបស់រូបភាព។",
      "បង្ហាញអត្ថបទជំនួសរូបភាព ប្រសិនបើរូបភាពខូច ឬសម្រាប់ជួយដល់ជនពិការភ្នែក (Screen Reader) និង SEO។",
      "បង្កើតតំណភ្ជាប់ពេលចុចលើរូបភាព។",
      "កំណត់ទំហំស៊ុមរបស់រូបភាព។"
    ],
    correctIndex: 1,
    explanation: "Alt (Alternative Text) គឺចាំបាច់បំផុតសម្រាប់ភាពងាយស្រួលប្រើប្រាស់ (Accessibility) និង SEO ដោយវាផ្តល់ការពិពណ៌នាអំពីខ្លឹមសាររូបភាព។"
  },
  tables: {
    questionKhmer: "តើ attribute មួយណាដែលប្រើសម្រាប់ភ្ជាប់ (merge) ក្រឡាតារាងច្រើនជួរឈរ (columns) ផ្ដេកចូលគ្នា?",
    questionEnglish: "Which attribute is used to merge multiple table columns horizontally?",
    options: [
      "rowspan",
      "colspan",
      "headerspan",
      "mergecol"
    ],
    correctIndex: 1,
    explanation: "colspan (column span) ប្រើសម្រាប់ពង្រីក ឬបញ្ជូលគ្នានៃក្រឡាច្រើននៅក្នុងជួរដេក (horizontal merging)។"
  },
  lists: {
    questionKhmer: "តើ tag មួយណាដែលប្រើសម្រាប់បង្កើតបញ្ជីរាយនាមមានលេខរៀបតាមលំដាប់លំដោយ (Ordered List)?",
    questionEnglish: "Which HTML tag is used to start an ordered list?",
    options: [
      "<ul>",
      "<li>",
      "<ol>",
      "<dl>"
    ],
    correctIndex: 2,
    explanation: "Tag <ol> (Ordered List) ប្រើសម្រាប់បញ្ជីដែលមានលេខរៀង (១, ២, ៣...) ខណៈពេលដែល <ul> (Unordered List) ប្រើសម្រាប់បញ្ជីដែលមានចំណុចមូល។"
  },
  compiler: {
    questionKhmer: "តើ tag មួយណាដែលត្រូវបានប្រើសម្រាប់ចុះបន្ទាត់ (Line Break) ក្នុង HTML?",
    questionEnglish: "Which tag is used for a line break in HTML?",
    options: [
      "<lb>",
      "<break>",
      "<br>",
      "<hr>"
    ],
    correctIndex: 2,
    explanation: "<br> (break) ត្រូវបានប្រើដើម្បីចុះបន្ទាត់ថ្មី នៅក្នុងកថាខណ្ឌអត្ថបទ។"
  }
};

function Quiz({
  chapterId,
  isCompleted,
  onCorrect,
}: {
  chapterId: string;
  isCompleted: boolean;
  onCorrect: () => void;
}) {
  const quiz = QUIZZES[chapterId];
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showError, setShowError] = useState(false);
  const { trigger } = useWebHaptics();

  useEffect(() => {
    if (isCompleted) {
      setSelectedOption(quiz?.correctIndex ?? null);
      setSubmitted(true);
    } else {
      setSelectedOption(null);
      setSubmitted(false);
    }
    setShowError(false);
  }, [chapterId, isCompleted, quiz]);

  if (!quiz) return null;

  const handleOptionSelect = (index: number) => {
    if (submitted) return;
    setSelectedOption(index);
    setShowError(false);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setSubmitted(true);
    if (selectedOption === quiz.correctIndex) {
      setShowError(false);
      trigger("success");
      onCorrect();
    } else {
      setShowError(true);
      trigger("heavy");
    }
  };

  const handleRetry = () => {
    setSelectedOption(null);
    setSubmitted(false);
    setShowError(false);
  };

  return (
    <div className="space-y-6 transition-all duration-300 font-sans">
      <div className="space-y-2">
        <h3 className="text-xl md:text-2xl font-bold text-foreground leading-normal tracking-tight font-serif">
          {quiz.questionKhmer}
        </h3>
        <p className="text-xs text-muted-foreground/80 tracking-widest uppercase">
          {quiz.questionEnglish}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 w-full max-w-3xl">
        {quiz.options.map((option, idx) => {
          const isSelected = selectedOption === idx;
          const isCorrectChoice = idx === quiz.correctIndex;
          
          let cardBorder = "border-border bg-card/10 dark:bg-card/5 hover:bg-card/20 hover:border-primary/40";
          let letterBg = "bg-muted/40 text-muted-foreground border-r border-border";
          let icon = null;

          if (submitted) {
            const isCorrectAnswer = selectedOption === quiz.correctIndex;
            
            if (isCorrectAnswer) {
              if (isCorrectChoice) {
                cardBorder = "border-[#5db872] bg-[#5db872]/5";
                letterBg = "bg-[#5db872]/15 text-[#5db872] border-r border-[#5db872]/20";
                icon = (
                  <div className="w-5 h-5 rounded-full bg-[#5db872] flex items-center justify-center text-white shrink-0 mr-4">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                );
              } else {
                cardBorder = "border-border/60 opacity-60 bg-card/5";
                letterBg = "bg-muted/20 text-muted-foreground border-r border-border/40";
              }
            } else {
              if (isSelected) {
                cardBorder = "border-[#c64545] bg-[#c64545]/5";
                letterBg = "bg-[#c64545]/15 text-[#c64545] border-r border-[#c64545]/20";
                icon = (
                  <div className="w-5 h-5 rounded-full bg-[#c64545] flex items-center justify-center text-white shrink-0 mr-4">
                    <X className="h-3 w-3 stroke-[3]" />
                  </div>
                );
              } else {
                cardBorder = "border-border bg-card/10 dark:bg-card/5";
                letterBg = "bg-muted/40 text-muted-foreground border-r border-border";
              }
            }
          } else if (isSelected) {
            cardBorder = "border-primary bg-primary/5";
            letterBg = "bg-primary/10 text-primary border-r border-primary/20";
          }

          return (
            <button
              key={idx}
              disabled={submitted}
              onClick={() => handleOptionSelect(idx)}
              className={`w-full p-0 overflow-hidden rounded-xl border text-sm transition-all duration-150 flex items-center justify-between gap-3 text-left font-sans ${cardBorder}`}
            >
              <div className="flex items-center gap-4 flex-1">
                {/* Left letter block sidebar */}
                <div className={`w-12 py-4 flex items-center justify-center font-mono font-bold text-xs shrink-0 select-none ${letterBg}`}>
                  {String.fromCharCode(65 + idx)}
                </div>
                {/* Choice Text */}
                <span className="text-foreground font-medium py-2 pr-2">{option}</span>
              </div>
              {icon}
            </button>
          );
        })}
      </div>

      <div className="space-y-4">
        {!submitted ? (
          <button
            disabled={selectedOption === null}
            onClick={handleSubmit}
            className="px-6 py-2.5 rounded-full bg-[#2d8a6b] hover:bg-[#206950] text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-150 font-medium text-sm shadow-sm font-sans"
          >
            ផ្ទៀងផ្ទាត់ចម្លើយ (Submit Answer)
          </button>
        ) : (
          selectedOption !== quiz.correctIndex && (
            <button
              onClick={handleRetry}
              className="px-6 py-2.5 rounded-full bg-primary hover:bg-primary/95 text-white transition-all duration-150 font-medium text-sm shadow-sm font-sans"
            >
              ព្យាយាមម្ដងទៀត (Try Again)
            </button>
          )
        )}

        {showError && selectedOption !== quiz.correctIndex && (
          <div className="flex gap-2.5 bg-[#c64545]/5 dark:bg-[#c64545]/10 border-2 border-[#c64545]/20 rounded-xl p-4 text-xs md:text-sm text-[#c64545] font-sans max-w-3xl">
            <XCircle className="h-5 w-5 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold uppercase tracking-wider text-xs">ចម្លើយមិនទាន់ត្រឹមត្រូវទេ!</strong> សូមពិនិត្យខ្លឹមសារមេរៀនឡើងវិញ ហើយសាកល្បងម្ដងទៀត។
            </div>
          </div>
        )}

        {(isCompleted || (submitted && selectedOption === quiz.correctIndex)) && (
          <div className="flex gap-3 bg-[#5db872]/5 dark:bg-[#5db872]/10 border-2 border-[#5db872]/20 rounded-xl p-4 text-xs md:text-sm text-[#5db872] font-sans leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-300 max-w-3xl">
            <CheckCircle2 className="h-5 w-5 text-[#5db872] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="font-bold text-[#5db872] uppercase tracking-wider text-xs">
                {isCompleted ? "មេរៀនបានបញ្ចប់រួចរាល់" : "🎉 ត្រឹមត្រូវល្អណាស់!"}
              </div>
              <div>{quiz.explanation}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────── Page ─────────────────────── */
export default function LearnHtmlPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [showFinishAlert, setShowFinishAlert] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [completedChapters, setCompletedChapters] = useState<string[]>([]);
  const totalChapters = 15;

  const CHAPTER_IDS = [
    "intro", "editors", "basic", "elements", "attributes", "headings", 
    "paragraphs", "styles", "formatting", "comments", "links", 
    "images", "tables", "lists", "compiler"
  ];

  useEffect(() => {
    const handler = (e: any) => {
      const idx = CHAPTER_IDS.indexOf(e.detail);
      if (idx !== -1) {
        setCurrentChapterIndex(idx);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('chapterChange', handler);
    return () => window.removeEventListener('chapterChange', handler);
  }, []);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('chapterChangeActive', { detail: CHAPTER_IDS[currentChapterIndex] }));
  }, [currentChapterIndex]);

  useEffect(() => {
    fetch('/api/progress/html')
      .then(r => r.json())
      .then(res => {
        if (res.success && res.data?.completed) {
          setCompletedChapters(res.data.completed);
        }
      })
      .catch(console.error);
  }, [session]);

  const handleNext = () => {
    if (!session) {
      setShowLoginAlert(true);
      return;
    }
    
    if (currentChapterIndex === totalChapters - 1) {
      playSuccessChime();
      confetti({
        particleCount: 200,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#cc785c', '#e09882', '#f5f5f7', '#ffd700']
      });
      setShowFinishAlert(true);
    } else {
      setCurrentChapterIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

 return <div className="flex flex-col w-full h-[calc(100vh-64px)] overflow-hidden">
  <div className="flex-1 overflow-y-auto px-4 md:px-8 py-10 pb-24 scroll-smooth">
   <div className="max-w-4xl mx-auto">

 {/* ── Hero ── */}
 <div className="space-y-4 mb-12">
 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
 <Code2 className="h-3 w-3" />
 <span>ភាសា HTML — មេរៀនទី ១</span>
 </div>
 <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
 សិក្សាភាសា HTML ពីកម្រិតដំបូង
 </h1>
 <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl">
 HTML (HyperText Markup Language) គឺជាភាសាគ្រោងឆ្អឹងស្តង់ដារ
 សម្រាប់បង្កើតទំព័រវេបសាយ។ វាបង្ហាញ Browser ថា
 តើត្រូវបង្ហាញអ្វី — ចំណងជើង អត្ថបទ រូបភាព តំណភ្ជាប់ ។ល។
 </p>

 </div>
 
  <div className="divide-y divide-zinc-200 dark:divide-zinc-800 [&>section]:py-16 first:[&>section]:pt-0">


 {/* ══════════════════════════════════════════════
 ១. INTRODUCTION
 ══════════════════════════════════════════════ */}
 <section id="intro" style={{ display: currentChapterIndex === 0 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
 <div className="flex items-center gap-3 border-b pb-3">
 <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">១</span>
 <h2 className="text-2xl font-bold text-foreground">
 សេចក្តីផ្តើមអំពី HTML
 </h2>
 </div>

 <div className="my-4 overflow-hidden rounded-xl border border-border shadow-sm w-full aspect-[3/2]">
 <img src="/images/html_intro.png" alt="HTML Introduction" className="w-full h-full object-cover object-center" />
 </div>

 <p className="text-muted-foreground leading-relaxed">
 <strong className="text-foreground">HTML</strong> — <em>HyperText Markup Language</em> —
 ត្រូវបានបង្កើតឡើងដោយ <strong className="text-foreground">Tim Berners-Lee</strong>
 នៅឆ្នាំ ១៩៩១ ហើយបច្ចុប្បន្នស្ថិតក្នុងកំណែ <strong className="text-foreground">HTML5</strong>
 ដែលជាស្តង់ដារផ្លូវការ។
 HTML ប្រើ <strong>Tags (ស្លាក)</strong> ដើម្បីប្រាប់ Browser ថា
 តើត្រូវបង្ហាញ content យ៉ាងដូចម្ដេច។
 </p>


 <h3 className="font-semibold text-foreground mt-2">ឧទាហរណ៍ — ទំព័រ HTML ទូទៅ</h3>
 <CodeBlock>{`<!DOCTYPE html>
<html lang="km">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>ចំណងជើង Tab</title>
</head>
<body>
 <h1>ជំរាបសួរ ពិភពលោក!</h1>
 <p>HTML គឺជាមូលដ្ឋានគ្រឹះ
 របស់ Web Development។</p>
</body>
</html>`}</CodeBlock>

 <div className="grid gap-3">
 <Note>
 <strong>HTML ≠ ភាសាកម្មវិធី (Programming Language)!</strong> HTML
 ជា Markup Language — វាពណ៌នា (describe) content មិនមែន logic ទេ។
 </Note>
 <Tip>
 Browser (Chrome, Firefox, Safari) ចេះ "អាន" HTML
 ហើយបំប្លែងវាទៅជាទំព័រវេបសាយដែលអ្នកឃើញ។
 </Tip>
 </div>

 <h3 className="font-semibold text-foreground flex items-center gap-2"><Beaker className="h-4 w-4 text-primary" /> សាកល្បងខ្លួនឯង</h3>
 <HtmlCompiler compact defaultCode={code.intro} />
 </section>

 {/* ══════════════════════════════════════════════
 ២. EDITORS
 ══════════════════════════════════════════════ */}
 <section id="editors" style={{ display: currentChapterIndex === 1 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
 <div className="flex items-center gap-3 border-b pb-3">
 <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">២</span>
 <h2 className="text-2xl font-bold text-foreground">
 កម្មវិធីសរសេរកូដ (HTML Editors)
 </h2>
 </div>
 <p className="text-muted-foreground leading-relaxed">
 HTML គ្រាន់ជា text ធម្មតា — អ្នកអាចសរសេរដោយ Notepad!
 ប៉ុន្តែ Code Editor ល្អ ២–៣ ផ្ដល់ feature ដ៏ចំណូលចិត្ត
 ដូចជា Syntax Highlight, Auto-complete, Error detection ។
 </p>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {[
 {
 name: "Visual Studio Code",
 badge: <span className="flex items-center gap-1"><Flame className="h-3 w-3 text-muted-foreground" /> ល្អបំផុត</span>,
 desc: "ឥតគិតថ្លៃ, open-source, Extension ច្រើន, Emmet built-in, Git integration",
 },
 {
 name: "Rean2Code Compiler",
 badge: <span className="flex items-center gap-1"><Zap className="h-3 w-3 text-muted-foreground" /> ទីនេះ!</span>,
 desc: "សរសេរ & Preview ភ្លាមៗ ដោយគ្មានដំឡើង! ល្អបំផុតសម្រាប់ Learning",
 },
 {
 name: "Sublime Text",
 badge: <span className="flex items-center gap-1"><Sparkles className="h-3 w-3 text-muted-foreground" /> លឿន</span>,
 desc: "លឿន, lightweight, Multi-cursor editing, Command Palette",
 },
 {
 name: "Notepad / TextEdit",
 badge: <span className="flex items-center gap-1"><FileText className="h-3 w-3 text-muted-foreground" /> មូលដ្ឋាន</span>,
 desc: "Pre-installed — ល្អសម្រាប់ Learning concept ប៉ុន្តែ feature តិច",
 },
 ].map(({ name, badge, desc }) => (
 <div key={name} className="rounded-xl border border-border bg-card p-4 shadow-sm">
 <div className="flex items-center justify-between mb-2">
 <span className="font-semibold text-foreground text-sm">{name}</span>
 <div className="text-[11px] px-2 py-0.5 rounded-md bg-muted border border-border text-muted-foreground inline-flex">{badge}</div>
 </div>
 <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
 </div>
 ))}
 </div>
 <Note>
 ទំព័រ HTML ត្រូវរក្សាទុកជាឯកសារ <Tag name=".html" /> ឬ <Tag name=".htm" />
 — ឧទាហរណ៍ <Tag name="index.html" />
 </Note>
 </section>

 {/* ══════════════════════════════════════════════
 ៣. BASIC
 ══════════════════════════════════════════════ */}
 <section id="basic" style={{ display: currentChapterIndex === 2 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
 <div className="flex items-center gap-3 border-b pb-3">
 <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">៣</span>
 <h2 className="text-2xl font-bold text-foreground">
 មូលដ្ឋានគ្រឹះ HTML (HTML Basic)
 </h2>
 </div>
 <p className="text-muted-foreground leading-relaxed">
 រាល់ឯកសារ HTML ទាំងអស់ ចាប់ផ្ដើមដោយ Declaration <Tag name="&lt;!DOCTYPE html&gt;" />
 ហើយមានរចនាសម្ព័ន្ធ ៤ ស្រទាប់ចំណាំ៖
 </p>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
 {[
 { tag: "<!DOCTYPE html>", desc: "ប្រកាសប្រភេទ Document ថាជា HTML5 — Browser ត្រូវការ!" },
 { tag: "<html>", desc: "Root Element — ជា Container ធំបំផុតនៃ document ទាំងមូល" },
 { tag: "<head>", desc: "ផ្ទុក metadata: title, charset, CSS links, SEO tags — User មើលមិនឃើញ" },
 { tag: "<body>", desc: "ផ្ទុក content ទាំងអស់ដែলUser ឃើញ: text, images, buttons, ..." },
 ].map(({ tag, desc }) => (
 <div key={tag} className="flex gap-3 p-3 rounded-lg border bg-card">
 <code className="shrink-0 font-mono text-xs bg-primary/10 text-primary px-2 py-1 rounded h-fit">{tag}</code>
 <p className="text-sm text-muted-foreground">{desc}</p>
 </div>
 ))}
 </div>
 <CodeBlock>{`<!DOCTYPE html>
<html lang="km">
<head>
 <meta charset="UTF-8"> <!-- encoding អក្សរ -->
 <meta name="viewport"
 content="width=device-width, initial-scale=1.0"> <!-- mobile-friendly -->
 <title>ចំណងជើង Tab Browser</title>
 <link rel="stylesheet" href="style.css"> <!-- CSS file -->
</head>
<body>
 <!-- Content ទាំងអស់ជ្រុតក្នុង body -->
 <h1>Hello World</h1>
 <p>Paragraph text...</p>
</body>
</html>`}</CodeBlock>
 <Good>
 ប្រើ <Tag name='lang="km"' /> ក្នុង <Tag name="&lt;html&gt;" /> ដើម្បីប្រាប់ Browser
 ថា language របស់ document — ជួយ Screen Reader &amp; SEO!
 </Good>
 <h3 className="font-semibold text-foreground flex items-center gap-2"><Beaker className="h-4 w-4 text-primary" /> សាកល្បង</h3>
 <HtmlCompiler compact defaultCode={code.basic} />
 </section>

 {/* ══════════════════════════════════════════════
 ៤. ELEMENTS
 ══════════════════════════════════════════════ */}
 <section id="elements" style={{ display: currentChapterIndex === 3 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
 <div className="flex items-center gap-3 border-b pb-3">
 <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">៤</span>
 <h2 className="text-2xl font-bold text-foreground">
 ធាតុ HTML (HTML Elements)
 </h2>
 </div>
 <p className="text-muted-foreground leading-relaxed">
 HTML <strong className="text-foreground">Element</strong> = Start Tag + Content + End Tag។
 ធាតុ HTML ខ្លះ (Void Elements) មិនមាន End Tag ទេ។
 </p>

 <div className="bg-card border border-border rounded-[14px] p-5 shadow-sm">
 <div className="flex items-center justify-center gap-1 font-mono text-sm flex-wrap">
 <span className="px-3 py-2 bg-primary/10 border border-primary/20 rounded-lg text-primary font-bold">&lt;p&gt;</span>
 <span className="px-4 py-2 bg-background border border-border rounded-lg text-foreground">ខ្លឹមសារ Content</span>
 <span className="px-3 py-2 bg-primary/10 border border-primary/20 rounded-lg text-primary font-bold">&lt;/p&gt;</span>
 </div>
 <div className="flex justify-center gap-12 mt-2 text-xs text-muted-foreground">
 <span>Start Tag</span>
 <span>Content</span>
 <span>End Tag</span>
 </div>
 </div>

 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 <div className="p-4 rounded-lg border bg-card space-y-2">
 <h4 className="font-semibold text-sm text-foreground">🟢 Element ធម្មតា (Normal)</h4>
 <p className="text-xs text-muted-foreground">មាន Start + End Tag</p>
 <CodeBlock>{`<h1>ចំណងជើង</h1>
<p>កថាខណ្ឌ</p>
<div>Container</div>
<span>Inline</span>
<a href="#">Link</a>`}</CodeBlock>
 </div>
 <div className="p-4 rounded-lg border bg-card space-y-2">
 <h4 className="font-semibold text-sm text-foreground">🔵 Void Element (Self-closing)</h4>
 <p className="text-xs text-muted-foreground">គ្មាន End Tag — Content ផ្ទុកក្នុង Attribute</p>
 <CodeBlock>{`<br> <!-- Line break -->
<hr> <!-- Horizontal line -->
<img src="photo.jpg" alt="">
<input type="text">
<meta charset="UTF-8">
<link rel="stylesheet" href="...">`}</CodeBlock>
 </div>
 </div>

 <h4 className="font-semibold text-foreground text-sm mt-2">Nested Elements (ក្នុង-ក្នុង)</h4>
 <p className="text-sm text-muted-foreground">
 Elements ត្រូវបិទ (close) ត្រឹមត្រូវ — Element ផ្ទៃក្នុង ត្រូវបិទ ក្រោយ Element ខាងក្រៅ!
 </p>
 <CodeBlock>{`<!-- ✅ ត្រឹមត្រូវ -->
<div>
 <p>នេះ <strong>ល្អ</strong> ណាស់</p>
</div>

<!-- ❌ ខុស — Tags លាយ -->
<div>
 <p>នេះ <strong>ខុស</div> !</strong>
</p>`}</CodeBlock>
 <Warn>
 Browser ខ្លះ "ជួសជុល" Error ដោយស្វ័យប្រវត្ត ប៉ុន្តែ
 លទ្ធផលអាចខុស។ ជានិច្ចប្រយ័ត្ន Close Tag ឱ្យត្រឹមត្រូវ!
 </Warn>
 <HtmlCompiler compact defaultCode={code.elements} />
 </section>

 {/* ══════════════════════════════════════════════
 ៥. ATTRIBUTES
 ══════════════════════════════════════════════ */}
 <section id="attributes" style={{ display: currentChapterIndex === 4 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
 <div className="flex items-center gap-3 border-b pb-3">
 <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">៥</span>
 <h2 className="text-2xl font-bold text-foreground">
 លក្ខណៈសម្បត្តិ HTML (HTML Attributes)
 </h2>
 </div>
 <p className="text-muted-foreground leading-relaxed">
 Attributes ផ្ដល់ព័ត៌មានបន្ថែមអំពី Elements។
 ពួកវា<strong className="text-foreground"> ជានិច្ចសរសេរក្នុង Start Tag</strong>
 ហើយបង្ហាញជា Pair <Tag name='name="value"' />
 </p>
 <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
 <div className="flex items-center justify-center gap-1 font-mono text-sm flex-wrap">
 <span className="px-2 py-2 bg-muted rounded text-foreground">&lt;a</span>
 <span className="px-2 py-2 bg-muted rounded text-foreground">href</span>
 <span className="px-1 py-2 text-muted-foreground">=</span>
 <span className="px-2 py-2 bg-muted rounded text-foreground">"https://..."</span>
 <span className="px-2 py-2 bg-muted rounded text-foreground">&gt;</span>
 </div>
 </div>

 <h4 className="font-semibold text-foreground text-sm">Attributes ទូទៅ</h4>
 <div className="overflow-x-auto rounded-lg border">
 <table className="w-full text-sm">
 <thead className="bg-muted">
 <tr>
 <th className="text-left p-3 font-semibold">Attribute</th>
 <th className="text-left p-3 font-semibold">ប្រើជាមួយ</th>
 <th className="text-left p-3 font-semibold">ពន្យល់</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-border">
 {[
 ["href", "<a>", "URL ទិសដៅ Link"],
 ["src", "<img>, <script>", "URL ប្រភព"],
 ["alt", "<img>", "អត្ថបទ fallback ពេលរូបភាពខូច"],
 ["class", "Element ណាមួយ", "ចង CSS class"],
 ["id", "Element ណាមួយ", "ID តែមួយ — ប្រើជា CSS/JS selector"],
 ["style", "Element ណាមួយ", "Inline CSS"],
 ["title", "Element ណាមួយ", "Tooltip ពេល hover"],
 ["target", "<a>", "_blank = Tab ថ្មី"],
 ["width / height", "<img>, <table>", "ទំហំ"],
 ].map(([attr, el, desc]) => (
 <tr key={attr} className="hover:bg-muted/50">
 <td className="p-3 font-mono text-primary text-xs">{attr}</td>
 <td className="p-3 font-mono text-muted-foreground text-xs">{el}</td>
 <td className="p-3 text-muted-foreground text-xs">{desc}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 <HtmlCompiler compact defaultCode={code.attributes} />
 </section>

 {/* ══════════════════════════════════════════════
 ៦. HEADINGS
 ══════════════════════════════════════════════ */}
 <section id="headings" style={{ display: currentChapterIndex === 5 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
 <div className="flex items-center gap-3 border-b pb-3">
 <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">៦</span>
 <h2 className="text-2xl font-bold text-foreground">
 ចំណងជើង HTML (HTML Headings)
 </h2>
 </div>
 <p className="text-muted-foreground leading-relaxed">
 HTML ផ្ដល់ Heading ៦ ចំណាត់ — <Tag name="&lt;h1&gt;" /> ធំ &amp; សំខាន់បំផុត
 ដល់ <Tag name="&lt;h6&gt;" /> តូចបំផុត។ Headings ជួយ
 <strong className="text-foreground"> Browser, Screen Reader, Search Engine</strong>
 យល់ពីរចនាសម្ព័ន្ធទំព័រ (SEO)។
 </p>
 <div className="rounded-xl border bg-card p-5 space-y-1">
 {[
 { tag: "h1", size: "text-4xl", label: "Heading 1 (ធំបំផុត)" },
 { tag: "h2", size: "text-3xl", label: "Heading 2" },
 { tag: "h3", size: "text-2xl", label: "Heading 3" },
 { tag: "h4", size: "text-xl", label: "Heading 4" },
 { tag: "h5", size: "text-lg", label: "Heading 5" },
 { tag: "h6", size: "text-base", label: "Heading 6 (តូចបំផុត)" },
 ].map(({ tag, size, label }) => (
 <div key={tag} className={`${size} font-bold text-foreground leading-tight`}>
 {label}
 </div>
 ))}
 </div>
 <CodeBlock>{`<h1>ចំណងជើងទំព័រ — ប្រើ 1 ដងប៉ុណ្ណោះ</h1>
<h2>ចំណងជើង Section — ប្រើបានច្រើន</h2>
<h3>ចំណងជើង Subsection</h3>
<h4>ចំណងជើងរង</h4>`}</CodeBlock>
 <div className="grid gap-3">
 <Warn>
 <strong>ប្រើ <Tag name="&lt;h1&gt;" /> តែ ១ ដង ក្នុង page!</strong>
 Search Engine ប្រើ h1 ដើម្បីយល់ topic ចំបងរបស់ page — ច្រើនជាង ១ ធ្វើ SEO ខូច។
 </Warn>
 <Tip>
 Headings ត្រូវប្រើតាម <strong>hierarchy</strong> — ៦ h2 ក្នុង h1 ✅,
 h4 បន្ទាប់ h2 ដោយ skip h3 ❌
 </Tip>
 </div>
 <HtmlCompiler compact defaultCode={code.headings} />
 </section>

 {/* ══════════════════════════════════════════════
 ៧. PARAGRAPHS
 ══════════════════════════════════════════════ */}
 <section id="paragraphs" style={{ display: currentChapterIndex === 6 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
 <div className="flex items-center gap-3 border-b pb-3">
 <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">៧</span>
 <h2 className="text-2xl font-bold text-foreground">
 កថាខណ្ឌ HTML (HTML Paragraphs)
 </h2>
 </div>
 <p className="text-muted-foreground leading-relaxed">
 Tag <Tag name="&lt;p&gt;" /> ប្រើបង្កើតកថាខណ្ឌ — <em>Block-level element</em>
 ដែល Browser ទុកគម្លាតខាងក្រោម (margin) ស្វ័យប្រវត្ត។
 </p>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
 {[
 {
 title: "<p> — Paragraph",
 code: `<p>នេះជាកថាខណ្ឌ។
 Spaces ច្រើន
 ត្រូវ collapse។</p>`,
 note: "Browser compress spaces → ១ space",
 },
 {
 title: "<br> — Line Break",
 code: `<p>
 បន្ទាត់ ១<br>
 បន្ទាត់ ២<br>
 បន្ទាត់ ៣
</p>`,
 note: "Void element — បំបែកបន្ទាត់",
 },
 {
 title: "<hr> — Horizontal Rule",
 code: `<p>Section ទី ១</p>
<hr>
<p>Section ទី ២</p>`,
 note: "Divider ខ្សែបន្ទាត់",
 },
 {
 title: "<pre> — Preformatted",
 code: `<pre>
 name: ខ្ញុំ
 age: 25
</pre>`,
 note: "រក្សា spaces & newlines ដើម",
 },
 ].map(({ title, code: c, note }) => (
 <div key={title} className="rounded-lg border bg-card p-4 space-y-2">
 <span className="font-semibold text-sm text-foreground">{title}</span>
 <pre className="bg-muted text-foreground text-xs p-3 rounded font-mono overflow-x-auto">{c}</pre>
 <p className="text-xs text-muted-foreground">{note}</p>
 </div>
 ))}
 </div>
 <HtmlCompiler compact defaultCode={code.paragraphs} />
 </section>

 {/* ══════════════════════════════════════════════
 ៨. STYLES
 ══════════════════════════════════════════════ */}
 <section id="styles" style={{ display: currentChapterIndex === 7 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
 <div className="flex items-center gap-3 border-b pb-3">
 <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">៨</span>
 <h2 className="text-2xl font-bold text-foreground">
 ស្តាយ HTML (HTML Styles + CSS)
 </h2>
 </div>
 <div className="my-4 overflow-hidden rounded-xl border border-border shadow-sm w-full aspect-[3/2]">
 <img src="/images/html_styles.png" alt="HTML Styles" className="w-full h-full object-cover object-center" />
 </div>
 <p className="text-muted-foreground leading-relaxed">
 CSS (Cascading Style Sheets) ប្រើបំប៉ន HTML Elements — ពណ៌, ហ្វុន, ទំហំ, padding, animation ។ល។
 CSS អាចបន្ថែម <strong className="text-foreground">៣ វិធី</strong>:
 </p>
 <div className="grid grid-cols-1 gap-4">
 {[
 {
 type: "1️⃣ Inline CSS",
 code: `<p style="color: red; font-size: 20px;">
 អត្ថបទក្រហម
</p>`,
 pros: "លឿន, specific",
 cons: "ពិបាករក្សា, មិន reusable",
 },
 {
 type: "2️⃣ Internal CSS (ក្នុង <head>)",
 code: `<style>
 p { color: blue; }
 h1 { font-size: 32px; }
</style>`,
 pros: "ល្អសម្រាប់ page តែមួយ",
 cons: "មិន share ជាមួយ page ផ្សេង",
 },
 {
 type: "3️⃣ External CSS (file .css)",
 code: `<!-- ក្នុង <head> -->
<link rel="stylesheet" href="style.css">

<!-- ក្នុង style.css -->
body { font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif; }`,
 pros: "✅ Best practice — reusable, ងាយ maintain",
 cons: "ត្រូវ file CSS ផ្ទាល់",
 },
 ].map(({ type, code: c, pros, cons }) => (
 <div key={type} className="rounded-lg border bg-card p-4 space-y-3">
 <h4 className="font-semibold text-sm text-foreground">{type}</h4>
 <pre className="bg-muted text-foreground text-xs p-3 rounded font-mono overflow-x-auto">{c}</pre>
 <div className="flex gap-4 text-xs">
 <span className="text-green-600 dark:text-green-400">✅ {pros}</span>
 <span className="text-red-500">⚠️ {cons}</span>
 </div>
 </div>
 ))}
 </div>
 <h4 className="font-semibold text-foreground text-sm">CSS Properties ទូទៅ</h4>
 <div className="overflow-x-auto rounded-lg border">
 <table className="w-full text-xs">
 <thead className="bg-muted">
 <tr>
 <th className="text-left p-3 font-semibold">Property</th>
 <th className="text-left p-3 font-semibold">ឧទាហរណ៍</th>
 <th className="text-left p-3 font-semibold">ពន្យល់</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-border">
 {[
 ["color", "color: red", "ពណ៌អក្សរ"],
 ["background-color", "background-color: #f0f0f0", "ពណ៌ background"],
 ["font-size", "font-size: 18px", "ទំហំអក្សរ"],
 ["font-family", "font-family: Arial", "ប្រភេទ font"],
 ["font-weight", "font-weight: bold", "ភាពស្តើងដិត"],
 ["text-align", "text-align: center", "ការតម្រឹម"],
 ["margin", "margin: 10px", "គម្លាតខាងក្រៅ"],
 ["padding", "padding: 10px", "គម្លាតខាងក្នុង"],
 ["border", "border: 1px solid #ccc", "ស្នាមព័ទ្ធ"],
 ["border-radius", "border-radius: 8px", "ជ្រុងមូល"],
 ].map(([prop, ex, desc]) => (
 <tr key={prop} className="hover:bg-muted/50">
 <td className="p-3 font-mono text-primary">{prop}</td>
 <td className="p-3 font-mono text-muted-foreground">{ex}</td>
 <td className="p-3 text-muted-foreground">{desc}</td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 <HtmlCompiler compact defaultCode={code.styles} />
 </section>

 {/* ══════════════════════════════════════════════
 ៩. FORMATTING
 ══════════════════════════════════════════════ */}
 <section id="formatting" style={{ display: currentChapterIndex === 8 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
 <div className="flex items-center gap-3 border-b pb-3">
 <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">៩</span>
 <h2 className="text-2xl font-bold text-foreground">
 ទម្រង់អត្ថបទ (HTML Text Formatting)
 </h2>
 </div>
 <p className="text-muted-foreground leading-relaxed">
 HTML ផ្ដល់ Tags ពិសេសសម្រាប់ Formatting អត្ថបទ — ទាំង
 <strong className="text-foreground"> Visual</strong> (ដូចជា bold, italic)
 និង <strong className="text-foreground">Semantic</strong> (ពន្យល់ meaning)។
 </p>
 <Note>
 <strong>Visual vs Semantic:</strong> <Tag name="&lt;b&gt;" /> ធ្វើ bold ដោយ visual,
 ប៉ុន្តែ <Tag name="&lt;strong&gt;" /> ប្រាប់ Screen Reader ថា "ខ្លឹមសារនេះសំខាន់"
 — ខុសគ្នា!
 </Note>
 <HtmlCompiler compact defaultCode={code.formatting} />
 </section>

 {/* ══════════════════════════════════════════════
 ១០. COMMENTS
 ══════════════════════════════════════════════ */}
 <section id="comments" style={{ display: currentChapterIndex === 9 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
 <div className="flex items-center gap-3 border-b pb-3">
 <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">១០</span>
 <h2 className="text-2xl font-bold text-foreground">
 កំណត់ចំណាំ (HTML Comments)
 </h2>
 </div>
 <p className="text-muted-foreground leading-relaxed">
 Comment ក្នុង HTML ច្រវ៉ាក់ <Tag name="&lt;!-- ... --&gt;" />
 — Browser <strong className="text-foreground">មិន render</strong> Comment ចេញ។
 Developer ប្រើ Comment ដើម្បី document code, disable element ជាបណ្ដោះអាសន្ន
 ឬ ផ្ដល់ context ដល់ Developer ដទៃ។
 </p>
 <CodeBlock>{`<!-- Comment ១ បន្ទាត់ -->

<!--
 Comment ច្រើនបន្ទាត់
 Browser មើលមិនឃើញ!
-->

<!-- TODO: បន្ថែម Navigation ក្នុង Sprint 2 -->

<!-- disable code ជាបណ្ដោះអាសន្ន
<button>ប៊ូតុងផ្អាក</button>
-->`}</CodeBlock>
 <Tip>
 Comment ត្រូវបានបញ្ជូន (send) ទៅ User ជាមួយ HTML source code —
 <strong> កុំ​ comment sensitive info</strong> ដូចជា Password, API Key!
 </Tip>
 <HtmlCompiler compact defaultCode={code.comments} />
 </section>

 {/* ══════════════════════════════════════════════
 ១១. LINKS
 ══════════════════════════════════════════════ */}
 <section id="links" style={{ display: currentChapterIndex === 10 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
 <div className="flex items-center gap-3 border-b pb-3">
 <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">១១</span>
 <h2 className="text-2xl font-bold text-foreground">
 តំណភ្ជាប់ HTML (HTML Links)
 </h2>
 </div>
 <div className="my-4 overflow-hidden rounded-xl border border-border shadow-sm w-full aspect-[3/2]">
 <img src="/images/html_media.png" alt="HTML Links" className="w-full h-full object-cover object-center" />
 </div>
 <p className="text-muted-foreground leading-relaxed">
 Tag <Tag name="&lt;a&gt;" /> (Anchor) ប្រើបង្កើតតំណភ្ជាប់ (Hyperlink)
 ហើយ Attribute <Tag name="href" /> កំណត់ destination (គោលដៅ)។
 </p>
 <CodeBlock>{`<!-- External link -->
<a href="https://www.google.com">Google</a>

<!-- Internal page link -->
<a href="/about">អំពីយើង</a>

<!-- Open in new tab -->
<a href="https://example.com" target="_blank" rel="noopener">
 New Tab
</a>

<!-- Anchor (scroll to section) -->
<a href="#contact">Jump ទៅ Contact</a>

<!-- Email -->
<a href="mailto:info@example.com">ផ្ញើ Email</a>

<!-- Phone -->
<a href="tel:+85512345678">ទំនាក់ទំនង</a>

<!-- Download link -->
<a href="/file.pdf" download>Download PDF</a>`}</CodeBlock>
 <div className="grid gap-3">
 <Note>
 <strong>target="_blank" ប្រើជាមួយ rel="noopener noreferrer"!</strong>
 ការ open tab ថ្មីគ្មាន rel="noopener" ប្រថុយ security (Tabnabbing attack)។
 </Note>
 <Tip>
 Link URL ប្រភេទ: <strong>Absolute</strong> (<code className="font-mono text-xs bg-muted px-1 rounded">https://example.com</code>) =
 URL ពេញ; <strong>Relative</strong> (<code className="font-mono text-xs bg-muted px-1 rounded">/about</code>) = relative to current site
 </Tip>
 </div>
 <HtmlCompiler compact defaultCode={code.links} />
 </section>

 {/* ══════════════════════════════════════════════
 ១២. IMAGES
 ══════════════════════════════════════════════ */}
 <section id="images" style={{ display: currentChapterIndex === 11 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
 <div className="flex items-center gap-3 border-b pb-3">
 <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">១២</span>
 <h2 className="text-2xl font-bold text-foreground">
 រូបភាព HTML (HTML Images)
 </h2>
 </div>
 <p className="text-muted-foreground leading-relaxed">
 Tag <Tag name="&lt;img&gt;" /> (Void element — គ្មាន End Tag)
 ប្រើបញ្ចូលរូបភាពក្នុង HTML។
 Attributes <Tag name="src" />, <Tag name="alt" />, <Tag name="width" />, <Tag name="height" /> ចាំបាច់ណាស់!
 </p>
 <CodeBlock>{`<!-- ទម្រង់ពេញ -->
<img
 src="photo.jpg" <!-- ទីតាំងឯកសារ ឬ URL -->
 alt="ពិពណ៌នារូបភាព" <!-- ⚠️ ចាំបាច់ — SEO & Accessibility -->
 width="400" <!-- ទទឹង (pixel ឬ %) -->
 height="300" <!-- កម្ពស់ -->
 loading="lazy" <!-- load ពេល user scroll ถึง -->
>

<!-- Responsive image (100% width) -->
<img src="banner.jpg" alt="Banner" style="width:100%; height:auto;">

<!-- External image (URL) -->
<img
 src="https://example.com/photo.jpg"
 alt="Online photo"
>

<!-- Circular (Avatar) -->
<img
 src="avatar.jpg"
 alt="Profile"
 style="border-radius:50%; width:80px; height:80px; object-fit:cover;"
>`}</CodeBlock>
 <div className="grid gap-3">
 <Warn>
 <strong>ជានិច្ចបន្ថែម alt attribute!</strong>
 Screen Reader (ប្រើដោយ visually impaired user) ប្រើ alt ពណ៌នារូបភាព —
 ច្បាប់ Accessibility (WCAG) តម្រូវ!
 </Warn>
 <Tip>
 Format រូបភាព: <strong>JPG/JPEG</strong> (រូបភាពធម្មជាតិ, ហ្ממ),
 <strong> PNG</strong> (transparent background), <strong>WebP</strong> (ទំហំ file តូចបំផុត — recommended),
 <strong> SVG</strong> (vector — scale ដោយគ្មាន blur)
 </Tip>
 </div>
 <HtmlCompiler compact defaultCode={code.images} />
 </section>

 {/* ══════════════════════════════════════════════
 ១៣. TABLES
 ══════════════════════════════════════════════ */}
 <section id="tables" style={{ display: currentChapterIndex === 12 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
 <div className="flex items-center gap-3 border-b pb-3">
 <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">១៣</span>
 <h2 className="text-2xl font-bold text-foreground">
 តារាង HTML (HTML Tables)
 </h2>
 </div>
 <p className="text-muted-foreground leading-relaxed">
 Tables ប្រើបង្ហាញ data ជា rows និង columns ។
 ប្រើ <Tag name="&lt;table&gt;" /> ជា container ហើយ
 <Tag name="&lt;thead&gt;" />, <Tag name="&lt;tbody&gt;" />, <Tag name="&lt;tfoot&gt;" />
 ចែក section ត្រឹមត្រូវ។
 </p>
 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
 {[
 { tag: "<table>", desc: "Container — ចាប់ផ្ដើម table" },
 { tag: "<thead>", desc: "Header section (row ចំណងជើង)" },
 { tag: "<tbody>", desc: "Body section (rows data)" },
 { tag: "<tfoot>", desc: "Footer section (summation ជាដើម)" },
 { tag: "<tr>", desc: "Table Row — ជួរដេក" },
 { tag: "<th>", desc: "Table Header Cell — ក្រឡាចំណងជើង (bold, centered)" },
 { tag: "<td>", desc: "Table Data Cell — ក្រឡា data" },
 { tag: "colspan", desc: "ភ្ជាប់ Column ច្រើន (horizontal merge)" },
 { tag: "rowspan", desc: "ភ្ជាប់ Row ច្រើន (vertical merge)" },
 ].map(({ tag, desc }) => (
 <div key={tag} className="flex gap-2 items-start">
 <code className="shrink-0 font-mono text-[11px] bg-muted text-foreground px-2 py-0.5 rounded">{tag}</code>
 <p className="text-xs text-muted-foreground">{desc}</p>
 </div>
 ))}
 </div>
 <CodeBlock>{`<table border="1">
 <thead>
 <tr>
 <th>ឈ្មោះ</th>
 <th>អាយុ</th>
 <th>ក្រុង</th>
 </tr>
 </thead>
 <tbody>
 <tr>
 <td>សំណាង</td>
 <td>22</td>
 <td>ភ្នំពេញ</td>
 </tr>
 <tr>
 <td>ចន្ទ</td>
 <td>25</td>
 <td>សៀមរាប</td>
 </tr>
 </tbody>
</table>`}</CodeBlock>
 <Warn>
 <strong>Table ≠ Layout!</strong> ​ ក្នុងអតីតកាល Developer ប្រើ Table
 ធ្វើ page layout — ឥឡូវ <strong>ហាមប្រើ</strong>!
 ប្រើ CSS Flexbox ឬ CSS Grid ជំនួស។
 </Warn>
 <HtmlCompiler compact defaultCode={code.tables} />
 </section>

 {/* ══════════════════════════════════════════════
 ១៤. LISTS
 ══════════════════════════════════════════════ */}
 <section id="lists" style={{ display: currentChapterIndex === 13 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
 <div className="flex items-center gap-3 border-b pb-3">
 <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-sm font-bold shrink-0">១៤</span>
 <h2 className="text-2xl font-bold text-foreground">
 បញ្ជីរាយនាម (HTML Lists)
 </h2>
 </div>
 <p className="text-muted-foreground leading-relaxed">
 HTML Lists ១)​ <strong className="text-foreground">Unordered</strong> (ចំណុចមូល),
 ២) <strong className="text-foreground">Ordered</strong> (លេខរៀង),
 ៣) <strong className="text-foreground">Description</strong> (ពន្យល់ term)
 — Lists អាច nest ក្នុង Lists ជ្រៅ ២–៣ ស្រទាប់ (Nested Lists)។
 </p>
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
 {[
 {
 type: "Unordered <ul>",
 code: `<ul>
 <li>HTML</li>
 <li>CSS</li>
 <li>JS</li>
</ul>`,
 note: "default: bullet •",
 },
 {
 type: "Ordered <ol>",
 code: `<ol>
 <li>រៀន HTML</li>
 <li>រៀន CSS</li>
 <li>Build project</li>
</ol>`,
 note: "default: 1, 2, 3...",
 },
 {
 type: "Description <dl>",
 code: `<dl>
 <dt>HTML</dt>
 <dd>Markup lang</dd>
 <dt>CSS</dt>
 <dd>Style lang</dd>
</dl>`,
 note: "term + definition",
 },
 ].map(({ type, code: c, note }) => (
 <div key={type} className="rounded-lg border bg-card p-4 space-y-2">
 <h4 className="font-semibold text-xs text-foreground">{type}</h4>
 <pre className="bg-muted text-foreground text-xs p-3 rounded font-mono overflow-x-auto">{c}</pre>
 <p className="text-xs text-muted-foreground">{note}</p>
 </div>
 ))}
 </div>
 <h4 className="font-semibold text-sm text-foreground">list-style-type CSS</h4>
 <CodeBlock>{`ul { list-style-type: disc; } /* • (default) */
ul { list-style-type: circle; } /* ○ */
ul { list-style-type: square; } /* ■ */
ul { list-style-type: none; } /* hidden (Custom styling) */

ol { list-style-type: decimal; } /* 1, 2, 3 */
ol { list-style-type: upper-roman; } /* I, II, III */
ol { list-style-type: lower-alpha; } /* a, b, c */`}</CodeBlock>
 <HtmlCompiler compact defaultCode={code.lists} />
 </section>

 {/* ══════════════════════════════════════════════
 ១៥. FULL PLAYGROUND
 ══════════════════════════════════════════════ */}
 <section id="compiler" style={{ display: currentChapterIndex === 14 ? "block" : "none" }} className="scroll-mt-20 space-y-5">
 <div className="flex items-center gap-3 border-b pb-3">
 <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 text-white text-sm font-bold shrink-0">🚀</span>
 <h2 className="text-2xl font-bold text-foreground">
 Full Playground — HTML + CSS + JS
 </h2>
 </div>
 <p className="text-muted-foreground leading-relaxed">
 សរសេរ HTML, CSS, JavaScript ដោយសេរីទាំងស្រុងនៅទីនេះ!
 ចុច <strong className="text-foreground">▶ Run</strong> ដើម្បីមើលលទ្ធផលភ្លាម។
 ប្រើ <strong className="text-foreground">⛶ Fullscreen</strong> ពេលចង់ Workspace ធំ។
 </p>
 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
 {[
 { icon: "✏️", label: "Monaco Editor", desc: "VS Code engine, syntax highlighting" },
 { icon: "👁", label: "Live Preview", desc: "Iframe sandbox — HTML+CSS+JS" },
 { icon: "⛶", label: "Fullscreen", desc: "Expand to full-screen workspace" },
 ].map(({ icon, label, desc }) => (
 <div key={label} className="rounded-lg border bg-card p-3 text-center">
 <div className="text-2xl mb-1">{icon}</div>
 <div className="font-semibold text-sm text-foreground">{label}</div>
 <div className="text-xs text-muted-foreground">{desc}</div>
 </div>
 ))}
 </div>
        <HtmlCompiler defaultCode={code.fullPlayground} />
        </section>

        {/* Quiz Gating Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <Quiz 
            chapterId={CHAPTER_IDS[currentChapterIndex]}
            isCompleted={completedChapters.includes(CHAPTER_IDS[currentChapterIndex])}
            onCorrect={() => {
              const activeId = CHAPTER_IDS[currentChapterIndex];
              if (completedChapters.includes(activeId)) return;
              
              const newCompleted = [...completedChapters, activeId];
              setCompletedChapters(newCompleted);

              // Mark as completed locally to update sidebar
              window.dispatchEvent(new CustomEvent('chapterCompleted', { detail: activeId }));

              // Record to DB
              fetch('/api/progress/html', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chapterId: activeId })
              }).catch(console.error);

              // Record study contribution
              fetch('/api/study', { method: 'POST' }).catch(console.error);

              // Play mini success feedback
              playSuccessChime();
              confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#cc785c', '#e09882', '#f5f5f7', '#ffd700']
              });
            }}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 pt-8 border-t border-border">
          <button 
            onClick={handleBack}
            disabled={currentChapterIndex === 0}
            className="px-6 py-2.5 rounded-lg border border-border bg-background hover:bg-muted text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center gap-2"
          >
            ← Back
          </button>
          <button 
            onClick={handleNext}
            disabled={!completedChapters.includes(CHAPTER_IDS[currentChapterIndex])}
            className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium shadow-sm flex items-center gap-2"
          >
            {currentChapterIndex === totalChapters - 1 ? 'Finish Course' : 'Next Chapter'} →
          </button>
        </div>

      </div>
    </div>
    </div>
    
    <AlertDialog open={showLoginAlert} onOpenChange={setShowLoginAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="font-kantumruy">ទាមទារការចូលគណនី</AlertDialogTitle>
          <AlertDialogDescription>
            អ្នកត្រូវចូលគណនីដើម្បីរក្សាទុកវឌ្ឍនភាពរបស់អ្នក និងបន្តទៅមេរៀនបន្ទាប់។
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col sm:flex-row gap-2 font-kantumruy">
          <AlertDialogCancel>បោះបង់</AlertDialogCancel>
          <AlertDialogAction 
            variant="outline" 
            className="border-border text-foreground hover:bg-muted" 
            onClick={() => {
              setShowLoginAlert(false);
              if (currentChapterIndex === totalChapters - 1) {
                setShowFinishAlert(true);
              } else {
                setCurrentChapterIndex(prev => prev + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            រំលង &gt;
          </AlertDialogAction>
          <AlertDialogAction onClick={() => router.push('/login')}>
            ចូលគណនី
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>

    <AlertDialog open={showFinishAlert} onOpenChange={setShowFinishAlert}>
      <AlertDialogContent className="font-kantumruy">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold text-center text-primary flex items-center justify-center gap-2">
            🎉 អបអរសាទរ!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-foreground text-base mt-2 leading-relaxed">
            អ្នកបានបញ្ចប់វគ្គសិក្សា <strong>HTML Basics</strong> ទាំងស្រុងដោយជោគជ័យ! <br/>
            បន្តការរៀនសរសេរកូដរបស់អ្នកជាមួយភាសាផ្សេងៗទៀត។
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex justify-center sm:justify-center mt-4">
          <AlertDialogAction onClick={() => {
            setShowFinishAlert(false);
            router.push('/');
          }} className="px-8 bg-primary text-white hover:bg-primary/90 font-kantumruy">
            ត្រឡប់ទៅទំព័រដើម
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  </div>
}
