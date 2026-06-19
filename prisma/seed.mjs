// Seed script for Rean2Code — Khmer coding learning platform.
// Run: node prisma/seed.mjs
import "dotenv/config";
import { config } from "dotenv";
config({ path: ".env.local" });

import { PrismaClient } from "@prisma/client";
import { PrismaNeonHttp } from "@prisma/adapter-neon";

const adapter = new PrismaNeonHttp(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });

// ── Courses + lessons + code examples ─────────────────────────────
// content uses {{code:slug}} placeholders that map to a lesson's CodeExample.

const courses = [
  {
    slug: "html",
    title: "ភាសា HTML",
    description:
      "រៀន HTML ដែលជាគ្រឹះនៃគេហទំព័រទាំងអស់។ អ្នកនឹងស្គាល់ tag, element និងរបៀបបង្កើតរចនាសម្ព័ន្ធទំព័រ។",
    category: "html",
    difficulty: "beginner",
    order: 1,
    lessons: [
      {
        slug: "introduction",
        title: "ការណែនាំអំពី HTML",
        difficulty: "beginner",
        estimatedMinutes: 8,
        seoDescription: "ស្គាល់ HTML ជាលើកដំបូង",
        content: `# HTML គឺជាអ្វី?

**HTML** (HyperText Markup Language) គឺជាភាសាស្តង់ដារសម្រាប់បង្កើតគេហទំព័រ។ វាប្រាប់ browser ថាត្រូវបង្ហាញមាតិកាយ៉ាងដូចម្តេច។

HTML ប្រើ **tag** ដើម្បីរុំ (wrap) មាតិកា។ ឧទាហរណ៍ \`<h1>\` សម្រាប់ចំណងជើង និង \`<p>\` សម្រាប់កថាខណ្ឌ។

## ឧទាហរណ៍ដំបូងរបស់អ្នក

សាកល្បងកែកូដខាងក្រោម រួចចុច Run ដើម្បីមើលលទ្ធផល៖

{{code:hello-world}}

## រចនាសម្ព័ន្ធជាមូលដ្ឋាន

គ្រប់ឯកសារ HTML ត្រូវមានរចនាសម្ព័ន្ធដូចខាងក្រោម៖

- \`<!DOCTYPE html>\` — ប្រាប់ប្រភេទឯកសារ
- \`<html>\` — root element
- \`<head>\` — ព័ត៌មាន meta
- \`<body>\` — មាតិកាដែលអ្នកមើលឃើញ

{{code:page-structure}}`,
        codeExamples: [
          {
            slug: "hello-world",
            title: "Hello World",
            language: "html",
            code: `<h1>សួស្តី ពិភពលោក!</h1>
<p>នេះជាគេហទំព័រដំបូងរបស់ខ្ញុំ។</p>`,
          },
          {
            slug: "page-structure",
            title: "រចនាសម្ព័ន្ធទំព័រ",
            language: "html",
            code: `<!DOCTYPE html>
<html>
  <head>
    <title>ទំព័ររបស់ខ្ញុំ</title>
  </head>
  <body>
    <h1>ចំណងជើងធំ</h1>
    <p>កថាខណ្ឌមួយ។</p>
  </body>
</html>`,
          },
        ],
      },
      {
        slug: "elements",
        title: "Elements និង Tags",
        difficulty: "beginner",
        estimatedMinutes: 10,
        content: `# HTML Elements

Element មួយ​ផ្សំ​ឡើង​ដោយ opening tag, មាតិកា, និង closing tag៖ \`<p>មាតិកា</p>\`។

## ចំណងជើង (Headings)

HTML មានចំណងជើង ៦ កម្រិត ពី \`<h1>\` ដល់ \`<h6>\`។

{{code:headings}}

## កថាខណ្ឌ និង Format

ប្រើ \`<strong>\` សម្រាប់អក្សរដិត និង \`<em>\` សម្រាប់អក្សរទ្រេត។

{{code:formatting}}`,
        codeExamples: [
          {
            slug: "headings",
            title: "ចំណងជើងទាំង ៦ កម្រិត",
            language: "html",
            code: `<h1>ចំណងជើង ១</h1>
<h2>ចំណងជើង ២</h2>
<h3>ចំណងជើង ៣</h3>
<h4>ចំណងជើង ៤</h4>`,
          },
          {
            slug: "formatting",
            title: "ការ Format អក្សរ",
            language: "html",
            code: `<p>នេះជាអក្សរ <strong>ដិត</strong> និង <em>ទ្រេត</em>។</p>
<p>អ្នកក៏អាចប្រើ <mark>highlight</mark> បានដែរ។</p>`,
          },
        ],
      },
      {
        slug: "links-images",
        title: "Links និង Images",
        difficulty: "beginner",
        estimatedMinutes: 9,
        content: `# តំណ (Links) និងរូបភាព (Images)

## តំណភ្ជាប់

ប្រើ \`<a>\` tag ជាមួយ attribute \`href\` ដើម្បីបង្កើតតំណ៖

{{code:links}}

## រូបភាព

ប្រើ \`<img>\` ជាមួយ \`src\` និង \`alt\`៖

{{code:images}}`,
        codeExamples: [
          {
            slug: "links",
            title: "បង្កើតតំណ",
            language: "html",
            code: `<a href="https://example.com">ចុចទីនេះ</a>
<a href="https://google.com" target="_blank">បើកក្នុង tab ថ្មី</a>`,
          },
          {
            slug: "images",
            title: "បញ្ចូលរូបភាព",
            language: "html",
            code: `<img
  src="https://picsum.photos/200"
  alt="រូបភាពគំរូ"
  width="200"
/>`,
          },
        ],
      },
      {
        slug: "lists",
        title: "បញ្ជី (Lists)",
        difficulty: "beginner",
        estimatedMinutes: 7,
        content: `# បញ្ជីក្នុង HTML

HTML មានបញ្ជី ២ ប្រភេទ៖ បញ្ជីមានលេខ (\`<ol>\`) និងបញ្ជីគ្មានលេខ (\`<ul>\`)។

{{code:lists}}`,
        codeExamples: [
          {
            slug: "lists",
            title: "បញ្ជីមានលេខ និងគ្មានលេខ",
            language: "html",
            code: `<h3>បញ្ជីគ្មានលេខ</h3>
<ul>
  <li>ផ្លែប៉ោម</li>
  <li>ផ្លែចេក</li>
</ul>

<h3>បញ្ជីមានលេខ</h3>
<ol>
  <li>ភ្ញាក់ពីដេក</li>
  <li>ដុសធ្មេញ</li>
</ol>`,
          },
        ],
      },
      {
        slug: "tables",
        title: "តារាង (Tables)",
        difficulty: "intermediate",
        estimatedMinutes: 10,
        content: `# តារាងក្នុង HTML

ប្រើ \`<table>\`, \`<tr>\` (row), \`<th>\` (header), និង \`<td>\` (cell)។

{{code:table}}`,
        codeExamples: [
          {
            slug: "table",
            title: "តារាងសាមញ្ញ",
            language: "html",
            code: `<table border="1">
  <tr>
    <th>ឈ្មោះ</th>
    <th>អាយុ</th>
  </tr>
  <tr>
    <td>សុខា</td>
    <td>២០</td>
  </tr>
</table>`,
          },
        ],
      },
    ],
  },
  {
    slug: "css",
    title: "ភាសា CSS",
    description:
      "រៀន CSS ដើម្បីរចនា និងតុបតែងគេហទំព័រ — ពណ៌, ទំហំ, layout និង responsive design។",
    category: "css",
    difficulty: "beginner",
    order: 2,
    lessons: [
      {
        slug: "introduction",
        title: "ការណែនាំអំពី CSS",
        difficulty: "beginner",
        estimatedMinutes: 8,
        content: `# CSS គឺជាអ្វី?

**CSS** (Cascading Style Sheets) ប្រើដើម្បីរចនា HTML — កំណត់ពណ៌, ទំហំ, ចន្លោះ និងទីតាំង។

{{code:first-css}}

## Selector

Selector ប្រាប់ CSS ថាត្រូវរចនា element ណាមួយ។`,
        codeExamples: [
          {
            slug: "first-css",
            title: "CSS ដំបូង",
            language: "html",
            code: `<style>
  h1 { color: teal; }
  p { font-size: 18px; }
</style>

<h1>ចំណងជើងពណ៌បៃតង</h1>
<p>អក្សរធំ ១៨px។</p>`,
          },
        ],
      },
      {
        slug: "colors-background",
        title: "ពណ៌ និងផ្ទៃខាងក្រោយ",
        difficulty: "beginner",
        estimatedMinutes: 9,
        content: `# ពណ៌ក្នុង CSS

អ្នកអាចកំណត់ពណ៌ដោយឈ្មោះ, HEX, ឬ RGB។

{{code:colors}}`,
        codeExamples: [
          {
            slug: "colors",
            title: "ពណ៌ផ្សេងៗ",
            language: "html",
            code: `<style>
  .box {
    background-color: #1abc9c;
    color: white;
    padding: 20px;
    border-radius: 8px;
  }
</style>

<div class="box">ប្រអប់ពណ៌បៃតង</div>`,
          },
        ],
      },
      {
        slug: "box-model",
        title: "Box Model",
        difficulty: "intermediate",
        estimatedMinutes: 11,
        content: `# CSS Box Model

គ្រប់ element គឺជាប្រអប់មួយ ដែលមាន៖ **content**, **padding**, **border**, និង **margin**។

{{code:box-model}}`,
        codeExamples: [
          {
            slug: "box-model",
            title: "Padding, Border, Margin",
            language: "html",
            code: `<style>
  .card {
    padding: 16px;
    border: 2px solid teal;
    margin: 20px;
    background: #f0fdfa;
  }
</style>

<div class="card">ប្រអប់ជាមួយ box model</div>`,
          },
        ],
      },
      {
        slug: "flexbox",
        title: "Flexbox Layout",
        difficulty: "intermediate",
        estimatedMinutes: 12,
        content: `# Flexbox

Flexbox ជួយរៀបចំ element ក្នុងជួរ ឬ column យ៉ាងងាយស្រួល។

{{code:flexbox}}`,
        codeExamples: [
          {
            slug: "flexbox",
            title: "Flex container",
            language: "html",
            code: `<style>
  .row {
    display: flex;
    gap: 10px;
    justify-content: center;
  }
  .item {
    background: teal;
    color: white;
    padding: 20px;
  }
</style>

<div class="row">
  <div class="item">A</div>
  <div class="item">B</div>
  <div class="item">C</div>
</div>`,
          },
        ],
      },
    ],
  },
  {
    slug: "javascript",
    title: "ភាសា JavaScript",
    description:
      "រៀន JavaScript ដើម្បីបន្ថែមអន្តរកម្មទៅគេហទំព័រ — variable, function, DOM និងព្រឹត្តិការណ៍។",
    category: "javascript",
    difficulty: "beginner",
    order: 3,
    lessons: [
      {
        slug: "introduction",
        title: "ការណែនាំអំពី JavaScript",
        difficulty: "beginner",
        estimatedMinutes: 8,
        content: `# JavaScript គឺជាអ្វី?

**JavaScript** គឺជាភាសាកម្មវិធីដែលធ្វើឱ្យគេហទំព័រមានអន្តរកម្ម។ វាអាចផ្លាស់ប្តូរមាតិកា, ឆ្លើយតបនឹង click និងច្រើនទៀត។

សាកល្បង Run កូដនេះ — បើក console ដើម្បីមើល output៖

{{code:hello-js}}`,
        codeExamples: [
          {
            slug: "hello-js",
            title: "console.log ដំបូង",
            language: "html",
            code: `<button onclick="greet()">ចុចខ្ញុំ</button>
<p id="out"></p>

<script>
  function greet() {
    document.getElementById('out').textContent = 'សួស្តី JavaScript!';
    console.log('Button clicked!');
  }
</script>`,
          },
        ],
      },
      {
        slug: "variables",
        title: "Variables និង Data Types",
        difficulty: "beginner",
        estimatedMinutes: 10,
        content: `# Variables

ប្រើ \`let\`, \`const\`, ឬ \`var\` ដើម្បីប្រកាស variable។ ប្រើ \`const\` នៅពេលតម្លៃមិនផ្លាស់ប្តូរ។

{{code:variables}}`,
        codeExamples: [
          {
            slug: "variables",
            title: "ប្រកាស Variable",
            language: "html",
            code: `<p id="out"></p>
<script>
  const name = "សុខា";
  let age = 20;
  const msg = name + " មានអាយុ " + age + " ឆ្នាំ";
  document.getElementById('out').textContent = msg;
</script>`,
          },
        ],
      },
      {
        slug: "functions",
        title: "Functions",
        difficulty: "beginner",
        estimatedMinutes: 11,
        content: `# Functions

Function គឺជាប្លុកកូដដែលអាចហៅប្រើឡើងវិញ។

{{code:functions}}`,
        codeExamples: [
          {
            slug: "functions",
            title: "បង្កើត Function",
            language: "html",
            code: `<p id="out"></p>
<script>
  function add(a, b) {
    return a + b;
  }
  document.getElementById('out').textContent = "2 + 3 = " + add(2, 3);
</script>`,
          },
        ],
      },
      {
        slug: "dom",
        title: "DOM Manipulation",
        difficulty: "intermediate",
        estimatedMinutes: 12,
        content: `# DOM Manipulation

DOM (Document Object Model) អនុញ្ញាតឱ្យ JavaScript ផ្លាស់ប្តូរ HTML ដោយ dynamic។

{{code:dom}}`,
        codeExamples: [
          {
            slug: "dom",
            title: "ផ្លាស់ប្តូរ DOM",
            language: "html",
            code: `<button onclick="addItem()">បន្ថែម</button>
<ul id="list"></ul>

<script>
  let count = 0;
  function addItem() {
    count++;
    const li = document.createElement('li');
    li.textContent = 'ធាតុទី ' + count;
    document.getElementById('list').appendChild(li);
  }
</script>`,
          },
        ],
      },
      {
        slug: "loops",
        title: "Loops (រង្វិល)",
        difficulty: "beginner",
        estimatedMinutes: 9,
        content: `# Loops

Loop ប្រើដើម្បីធ្វើកិច្ចការម្តងហើយម្តងទៀត។

{{code:loops}}`,
        codeExamples: [
          {
            slug: "loops",
            title: "for loop",
            language: "html",
            code: `<p id="out"></p>
<script>
  let result = "";
  for (let i = 1; i <= 5; i++) {
    result += i + " ";
  }
  document.getElementById('out').textContent = result;
</script>`,
          },
        ],
      },
    ],
  },
  {
    slug: "python",
    title: "ភាសា Python",
    description:
      "រៀន Python — ភាសាងាយស្រួលរៀន ពេញនិយមសម្រាប់ AI, data science និង backend។",
    category: "python",
    difficulty: "beginner",
    order: 4,
    lessons: [
      {
        slug: "introduction",
        title: "ការណែនាំអំពី Python",
        difficulty: "beginner",
        estimatedMinutes: 8,
        content: `# Python គឺជាអ្វី?

**Python** គឺជាភាសាកម្មវិធីដ៏ពេញនិយម ដោយសារ syntax ងាយស្រួលអាន។ វាប្រើសម្រាប់ AI, data science, web និងច្រើនទៀត។

> ចំណាំ៖ កូដ Python មិនអាច run ផ្ទាល់ក្នុង browser បានទេ។ កូដខាងក្រោមជាគំរូសម្រាប់សិក្សា។

{{code:hello-py}}`,
        codeExamples: [
          {
            slug: "hello-py",
            title: "print ដំបូង",
            language: "python",
            editable: false,
            showPreview: false,
            code: `print("សួស្តី Python!")
name = "សុខា"
print(f"ខ្ញុំឈ្មោះ {name}")`,
          },
        ],
      },
      {
        slug: "variables",
        title: "Variables និង Types",
        difficulty: "beginner",
        estimatedMinutes: 9,
        content: `# Variables ក្នុង Python

Python មិនត្រូវការប្រកាស type ទេ — វាដឹងដោយស្វ័យប្រវត្តិ។

{{code:py-vars}}`,
        codeExamples: [
          {
            slug: "py-vars",
            title: "ប្រភេទទិន្នន័យ",
            language: "python",
            editable: false,
            showPreview: false,
            code: `age = 20          # int
price = 9.99      # float
name = "សុខា"      # str
is_student = True # bool

print(type(age))
print(type(name))`,
          },
        ],
      },
      {
        slug: "control-flow",
        title: "if / else និង Loops",
        difficulty: "beginner",
        estimatedMinutes: 11,
        content: `# Control Flow

ប្រើ \`if\`, \`elif\`, \`else\` ដើម្បីសម្រេចចិត្ត និង \`for\` loop ដើម្បីធ្វើម្តងហើយម្តងទៀត។

{{code:py-control}}`,
        codeExamples: [
          {
            slug: "py-control",
            title: "if និង for",
            language: "python",
            editable: false,
            showPreview: false,
            code: `score = 85

if score >= 80:
    print("ល្អណាស់!")
elif score >= 50:
    print("ជាប់")
else:
    print("ធ្លាក់")

for i in range(1, 4):
    print("លេខ", i)`,
          },
        ],
      },
      {
        slug: "functions",
        title: "Functions",
        difficulty: "beginner",
        estimatedMinutes: 10,
        content: `# Functions ក្នុង Python

ប្រើ keyword \`def\` ដើម្បីបង្កើត function។

{{code:py-func}}`,
        codeExamples: [
          {
            slug: "py-func",
            title: "def function",
            language: "python",
            editable: false,
            showPreview: false,
            code: `def greet(name):
    return f"សួស្តី {name}!"

def add(a, b):
    return a + b

print(greet("សុខា"))
print(add(2, 3))`,
          },
        ],
      },
    ],
  },
];

