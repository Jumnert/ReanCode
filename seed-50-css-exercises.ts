import { prisma } from './src/config/prisma';

const exercises = [
  // Basics & Colors (1-5)
  { title: 'CSS Color', description: 'សូមប្តូរពណ៌អក្សររបស់ `<h1>` ទៅជាពណ៌ក្រហម (`red`) ដោយប្រើ CSS។', starterCode: '<style>\n  h1 {\n    \n  }\n</style>\n\n<h1>Hello CSS</h1>', solution: '<style>\n  h1 {\n    color: red;\n  }\n</style>\n\n<h1>Hello CSS</h1>', difficulty: 'easy', points: 10, testCases: [{ description: 'ត្រូវមាន color: red', input: "code.includes('color: red') || code.includes('color:red')" }] },
  { title: 'Background Color', description: 'សូមប្តូរពណ៌ផ្ទៃខាងក្រោយរបស់ `<body>` ទៅជាពណ៌ខ្មៅ (`black`)។', starterCode: '<style>\n  body {\n    \n  }\n</style>\n\n<h1>Hello World</h1>', solution: '<style>\n  body {\n    background-color: black;\n  }\n</style>\n\n<h1>Hello World</h1>', difficulty: 'easy', points: 10, testCases: [{ description: 'ត្រូវមាន background-color: black', input: "code.includes('background-color: black') || code.includes('background: black')" }] },
  { title: 'Class Selector', description: 'សូមប្តូរពណ៌អក្សរសម្រាប់ Class `.highlight` ទៅជាពណ៌ខៀវ (`blue`)។', starterCode: '<style>\n  \n</style>\n\n<p class="highlight">Text 1</p>\n<p>Text 2</p>', solution: '<style>\n  .highlight {\n    color: blue;\n  }\n</style>\n\n<p class="highlight">Text 1</p>\n<p>Text 2</p>', difficulty: 'easy', points: 10, testCases: [{ description: 'ត្រូវមាន .highlight', input: "code.includes('.highlight')" }, { description: 'ត្រូវមាន color: blue', input: "code.includes('color: blue') || code.includes('color:blue')" }] },
  { title: 'ID Selector', description: 'សូមប្តូរពណ៌ផ្ទៃខាងក្រោយសម្រាប់ ID `#main` ទៅជាពណ៌លឿង (`yellow`)។', starterCode: '<style>\n  \n</style>\n\n<div id="main">Main Content</div>', solution: '<style>\n  #main {\n    background-color: yellow;\n  }\n</style>\n\n<div id="main">Main Content</div>', difficulty: 'easy', points: 10, testCases: [{ description: 'ត្រូវមាន #main', input: "code.includes('#main')" }, { description: 'ត្រូវមានលឿង', input: "code.includes('yellow')" }] },
  { title: 'Universal Selector', description: 'សូមកំណត់ `margin: 0` សម្រាប់ Element ទាំងអស់ដោយប្រើ `*` Selector។', starterCode: '<style>\n  \n</style>\n\n<h1>Title</h1>', solution: '<style>\n  * {\n    margin: 0;\n  }\n</style>\n\n<h1>Title</h1>', difficulty: 'medium', points: 15, testCases: [{ description: 'ត្រូវប្រើ * Selector', input: "code.includes('*')" }, { description: 'ត្រូវមាន margin: 0', input: "code.includes('margin: 0')" }] },

  // Text & Fonts (6-10)
  { title: 'Font Size', description: 'សូមប្តូរទំហំអក្សររបស់ `<p>` ទៅជា `20px`។', starterCode: '<style>\n  p {\n    \n  }\n</style>\n\n<p>Text</p>', solution: '<style>\n  p {\n    font-size: 20px;\n  }\n</style>\n\n<p>Text</p>', difficulty: 'easy', points: 10, testCases: [{ description: 'ត្រូវមាន font-size: 20px', input: "code.includes('font-size: 20px')" }] },
  { title: 'Font Weight', description: 'សូមធ្វើអោយអក្សរនៅក្នុង `.bold-text` ក្លាយជាដិត (`bold`)។', starterCode: '<style>\n  .bold-text {\n    \n  }\n</style>\n\n<p class="bold-text">Text</p>', solution: '<style>\n  .bold-text {\n    font-weight: bold;\n  }\n</style>\n\n<p class="bold-text">Text</p>', difficulty: 'easy', points: 10, testCases: [{ description: 'ត្រូវមាន font-weight: bold', input: "code.includes('font-weight: bold')" }] },
  { title: 'Text Align', description: 'សូមដាក់អក្សរក្នុង `<h1>` អោយនៅកណ្តាល (`center`)។', starterCode: '<style>\n  h1 {\n    \n  }\n</style>\n\n<h1>Title</h1>', solution: '<style>\n  h1 {\n    text-align: center;\n  }\n</style>\n\n<h1>Title</h1>', difficulty: 'easy', points: 10, testCases: [{ description: 'ត្រូវមាន text-align: center', input: "code.includes('text-align: center')" }] },
  { title: 'Text Decoration', description: 'សូមដកបន្ទាត់ពីក្រោម (underline) ចេញពីលីង `<a>`។', starterCode: '<style>\n  a {\n    \n  }\n</style>\n\n<a href="#">Link</a>', solution: '<style>\n  a {\n    text-decoration: none;\n  }\n</style>\n\n<a href="#">Link</a>', difficulty: 'medium', points: 15, testCases: [{ description: 'ត្រូវមាន text-decoration: none', input: "code.includes('text-decoration: none')" }] },
  { title: 'Line Height', description: 'សូមកំណត់គម្លាតបន្ទាត់ (`line-height`) របស់ `<p>` ទៅជា `1.5`។', starterCode: '<style>\n  p {\n    \n  }\n</style>\n\n<p>Line 1<br>Line 2</p>', solution: '<style>\n  p {\n    line-height: 1.5;\n  }\n</style>\n\n<p>Line 1<br>Line 2</p>', difficulty: 'medium', points: 15, testCases: [{ description: 'ត្រូវមាន line-height: 1.5', input: "code.includes('line-height: 1.5')" }] },

  // Box Model (11-20)
  { title: 'Width & Height', description: 'សូមកំណត់ទទឹង (`width`) `200px` និងកម្ពស់ (`height`) `100px` អោយ `.box`។', starterCode: '<style>\n  .box {\n    background: red;\n  }\n</style>\n<div class="box"></div>', solution: '<style>\n  .box {\n    background: red;\n    width: 200px;\n    height: 100px;\n  }\n</style>\n<div class="box"></div>', difficulty: 'easy', points: 10, testCases: [{ description: 'ត្រូវមាន width 200px និង height 100px', input: "code.includes('width: 200px') && code.includes('height: 100px')" }] },
  { title: 'Padding', description: 'សូមបន្ថែម `padding: 20px` ទៅអោយ `.box`។', starterCode: '<style>\n  .box {\n    \n  }\n</style>\n<div class="box">Box</div>', solution: '<style>\n  .box {\n    padding: 20px;\n  }\n</style>\n<div class="box">Box</div>', difficulty: 'easy', points: 10, testCases: [{ description: 'ត្រូវមាន padding: 20px', input: "code.includes('padding: 20px')" }] },
  { title: 'Margin', description: 'សូមបន្ថែម `margin: 10px` ទៅអោយ `.box`។', starterCode: '<style>\n  .box {\n    \n  }\n</style>\n<div class="box">Box</div>', solution: '<style>\n  .box {\n    margin: 10px;\n  }\n</style>\n<div class="box">Box</div>', difficulty: 'easy', points: 10, testCases: [{ description: 'ត្រូវមាន margin: 10px', input: "code.includes('margin: 10px')" }] },
  { title: 'Border', description: 'សូមបន្ថែមបន្ទាត់ជុំវិញ (`border`) កម្រាស់ `2px` ប្រភេទ `solid` និងពណ៌ខ្មៅ (`black`)។', starterCode: '<style>\n  .box {\n    \n  }\n</style>\n<div class="box">Box</div>', solution: '<style>\n  .box {\n    border: 2px solid black;\n  }\n</style>\n<div class="box">Box</div>', difficulty: 'medium', points: 15, testCases: [{ description: 'ត្រូវមាន border: 2px solid black', input: "code.includes('2px') && code.includes('solid') && code.includes('black')" }] },
  { title: 'Border Radius', description: 'សូមធ្វើអោយជ្រុងរបស់ `.box` កោង (`border-radius`) `10px`។', starterCode: '<style>\n  .box {\n    border: 1px solid black;\n  }\n</style>\n<div class="box">Box</div>', solution: '<style>\n  .box {\n    border: 1px solid black;\n    border-radius: 10px;\n  }\n</style>\n<div class="box">Box</div>', difficulty: 'medium', points: 15, testCases: [{ description: 'ត្រូវមាន border-radius: 10px', input: "code.includes('border-radius: 10px')" }] },
  { title: 'Box Sizing', description: 'សូមកំណត់ `box-sizing: border-box` សម្រាប់ `.box`។', starterCode: '<style>\n  .box {\n    \n  }\n</style>\n<div class="box">Box</div>', solution: '<style>\n  .box {\n    box-sizing: border-box;\n  }\n</style>\n<div class="box">Box</div>', difficulty: 'medium', points: 15, testCases: [{ description: 'ត្រូវមាន border-box', input: "code.includes('box-sizing: border-box')" }] },
  { title: 'Max Width', description: 'សូមកំណត់ `max-width: 500px` សម្រាប់ `.container`។', starterCode: '<style>\n  .container {\n    \n  }\n</style>\n<div class="container">Content</div>', solution: '<style>\n  .container {\n    max-width: 500px;\n  }\n</style>\n<div class="container">Content</div>', difficulty: 'medium', points: 15, testCases: [{ description: 'ត្រូវមាន max-width', input: "code.includes('max-width: 500px')" }] },
  { title: 'Min Height', description: 'សូមកំណត់ `min-height: 100vh` សម្រាប់ `body`។', starterCode: '<style>\n  body {\n    \n  }\n</style>', solution: '<style>\n  body {\n    min-height: 100vh;\n  }\n</style>', difficulty: 'medium', points: 15, testCases: [{ description: 'ត្រូវមាន min-height', input: "code.includes('min-height: 100vh')" }] },
  { title: 'Margin Auto', description: 'សូមដាក់ Element អោយនៅកណ្តាលដោយប្រើ `margin: 0 auto;`។', starterCode: '<style>\n  .box {\n    width: 200px;\n    \n  }\n</style>\n<div class="box">Box</div>', solution: '<style>\n  .box {\n    width: 200px;\n    margin: 0 auto;\n  }\n</style>\n<div class="box">Box</div>', difficulty: 'hard', points: 20, testCases: [{ description: 'ត្រូវមាន margin: 0 auto', input: "code.includes('margin: 0 auto')" }] },
  { title: 'Outline', description: 'សូមបន្ថែម `outline: 2px solid red`។', starterCode: '<style>\n  .box {\n    \n  }\n</style>\n<div class="box">Box</div>', solution: '<style>\n  .box {\n    outline: 2px solid red;\n  }\n</style>\n<div class="box">Box</div>', difficulty: 'hard', points: 20, testCases: [{ description: 'ត្រូវមាន outline', input: "code.includes('outline:') && code.includes('red')" }] },

  // Display & Positioning (21-30)
  { title: 'Display Block', description: 'សូមប្តូរ `<span>` ទៅជា `block`។', starterCode: '<style>\n  span {\n    \n  }\n</style>\n<span>A</span>', solution: '<style>\n  span {\n    display: block;\n  }\n</style>\n<span>A</span>', difficulty: 'easy', points: 10, testCases: [{ description: 'ត្រូវមាន display: block', input: "code.includes('display: block')" }] },
  { title: 'Display None', description: 'សូមលាក់ `.hidden` ពីអេក្រង់ដោយប្រើ `display: none`។', starterCode: '<style>\n  .hidden {\n    \n  }\n</style>\n<div class="hidden">A</div>', solution: '<style>\n  .hidden {\n    display: none;\n  }\n</style>\n<div class="hidden">A</div>', difficulty: 'easy', points: 10, testCases: [{ description: 'ត្រូវមាន display: none', input: "code.includes('display: none')" }] },
  { title: 'Visibility', description: 'សូមលាក់ `.invisible` ប៉ុន្តែរក្សាកន្លែងរបស់វាទុក (`visibility: hidden`)។', starterCode: '<style>\n  .invisible {\n    \n  }\n</style>\n<div class="invisible">A</div>', solution: '<style>\n  .invisible {\n    visibility: hidden;\n  }\n</style>\n<div class="invisible">A</div>', difficulty: 'medium', points: 15, testCases: [{ description: 'ត្រូវមាន visibility: hidden', input: "code.includes('visibility: hidden')" }] },
  { title: 'Position Relative', description: 'សូមកំណត់ `position: relative` សម្រាប់ `.box`។', starterCode: '<style>\n  .box {\n    \n  }\n</style>\n<div class="box"></div>', solution: '<style>\n  .box {\n    position: relative;\n  }\n</style>\n<div class="box"></div>', difficulty: 'medium', points: 15, testCases: [{ description: 'ត្រូវមាន position: relative', input: "code.includes('position: relative')" }] },
  { title: 'Position Absolute', description: 'សូមកំណត់ `position: absolute` និង `top: 0` សម្រាប់ `.box`។', starterCode: '<style>\n  .box {\n    \n  }\n</style>\n<div class="box"></div>', solution: '<style>\n  .box {\n    position: absolute;\n    top: 0;\n  }\n</style>\n<div class="box"></div>', difficulty: 'medium', points: 15, testCases: [{ description: 'ត្រូវមាន absolute និង top: 0', input: "code.includes('position: absolute') && code.includes('top: 0')" }] },
  { title: 'Position Fixed', description: 'សូមកំណត់ `position: fixed` និង `bottom: 0`។', starterCode: '<style>\n  .box {\n    \n  }\n</style>\n<div class="box"></div>', solution: '<style>\n  .box {\n    position: fixed;\n    bottom: 0;\n  }\n</style>\n<div class="box"></div>', difficulty: 'medium', points: 15, testCases: [{ description: 'ត្រូវមាន fixed និង bottom: 0', input: "code.includes('position: fixed') && code.includes('bottom: 0')" }] },
  { title: 'Z-Index', description: 'សូមកំណត់ `z-index: 10` សម្រាប់ `.top`។', starterCode: '<style>\n  .top {\n    position: absolute;\n    \n  }\n</style>\n<div class="top"></div>', solution: '<style>\n  .top {\n    position: absolute;\n    z-index: 10;\n  }\n</style>\n<div class="top"></div>', difficulty: 'medium', points: 15, testCases: [{ description: 'ត្រូវមាន z-index: 10', input: "code.includes('z-index: 10')" }] },
  { title: 'Overflow Hidden', description: 'សូមលាក់ Content ដែលហួសប្រអប់ដោយ `overflow: hidden`។', starterCode: '<style>\n  .box {\n    height: 50px;\n    \n  }\n</style>\n<div class="box">Long content...</div>', solution: '<style>\n  .box {\n    height: 50px;\n    overflow: hidden;\n  }\n</style>\n<div class="box">Long content...</div>', difficulty: 'medium', points: 15, testCases: [{ description: 'ត្រូវមាន overflow: hidden', input: "code.includes('overflow: hidden')" }] },
  { title: 'Overflow Scroll', description: 'សូមបង្ហាញ Scrollbar ដោយ `overflow: scroll`។', starterCode: '<style>\n  .box {\n    \n  }\n</style>\n<div class="box"></div>', solution: '<style>\n  .box {\n    overflow: scroll;\n  }\n</style>\n<div class="box"></div>', difficulty: 'medium', points: 15, testCases: [{ description: 'ត្រូវមាន overflow: scroll', input: "code.includes('overflow: scroll')" }] },
  { title: 'Float', description: 'សូមដាក់រូបភាពអោយអណ្តែតទៅឆ្វេង (`float: left`)។', starterCode: '<style>\n  img {\n    \n  }\n</style>\n<img src="#">', solution: '<style>\n  img {\n    float: left;\n  }\n</style>\n<img src="#">', difficulty: 'easy', points: 10, testCases: [{ description: 'ត្រូវមាន float: left', input: "code.includes('float: left')" }] },

  // Flexbox (31-40)
  { title: 'Display Flex', description: 'សូមកំណត់ `display: flex` អោយ `.container`។', starterCode: '<style>\n  .container {\n    \n  }\n</style>\n<div class="container"></div>', solution: '<style>\n  .container {\n    display: flex;\n  }\n</style>\n<div class="container"></div>', difficulty: 'medium', points: 15, testCases: [{ description: 'ត្រូវមាន display: flex', input: "code.includes('display: flex')" }] },
  { title: 'Justify Content', description: 'សូមតម្រឹម Item អោយនៅកណ្តាលអ័ក្សដេក (`justify-content: center`)។', starterCode: '<style>\n  .container {\n    display: flex;\n    \n  }\n</style>\n<div class="container"></div>', solution: '<style>\n  .container {\n    display: flex;\n    justify-content: center;\n  }\n</style>\n<div class="container"></div>', difficulty: 'hard', points: 20, testCases: [{ description: 'ត្រូវមាន justify-content: center', input: "code.includes('justify-content: center')" }] },
  { title: 'Align Items', description: 'សូមតម្រឹម Item អោយនៅកណ្តាលអ័ក្សឈរ (`align-items: center`)។', starterCode: '<style>\n  .container {\n    display: flex;\n    \n  }\n</style>\n<div class="container"></div>', solution: '<style>\n  .container {\n    display: flex;\n    align-items: center;\n  }\n</style>\n<div class="container"></div>', difficulty: 'hard', points: 20, testCases: [{ description: 'ត្រូវមាន align-items: center', input: "code.includes('align-items: center')" }] },
  { title: 'Flex Direction Column', description: 'សូមប្តូរទិសដៅ Flex ទៅជាបញ្ឈរ (`flex-direction: column`)។', starterCode: '<style>\n  .container {\n    display: flex;\n    \n  }\n</style>\n<div class="container"></div>', solution: '<style>\n  .container {\n    display: flex;\n    flex-direction: column;\n  }\n</style>\n<div class="container"></div>', difficulty: 'hard', points: 20, testCases: [{ description: 'ត្រូវមាន flex-direction: column', input: "code.includes('flex-direction: column')" }] },
  { title: 'Flex Wrap', description: 'សូមកំណត់អោយ Item ធ្លាក់ចុះបន្ទាត់បើពេញ (`flex-wrap: wrap`)។', starterCode: '<style>\n  .container {\n    display: flex;\n    \n  }\n</style>\n<div class="container"></div>', solution: '<style>\n  .container {\n    display: flex;\n    flex-wrap: wrap;\n  }\n</style>\n<div class="container"></div>', difficulty: 'hard', points: 20, testCases: [{ description: 'ត្រូវមាន flex-wrap: wrap', input: "code.includes('flex-wrap: wrap')" }] },
  { title: 'Gap', description: 'សូមបន្ថែមគម្លាត `gap: 20px` រវាង Item។', starterCode: '<style>\n  .container {\n    display: flex;\n    \n  }\n</style>\n<div class="container"></div>', solution: '<style>\n  .container {\n    display: flex;\n    gap: 20px;\n  }\n</style>\n<div class="container"></div>', difficulty: 'medium', points: 15, testCases: [{ description: 'ត្រូវមាន gap: 20px', input: "code.includes('gap: 20px')" }] },
  { title: 'Flex Grow', description: 'សូមអោយ Item ទី1 យកទំហំទាំងអស់ដែលសល់ (`flex-grow: 1`)។', starterCode: '<style>\n  .item1 {\n    \n  }\n</style>\n<div class="item1"></div>', solution: '<style>\n  .item1 {\n    flex-grow: 1;\n  }\n</style>\n<div class="item1"></div>', difficulty: 'hard', points: 20, testCases: [{ description: 'ត្រូវមាន flex-grow: 1', input: "code.includes('flex-grow: 1')" }] },
  { title: 'Order', description: 'សូមប្តូរលំដាប់អោយ Item នេះទៅនៅចុងគេ (`order: 1`)។', starterCode: '<style>\n  .item {\n    \n  }\n</style>\n<div class="item"></div>', solution: '<style>\n  .item {\n    order: 1;\n  }\n</style>\n<div class="item"></div>', difficulty: 'hard', points: 20, testCases: [{ description: 'ត្រូវមាន order: 1', input: "code.includes('order: 1')" }] },
  { title: 'Justify Space Between', description: 'សូមរៀបអោយ Item នៅដាច់ឆ្ងាយពីគ្នា (`justify-content: space-between`)។', starterCode: '<style>\n  .container {\n    display: flex;\n    \n  }\n</style>\n<div class="container"></div>', solution: '<style>\n  .container {\n    display: flex;\n    justify-content: space-between;\n  }\n</style>\n<div class="container"></div>', difficulty: 'hard', points: 20, testCases: [{ description: 'ត្រូវមាន space-between', input: "code.includes('justify-content: space-between')" }] },
  { title: 'Align Self', description: 'សូមតម្រឹមតែ Item នេះមួយអោយនៅខាងក្រោម (`align-self: flex-end`)។', starterCode: '<style>\n  .item {\n    \n  }\n</style>\n<div class="item"></div>', solution: '<style>\n  .item {\n    align-self: flex-end;\n  }\n</style>\n<div class="item"></div>', difficulty: 'hard', points: 20, testCases: [{ description: 'ត្រូវមាន align-self: flex-end', input: "code.includes('align-self: flex-end')" }] },

  // Grid, Advanced & Effects (41-50)
  { title: 'Display Grid', description: 'សូមកំណត់ `display: grid` សម្រាប់ `.grid`។', starterCode: '<style>\n  .grid {\n    \n  }\n</style>\n<div class="grid"></div>', solution: '<style>\n  .grid {\n    display: grid;\n  }\n</style>\n<div class="grid"></div>', difficulty: 'medium', points: 15, testCases: [{ description: 'ត្រូវមាន display: grid', input: "code.includes('display: grid')" }] },
  { title: 'Grid Template Columns', description: 'សូមចែកជួរឈរជា 2 ប៉ុនគ្នា (`grid-template-columns: 1fr 1fr`)។', starterCode: '<style>\n  .grid {\n    display: grid;\n    \n  }\n</style>\n<div class="grid"></div>', solution: '<style>\n  .grid {\n    display: grid;\n    grid-template-columns: 1fr 1fr;\n  }\n</style>\n<div class="grid"></div>', difficulty: 'hard', points: 25, testCases: [{ description: 'ត្រូវមាន 1fr 1fr', input: "code.includes('grid-template-columns') && code.includes('1fr 1fr')" }] },
  { title: 'Hover Effect', description: 'សូមប្តូរពណ៌នៅពេលយក Mouse ដាក់លើ `a:hover`។', starterCode: '<style>\n  a:hover {\n    \n  }\n</style>\n<a>Hover me</a>', solution: '<style>\n  a:hover {\n    color: red;\n  }\n</style>\n<a>Hover me</a>', difficulty: 'medium', points: 15, testCases: [{ description: 'ត្រូវមាន :hover', input: "code.includes(':hover')" }] },
  { title: 'Box Shadow', description: 'សូមបន្ថែមស្រមោលអោយ `.box` (`box-shadow: 2px 2px 5px black`)។', starterCode: '<style>\n  .box {\n    \n  }\n</style>\n<div class="box"></div>', solution: '<style>\n  .box {\n    box-shadow: 2px 2px 5px black;\n  }\n</style>\n<div class="box"></div>', difficulty: 'medium', points: 15, testCases: [{ description: 'ត្រូវមាន box-shadow', input: "code.includes('box-shadow:')" }] },
  { title: 'Opacity', description: 'សូមកាត់បន្ថយភាពច្បាស់របស់ `.box` មកត្រឹម `0.5` (`opacity: 0.5`)។', starterCode: '<style>\n  .box {\n    \n  }\n</style>\n<div class="box"></div>', solution: '<style>\n  .box {\n    opacity: 0.5;\n  }\n</style>\n<div class="box"></div>', difficulty: 'easy', points: 10, testCases: [{ description: 'ត្រូវមាន opacity: 0.5', input: "code.includes('opacity: 0.5')" }] },
  { title: 'Cursor Pointer', description: 'សូមប្តូររូបរាងកណ្ដុរពេលដាក់លើអោយទៅជាដៃ (`cursor: pointer`)។', starterCode: '<style>\n  .btn {\n    \n  }\n</style>\n<button class="btn">Btn</button>', solution: '<style>\n  .btn {\n    cursor: pointer;\n  }\n</style>\n<button class="btn">Btn</button>', difficulty: 'easy', points: 10, testCases: [{ description: 'ត្រូវមាន cursor: pointer', input: "code.includes('cursor: pointer')" }] },
  { title: 'Transition', description: 'សូមបន្ថែម `transition: 0.3s` អោយប៊ូតុង។', starterCode: '<style>\n  .btn {\n    \n  }\n</style>\n<button class="btn">Btn</button>', solution: '<style>\n  .btn {\n    transition: 0.3s;\n  }\n</style>\n<button class="btn">Btn</button>', difficulty: 'hard', points: 25, testCases: [{ description: 'ត្រូវមាន transition', input: "code.includes('transition:')" }] },
  { title: 'Transform Scale', description: 'សូមបង្រីក Item អោយធំជាងមុន 1.5 ដង (`transform: scale(1.5)`)។', starterCode: '<style>\n  .box:hover {\n    \n  }\n</style>\n<div class="box"></div>', solution: '<style>\n  .box:hover {\n    transform: scale(1.5);\n  }\n</style>\n<div class="box"></div>', difficulty: 'hard', points: 25, testCases: [{ description: 'ត្រូវមាន scale(1.5)', input: "code.includes('scale(1.5)')" }] },
  { title: 'Media Query', description: 'សូមប្រើ `@media (max-width: 600px)`។', starterCode: '<style>\n  \n</style>', solution: '<style>\n  @media (max-width: 600px) {\n    body {\n      background: red;\n    }\n  }\n</style>', difficulty: 'hard', points: 30, testCases: [{ description: 'ត្រូវមាន @media', input: "code.includes('@media') && code.includes('max-width')" }] },
  { title: 'CSS Variables', description: 'សូមបង្កើត Variable `--main-color: blue` នៅក្នុង `:root`។', starterCode: '<style>\n  :root {\n    \n  }\n</style>', solution: '<style>\n  :root {\n    --main-color: blue;\n  }\n</style>', difficulty: 'hard', points: 30, testCases: [{ description: 'ត្រូវមាន --main-color', input: "code.includes('--main-color:')" }] }
];