// ── Exercises (attached to first lesson of each course) ───────────
const exercises = [
  {
    courseSlug: "html",
    lessonSlug: "introduction",
    title: "បង្កើតចំណងជើង",
    description: "សរសេរ HTML ដែលបង្ហាញចំណងជើង <h1> ដែលមានអក្សរ 'សួស្តី'។",
    starterCode: "<!-- សរសេរកូដនៅទីនេះ -->\n",
    solution: "<h1>សួស្តី</h1>",
    testCases: [{ description: "មាន h1 tag", input: "", expected: "h1" }],
    difficulty: "easy",
    points: 10,
  },
  {
    courseSlug: "javascript",
    lessonSlug: "functions",
    title: "Function បូកលេខ",
    description:
      "សរសេរ function ឈ្មោះ multiply ដែលទទួលលេខ ២ ហើយ return ផលគុណ។",
    starterCode: "function multiply(a, b) {\n  // សរសេរនៅទីនេះ\n}\n",
    solution: "function multiply(a, b) {\n  return a * b;\n}",
    testCases: [
      { description: "multiply(2,3) === 6", input: "2,3", expected: "6" },
      { description: "multiply(4,5) === 20", input: "4,5", expected: "20" },
    ],
    difficulty: "easy",
    points: 15,
  },
  {
    courseSlug: "javascript",
    lessonSlug: "loops",
    title: "ផលបូក ១ ដល់ N",
    description:
      "សរសេរ function sumTo(n) ដែល return ផលបូកនៃលេខទាំងអស់ពី ១ ដល់ n។",
    starterCode: "function sumTo(n) {\n  // ប្រើ loop\n}\n",
    solution:
      "function sumTo(n) {\n  let s = 0;\n  for (let i = 1; i <= n; i++) s += i;\n  return s;\n}",
    testCases: [
      { description: "sumTo(5) === 15", input: "5", expected: "15" },
      { description: "sumTo(10) === 55", input: "10", expected: "55" },
    ],
    difficulty: "medium",
    points: 20,
  },
];

// ── Books (GoalKicker free programming books) ─────────────────────
const books = [
  {
    title: "JavaScript Notes for Professionals",
    slug: "javascript-notes",
    category: "javascript",
    description:
      "សៀវភៅ JavaScript ពេញលេញ ៤៨៩ ទំព័រ ដែលចងក្រងពី Stack Overflow Documentation។",
    coverUrl: "https://books.goalkicker.com/JavaScriptBook/JavaScriptNotesForProfessionals.png",
    pdfUrl: "https://books.goalkicker.com/JavaScriptBook/JavaScriptNotesForProfessionals.pdf",
    fileSize: 5400000,
    pages: 489,
    author: "GoalKicker",
  },
  {
    title: "Python Notes for Professionals",
    slug: "python-notes",
    category: "python",
    description:
      "សៀវភៅ Python ៨៥៦ ទំព័រ គ្របដណ្តប់គ្រប់ប្រធានបទសំខាន់ៗ ដោយឥតគិតថ្លៃ។",
    coverUrl: "https://books.goalkicker.com/PythonBook/PythonNotesForProfessionals.png",
    pdfUrl: "https://books.goalkicker.com/PythonBook/PythonNotesForProfessionals.pdf",
    fileSize: 7200000,
    pages: 856,
    author: "GoalKicker",
  },
  {
    title: "HTML5 Notes for Professionals",
    slug: "html5-notes",
    category: "html",
    description:
      "មគ្គុទេសក៍ HTML5 ដ៏ពេញលេញ គ្របដណ្តប់ tag, form, semantic elements និងច្រើនទៀត។",
    coverUrl: "https://books.goalkicker.com/HTML5Book/HTML5NotesForProfessionals.png",
    pdfUrl: "https://books.goalkicker.com/HTML5Book/HTML5NotesForProfessionals.pdf",
    fileSize: 3100000,
    pages: 121,
    author: "GoalKicker",
  },
  {
    title: "CSS Notes for Professionals",
    slug: "css-notes",
    category: "css",
    description:
      "សៀវភៅ CSS គ្របដណ្តប់ selector, flexbox, grid, animation និងបច្ចេកទេសរចនាទំនើប។",
    coverUrl: "https://books.goalkicker.com/CSSBook/CSSNotesForProfessionals.png",
    pdfUrl: "https://books.goalkicker.com/CSSBook/CSSNotesForProfessionals.pdf",
    fileSize: 4000000,
    pages: 234,
    author: "GoalKicker",
  },
];