async function main() {
  let course = await prisma.course.findFirst({
    where: { category: 'css' }
  });

  if (!course) {
    course = await prisma.course.create({
      data: {
        title: 'មូលដ្ឋានគ្រឹះ CSS',
        slug: 'css-basics',
        description: 'រៀនតែងលម្អគេហទំព័រដោយប្រើ CSS ពីចំណុចសូន្យ',
        category: 'css',
        published: true,
        order: 2
      }
    });
  }

  let lesson = await prisma.lesson.findFirst({
    where: { courseId: course.id }
  });

  if (!lesson) {
    lesson = await prisma.lesson.create({
      data: {
        courseId: course.id,
        title: 'ស្វែងយល់ពី CSS',
        slug: 'intro-to-css',
        content: 'CSS ប្រើសម្រាប់រៀបចំរូបរាងរបស់ HTML',
        published: true,
        order: 1
      }
    });
  }

  // Delete existing exercises to prevent duplication
  await prisma.exercise.deleteMany({
    where: { lessonId: lesson.id }
  });

  for (let i = 0; i < exercises.length; i++) {
    const ex = exercises[i];
    await prisma.exercise.create({
      data: {
        lessonId: lesson.id,
        title: ex.title,
        description: ex.description,
        starterCode: ex.starterCode,
        solution: ex.solution,
        hint: `💡 គន្លឹះ៖ លោកអ្នកអាចប្រើ ${ex.title} សម្រាប់ដោះស្រាយលំហាត់នេះ។`,
        testCases: ex.testCases,
        difficulty: ex.difficulty,
        points: ex.points,
      }
    });
  }

  console.log(`Successfully inserted ${exercises.length} CSS exercises!`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