async function main() {
  console.log("🌱 Seeding database...");

  // Clean existing content (keeps users/auth intact).
  await prisma.solution.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.codeExample.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.course.deleteMany();
  await prisma.bookDownload.deleteMany();
  await prisma.book.deleteMany();

  for (const course of courses) {
    const { lessons, ...courseData } = course;
    const createdCourse = await prisma.course.create({
      data: { ...courseData, published: true },
    });
    console.log(`📚 Course: ${createdCourse.title}`);

    let lessonOrder = 0;
    for (const lesson of lessons) {
      const { codeExamples, ...lessonData } = lesson;
      const createdLesson = await prisma.lesson.create({
        data: {
          ...lessonData,
          order: lessonOrder++,
          published: true,
          courseId: createdCourse.id,
        },
      });

      let exOrder = 0;
      for (const ce of codeExamples ?? []) {
        await prisma.codeExample.create({
          data: {
            slug: ce.slug,
            title: ce.title,
            code: ce.code,
            language: ce.language,
            editable: ce.editable ?? true,
            showPreview: ce.showPreview ?? true,
            order: exOrder++,
            tags: [],
            lessonId: createdLesson.id,
          },
        });
      }
    }
  }

  // Exercises — resolve lesson by course+slug.
  for (const ex of exercises) {
    const course = await prisma.course.findUnique({
      where: { slug: ex.courseSlug },
    });
    if (!course) continue;
    const lesson = await prisma.lesson.findFirst({
      where: { courseId: course.id, slug: ex.lessonSlug },
    });
    if (!lesson) continue;
    await prisma.exercise.create({
      data: {
        title: ex.title,
        description: ex.description,
        starterCode: ex.starterCode,
        solution: ex.solution,
        testCases: ex.testCases,
        difficulty: ex.difficulty,
        points: ex.points,
        lessonId: lesson.id,
      },
    });
  }
  console.log(`✏️  Exercises: ${exercises.length}`);

  for (const book of books) {
    await prisma.book.create({ data: { ...book, published: true } });
  }
  console.log(`📖 Books: ${books.length}`);

  const [c, l, ce, e, b] = await Promise.all([
    prisma.course.count(),
    prisma.lesson.count(),
    prisma.codeExample.count(),
    prisma.exercise.count(),
    prisma.book.count(),
  ]);
  console.log(
    `✅ Done — courses:${c} lessons:${l} codeExamples:${ce} exercises:${e} books:${b}`
  );
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
