import { prisma } from './src/config/prisma';

const exercises = [
  // Easy (1-10)
  {
    title: 'Heading (<h1>)',
    description: 'សូមបង្កើត Tag `<h1>` មួយដែលមានអត្ថបទ "Hello World"។',
    starterCode: '<!DOCTYPE html>\n<html>\n<body>\n  \n</body>\n</html>',
    solution: '<!DOCTYPE html>\n<html>\n<body>\n  <h1>Hello World</h1>\n</body>\n</html>',
    difficulty: 'easy',
    points: 10,
    testCases: [
      { description: "ត្រូវមាន tag <h1>", input: "document.querySelector('h1') !== null" },
      { description: 'អត្ថបទត្រូវជា "Hello World"', input: "document.querySelector('h1')?.textContent.trim() === 'Hello World'" }
    ]
  },
  {
    title: 'Paragraph (<p>)',
    description: 'សូមបង្កើត Tag `<p>` មួយដែលមានអត្ថបទ "This is my first paragraph."។',
    starterCode: '<!DOCTYPE html>\n<html>\n<body>\n  \n</body>\n</html>',
    solution: '<!DOCTYPE html>\n<html>\n<body>\n  <p>This is my first paragraph.</p>\n</body>\n</html>',
    difficulty: 'easy',
    points: 10,
    testCases: [
      { description: "ត្រូវមាន tag <p>", input: "document.querySelector('p') !== null" },
      { description: 'អត្ថបទត្រូវជា "This is my first paragraph."', input: "document.querySelector('p')?.textContent.trim() === 'This is my first paragraph.'" }
    ]
  },
  {
    title: 'Anchor (<a>)',
    description: 'សូមបង្កើតតំណភ្ជាប់ទៅកាន់ "https://google.com" ដោយប្រើ Tag `<a>` ហើយដាក់អត្ថបទថា "Go to Google"។',
    starterCode: '<!DOCTYPE html>\n<html>\n<body>\n  \n</body>\n</html>',
    solution: '<!DOCTYPE html>\n<html>\n<body>\n  <a href="https://google.com">Go to Google</a>\n</body>\n</html>',
    difficulty: 'easy',
    points: 15,
    testCases: [
      { description: "ត្រូវមាន tag <a>", input: "document.querySelector('a') !== null" },
      { description: "href ត្រូវស្មើនឹង https://google.com", input: "document.querySelector('a')?.getAttribute('href') === 'https://google.com'" },
      { description: 'អត្ថបទត្រូវជា "Go to Google"', input: "document.querySelector('a')?.textContent.trim() === 'Go to Google'" }
    ]
  },
  {
    title: 'Image (<img>)',
    description: 'សូមបញ្ចូលរូបភាពមួយដោយប្រើ Tag `<img>`។ ដាក់ `src` ជា "image.jpg" និង `alt` ជា "Cat Picture"។',
    starterCode: '<!DOCTYPE html>\n<html>\n<body>\n  \n</body>\n</html>',
    solution: '<!DOCTYPE html>\n<html>\n<body>\n  <img src="image.jpg" alt="Cat Picture">\n</body>\n</html>',
    difficulty: 'easy',
    points: 15,
    testCases: [
      { description: "ត្រូវមាន tag <img>", input: "document.querySelector('img') !== null" },
      { description: "src ត្រូវស្មើនឹង image.jpg", input: "document.querySelector('img')?.getAttribute('src') === 'image.jpg'" },
      { description: "alt ត្រូវស្មើនឹង Cat Picture", input: "document.querySelector('img')?.getAttribute('alt') === 'Cat Picture'" }
    ]
  },
  {
    title: 'Unordered List (<ul>)',
    description: 'សូមបង្កើតបញ្ជី `<ul>` មួយដែលមាន `<li>` ចំនួន 3។ ខាងក្នុង `<li>` នីមួយៗសរសេរពាក្យ "Apple", "Banana", "Orange"។',
    starterCode: '<!DOCTYPE html>\n<html>\n<body>\n  \n</body>\n</html>',
    solution: '<!DOCTYPE html>\n<html>\n<body>\n  <ul>\n    <li>Apple</li>\n    <li>Banana</li>\n    <li>Orange</li>\n  </ul>\n</body>\n</html>',
    difficulty: 'easy',
    points: 20,
    testCases: [
      { description: "ត្រូវមាន tag <ul>", input: "document.querySelector('ul') !== null" },
      { description: "ត្រូវមាន tag <li> ចំនួន 3", input: "document.querySelectorAll('ul li').length === 3" }
    ]
  },
  {
    title: 'Ordered List (<ol>)',
    description: 'សូមបង្កើតបញ្ជី `<ol>` មួយដែលមាន `<li>` ចំនួន 2។ ខាងក្នុង `<li>` នីមួយៗសរសេរពាក្យ "First", "Second"។',
    starterCode: '<!DOCTYPE html>\n<html>\n<body>\n  \n</body>\n</html>',
    solution: '<!DOCTYPE html>\n<html>\n<body>\n  <ol>\n    <li>First</li>\n    <li>Second</li>\n  </ol>\n</body>\n</html>',
    difficulty: 'easy',
    points: 20,
    testCases: [
      { description: "ត្រូវមាន tag <ol>", input: "document.querySelector('ol') !== null" },
      { description: "ត្រូវមាន tag <li> ចំនួន 2", input: "document.querySelectorAll('ol li').length === 2" }
    ]
  },
  {
    title: 'Strong / Bold (<strong>)',
    description: 'សូមធ្វើឲ្យពាក្យ "Important" មានលក្ខណៈដិតដោយប្រើ Tag `<strong>`។',
    starterCode: '<!DOCTYPE html>\n<html>\n<body>\n  <p>This message is very Important.</p>\n</body>\n</html>',
    solution: '<!DOCTYPE html>\n<html>\n<body>\n  <p>This message is very <strong>Important</strong>.</p>\n</body>\n</html>',
    difficulty: 'easy',
    points: 10,
    testCases: [
      { description: "ត្រូវមាន tag <strong>", input: "document.querySelector('strong') !== null" },
      { description: 'អត្ថបទក្នុង strong ត្រូវជា "Important"', input: "document.querySelector('strong')?.textContent.trim() === 'Important'" }
    ]
  },
  {
    title: 'Emphasis / Italic (<em>)',
    description: 'សូមធ្វើឲ្យពាក្យ "Awesome" មានលក្ខណៈទ្រេតដោយប្រើ Tag `<em>`។',
    starterCode: '<!DOCTYPE html>\n<html>\n<body>\n  <p>You are Awesome!</p>\n</body>\n</html>',
    solution: '<!DOCTYPE html>\n<html>\n<body>\n  <p>You are <em>Awesome</em>!</p>\n</body>\n</html>',
    difficulty: 'easy',
    points: 10,
    testCases: [
      { description: "ត្រូវមាន tag <em>", input: "document.querySelector('em') !== null" },
      { description: 'អត្ថបទក្នុង em ត្រូវជា "Awesome"', input: "document.querySelector('em')?.textContent.trim() === 'Awesome'" }
    ]
  },
  {
    title: 'Line Break (<br>)',
    description: 'សូមបន្ថែម Tag `<br>` នៅចន្លោះប្រយោគទី១ និងទី២ ដើម្បីឲ្យវាធ្លាក់បន្ទាត់។',
    starterCode: '<!DOCTYPE html>\n<html>\n<body>\n  <p>Sentence 1. Sentence 2.</p>\n</body>\n</html>',
    solution: '<!DOCTYPE html>\n<html>\n<body>\n  <p>Sentence 1.<br>Sentence 2.</p>\n</body>\n</html>',
    difficulty: 'easy',
    points: 10,
    testCases: [
      { description: "ត្រូវមាន tag <br>", input: "document.querySelector('br') !== null" }
    ]
  },
  {
    title: 'Horizontal Rule (<hr>)',
    description: 'សូមបន្ថែម Tag `<hr>` មួយនៅចន្លោះចំណងជើង និងកថាខណ្ឌ។',
    starterCode: '<!DOCTYPE html>\n<html>\n<body>\n  <h1>Hello</h1>\n  \n  <p>How are you?</p>\n</body>\n</html>',
    solution: '<!DOCTYPE html>\n<html>\n<body>\n  <h1>Hello</h1>\n  <hr>\n  <p>How are you?</p>\n</body>\n</html>',
    difficulty: 'easy',
    points: 10,
    testCases: [
      { description: "ត្រូវមាន tag <hr>", input: "document.querySelector('hr') !== null" }
    ]
  },

  // Medium (11-20)
  {
    title: 'Basic Table (<table>)',
    description: 'សូមបង្កើត `<table>` មួយដែលមាន ១ជួរ (`<tr>`) និង ២ជួរឈរ (`<td>`)។ ខាងក្នុង `<td>` នីមួយៗដាក់អក្សរ "A" និង "B"។',
    starterCode: '<!DOCTYPE html>\n<html>\n<body>\n  \n</body>\n</html>',
    solution: '<!DOCTYPE html>\n<html>\n<body>\n  <table>\n    <tr>\n      <td>A</td>\n      <td>B</td>\n    </tr>\n  </table>\n</body>\n</html>',
    difficulty: 'medium',
    points: 20,
    testCases: [
      { description: "ត្រូវមាន <table>", input: "document.querySelector('table') !== null" },
      { description: "ត្រូវមាន <tr>", input: "document.querySelector('table tr') !== null" },
      { description: "ត្រូវមាន <td> ចំនួន ២", input: "document.querySelectorAll('table tr td').length === 2" }
    ]
  },
  {
    title: 'Table Headers (<th>)',
    description: 'សូមបន្ថែម `<th>` ចំនួន ២ ទៅក្នុង `<tr>` ដំបូងនៃតារាង ដោយដាក់អត្ថបទ "Name" និង "Age"។',
    starterCode: '<!DOCTYPE html>\n<html>\n<body>\n  <table>\n    <tr>\n      \n    </tr>\n    <tr>\n      <td>John</td>\n      <td>20</td>\n    </tr>\n  </table>\n</body>\n</html>',
    solution: '<!DOCTYPE html>\n<html>\n<body>\n  <table>\n    <tr>\n      <th>Name</th>\n      <th>Age</th>\n    </tr>\n    <tr>\n      <td>John</td>\n      <td>20</td>\n    </tr>\n  </table>\n</body>\n</html>',
    difficulty: 'medium',
    points: 20,
    testCases: [
      { description: "ត្រូវមាន <th> ចំនួន ២", input: "document.querySelectorAll('table th').length === 2" }
    ]
  },
  {
    title: 'Input Text (<input type="text">)',
    description: 'សូមបង្កើត `<input>` មួយសម្រាប់បញ្ចូលអត្ថបទ ដោយកំណត់ `type="text"` និង `placeholder="Enter your name"`។',
    starterCode: '<!DOCTYPE html>\n<html>\n<body>\n  \n</body>\n</html>',
    solution: '<!DOCTYPE html>\n<html>\n<body>\n  <input type="text" placeholder="Enter your name">\n</body>\n</html>',
    difficulty: 'medium',
    points: 15,
    testCases: [
      { description: "ត្រូវមាន <input>", input: "document.querySelector('input') !== null" },
      { description: "type ត្រូវជា text", input: "document.querySelector('input')?.getAttribute('type') === 'text'" },
      { description: "ត្រូវមាន placeholder", input: "document.querySelector('input')?.getAttribute('placeholder') === 'Enter your name'" }
    ]
  },
  {
    title: 'Input Password (<input type="password">)',
    description: 'សូមបង្កើត `<input>` មួយសម្រាប់ពាក្យសម្ងាត់ ដោយកំណត់ `type="password"`។',
    starterCode: '<!DOCTYPE html>\n<html>\n<body>\n  \n</body>\n</html>',
    solution: '<!DOCTYPE html>\n<html>\n<body>\n  <input type="password">\n</body>\n</html>',
    difficulty: 'medium',
    points: 15,
    testCases: [
      { description: "ត្រូវមាន <input> ដែលមាន type='password'", input: "document.querySelector('input[type=\"password\"]') !== null" }
    ]
  },
  {
    title: 'Label for Input (<label>)',
    description: 'សូមបង្កើត `<label>` មួយដែលមានអត្ថបទ "Name:" និងកំណត់ `for="username"`។ រួចបង្កើត `<input id="username">` មួយ។',
    starterCode: '<!DOCTYPE html>\n<html>\n<body>\n  \n</body>\n</html>',
    solution: '<!DOCTYPE html>\n<html>\n<body>\n  <label for="username">Name:</label>\n  <input id="username">\n</body>\n</html>',
    difficulty: 'medium',
    points: 20,
    testCases: [
      { description: "ត្រូវមាន <label for='username'>", input: "document.querySelector('label')?.getAttribute('for') === 'username'" },
      { description: "ត្រូវមាន <input id='username'>", input: "document.querySelector('input')?.getAttribute('id') === 'username'" }
    ]
  },
  {
    title: 'Select/Option (<select>)',
    description: 'សូមបង្កើត `<select>` មួយដែលមាន `<option>` ២។ Option ទី១ "Apple", Option ទី២ "Orange"។',
    starterCode: '<!DOCTYPE html>\n<html>\n<body>\n  \n</body>\n</html>',
    solution: '<!DOCTYPE html>\n<html>\n<body>\n  <select>\n    <option>Apple</option>\n    <option>Orange</option>\n  </select>\n</body>\n</html>',
    difficulty: 'medium',
    points: 25,
    testCases: [
      { description: "ត្រូវមាន <select>", input: "document.querySelector('select') !== null" },
      { description: "ត្រូវមាន <option> ចំនួន ២", input: "document.querySelectorAll('select option').length === 2" }
    ]
  },
  {
    title: 'Checkbox (<input type="checkbox">)',
    description: 'សូមបង្កើត `<input type="checkbox">` មួយ ហើយដាក់ id "agree"។',
    starterCode: '<!DOCTYPE html>\n<html>\n<body>\n  \n</body>\n</html>',
    solution: '<!DOCTYPE html>\n<html>\n<body>\n  <input type="checkbox" id="agree">\n</body>\n</html>',
    difficulty: 'medium',
    points: 15,
    testCases: [
      { description: "ត្រូវមាន <input type='checkbox'>", input: "document.querySelector('input[type=\"checkbox\"]') !== null" },
      { description: "id ត្រូវជា agree", input: "document.querySelector('input[type=\"checkbox\"]')?.getAttribute('id') === 'agree'" }
    ]
  },
  {
    title: 'Radio Button (<input type="radio">)',
    description: 'សូមបង្កើត `<input type="radio">` ចំនួន ២ ដែលមានឈ្មោះ (name) ដូចគ្នាគឺ "gender"។',
    starterCode: '<!DOCTYPE html>\n<html>\n<body>\n  \n</body>\n</html>',
    solution: '<!DOCTYPE html>\n<html>\n<body>\n  <input type="radio" name="gender" value="male">\n  <input type="radio" name="gender" value="female">\n</body>\n</html>',
    difficulty: 'medium',
    points: 20,
    testCases: [
      { description: "ត្រូវមាន <input type='radio'> ២", input: "document.querySelectorAll('input[type=\"radio\"]').length === 2" },
      { description: "name ត្រូវដូចគ្នាគឺ 'gender'", input: "Array.from(document.querySelectorAll('input[type=\"radio\"]')).every(el => el.getAttribute('name') === 'gender')" }
    ]
  },
  {
    title: 'Form (<form>)',
    description: 'សូមបង្កើត `<form>` មួយដែលមាន `<input>` មួយ និង `<button type="submit">` មួយដោយដាក់ពាក្យថា "Submit"។',
    starterCode: '<!DOCTYPE html>\n<html>\n<body>\n  \n</body>\n</html>',
    solution: '<!DOCTYPE html>\n<html>\n<body>\n  <form>\n    <input type="text">\n    <button type="submit">Submit</button>\n  </form>\n</body>\n</html>',
    difficulty: 'medium',
    points: 20,
    testCases: [
      { description: "ត្រូវមាន <form>", input: "document.querySelector('form') !== null" },
      { description: "មាន input ក្នុង form", input: "document.querySelector('form input') !== null" },
      { description: "មាន button ក្នុង form", input: "document.querySelector('form button') !== null" }
    ]
  },
  {
    title: 'Div Tag (<div>)',
    description: 'សូមបង្កើត `<div>` មួយដែលមាន `id="container"` និងនៅខាងក្នុងមាន `<h1>` មួយសរសេរថា "Title"។',
    starterCode: '<!DOCTYPE html>\n<html>\n<body>\n  \n</body>\n</html>',
    solution: '<!DOCTYPE html>\n<html>\n<body>\n  <div id="container">\n    <h1>Title</h1>\n  </div>\n</body>\n</html>',
    difficulty: 'medium',
    points: 15,
    testCases: [
      { description: "ត្រូវមាន <div id='container'>", input: "document.querySelector('div#container') !== null" },
      { description: "ត្រូវមាន <h1> ក្នុង div", input: "document.querySelector('div#container h1') !== null" }
    ]
  },

  // Hard (21-30)
  {
    title: 'Colspan (colspan)',
    description: 'សូមបង្កើតតារាងមួយដែលមាន `<tr>` ចំនួន ១។ ខាងក្នុងនោះមាន `<th>` មួយដែលបញ្ជូល ២ ជួរឈរចូលគ្នាដោយប្រើ `colspan="2"` និងសរសេរអត្ថបទ "Main Title"។',
    starterCode: '<!DOCTYPE html>\n<html>\n<body>\n  \n</body>\n</html>',
    solution: '<!DOCTYPE html>\n<html>\n<body>\n  <table>\n    <tr>\n      <th colspan="2">Main Title</th>\n    </tr>\n  </table>\n</body>\n</html>',
    difficulty: 'hard',
    points: 30,
    testCases: [
      { description: "ត្រូវមាន <table> និង <tr>", input: "document.querySelector('table tr') !== null" },
      { description: "ត្រូវមាន <th> ដែលមាន colspan='2'", input: "document.querySelector('th')?.getAttribute('colspan') === '2'" }
    ]
  },
  {
    title: 'Rowspan (rowspan)',
    description: 'សូមបង្កើតតារាងមួយដែល `<td>` ដំបូងមាន `rowspan="2"` និងអត្ថបទ "Side"។',
    starterCode: '<!DOCTYPE html>\n<html>\n<body>\n  <table>\n    <tr>\n      \n    </tr>\n    <tr>\n      <td>Row 2</td>\n    </tr>\n  </table>\n</body>\n</html>',
    solution: '<!DOCTYPE html>\n<html>\n<body>\n  <table>\n    <tr>\n      <td rowspan="2">Side</td>\n      <td>Row 1</td>\n    </tr>\n    <tr>\n      <td>Row 2</td>\n    </tr>\n  </table>\n</body>\n</html>',
    difficulty: 'hard',
    points: 30,
    testCases: [
      { description: "ត្រូវមាន <td> ដែលមាន rowspan='2'", input: "document.querySelector('td[rowspan=\"2\"]') !== null" }
    ]
  },
  {
    title: 'Figure & Figcaption (<figure>)',
    description: 'សូមប្រើប្រាស់ `<figure>` ដើម្បីផ្ទុក `<img>` មួយ និង `<figcaption>` មួយសម្រាប់បរិយាយរូបភាព។',
    starterCode: '<!DOCTYPE html>\n<html>\n<body>\n  \n</body>\n</html>',
    solution: '<!DOCTYPE html>\n<html>\n<body>\n  <figure>\n    <img src="pic.jpg" alt="Picture">\n    <figcaption>This is a picture</figcaption>\n  </figure>\n</body>\n</html>',
    difficulty: 'hard',
    points: 25,
    testCases: [
      { description: "ត្រូវមាន <figure>", input: "document.querySelector('figure') !== null" },
      { description: "មាន <img> ក្នុង figure", input: "document.querySelector('figure img') !== null" },
      { description: "មាន <figcaption> ក្នុង figure", input: "document.querySelector('figure figcaption') !== null" }
    ]
  },
  {
    title: 'Header (<header>)',
    description: 'សូមប្រើ Semantic tag `<header>` ហើយដាក់ `<nav>` មួយនៅខាងក្នុង។',
    starterCode: '<!DOCTYPE html>\n<html>\n<body>\n  \n</body>\n</html>',
    solution: '<!DOCTYPE html>\n<html>\n<body>\n  <header>\n    <nav>\n      <a href="#">Home</a>\n    </nav>\n  </header>\n</body>\n</html>',
    difficulty: 'hard',
    points: 25,
    testCases: [
      { description: "ត្រូវមាន <header>", input: "document.querySelector('header') !== null" },
      { description: "មាន <nav> ក្នុង header", input: "document.querySelector('header nav') !== null" }
    ]
  },
  {
    title: 'Article and Footer (<article>, <footer>)',
    description: 'សូមបង្កើត `<article>` មួយ ហើយខាងក្រោមវាបង្កើត `<footer>` មួយ។',
    starterCode: '<!DOCTYPE html>\n<html>\n<body>\n  \n</body>\n</html>',
    solution: '<!DOCTYPE html>\n<html>\n<body>\n  <article>\n    <p>This is an article...</p>\n  </article>\n  <footer>\n    <p>Copyright 2026</p>\n  </footer>\n</body>\n</html>',
    difficulty: 'hard',
    points: 25,
    testCases: [
      { description: "ត្រូវមាន <article>", input: "document.querySelector('article') !== null" },
      { description: "ត្រូវមាន <footer>", input: "document.querySelector('footer') !== null" }
    ]
  },
  {
    title: 'Iframe (<iframe>)',
    description: 'សូមបង្កើត `<iframe>` មួយ ដោយដាក់ `src="https://example.com"` និងទំហំ `width="500"` `height="300"`។',
    starterCode: '<!DOCTYPE html>\n<html>\n<body>\n  \n</body>\n</html>',
    solution: '<!DOCTYPE html>\n<html>\n<body>\n  <iframe src="https://example.com" width="500" height="300"></iframe>\n</body>\n</html>',
    difficulty: 'hard',
    points: 30,
    testCases: [
      { description: "ត្រូវមាន <iframe>", input: "document.querySelector('iframe') !== null" },
      { description: "src ត្រឹមត្រូវ", input: "document.querySelector('iframe')?.getAttribute('src') === 'https://example.com'" },
      { description: "មាន width 500", input: "document.querySelector('iframe')?.getAttribute('width') === '500'" },
      { description: "មាន height 300", input: "document.querySelector('iframe')?.getAttribute('height') === '300'" }
    ]
  },
  {
    title: 'Audio (<audio>)',
    description: 'សូមបញ្ចូល `<audio>` ដែលមានប៊ូតុងបញ្ជា `controls` និងមាន `<source src="sound.mp3" type="audio/mpeg">` នៅខាងក្នុង។',
    starterCode: '<!DOCTYPE html>\n<html>\n<body>\n  \n</body>\n</html>',
    solution: '<!DOCTYPE html>\n<html>\n<body>\n  <audio controls>\n    <source src="sound.mp3" type="audio/mpeg">\n  </audio>\n</body>\n</html>',
    difficulty: 'hard',
    points: 35,
    testCases: [
      { description: "ត្រូវមាន <audio> ជាមួយ controls", input: "document.querySelector('audio')?.hasAttribute('controls') === true" },
      { description: "មាន <source> ខាងក្នុង", input: "document.querySelector('audio source') !== null" }
    ]
  },
  {
    title: 'Video (<video>)',
    description: 'សូមបញ្ចូល `<video>` ដែលមាន `controls` `width="400"` រួចដាក់ `<source src="movie.mp4" type="video/mp4">` ខាងក្នុង។',
    starterCode: '<!DOCTYPE html>\n<html>\n<body>\n  \n</body>\n</html>',
    solution: '<!DOCTYPE html>\n<html>\n<body>\n  <video controls width="400">\n    <source src="movie.mp4" type="video/mp4">\n  </video>\n</body>\n</html>',
    difficulty: 'hard',
    points: 35,
    testCases: [
      { description: "ត្រូវមាន <video controls width='400'>", input: "document.querySelector('video')?.hasAttribute('controls') === true && document.querySelector('video')?.getAttribute('width') === '400'" },
      { description: "មាន <source> ក្នុង video", input: "document.querySelector('video source') !== null" }
    ]
  },
  {
    title: 'Complex Form (<form>)',
    description: 'សូមបង្កើត `<form>` ដែលមាន `<input type="text">`, `<input type="password">`, និង `<select>`។',
    starterCode: '<!DOCTYPE html>\n<html>\n<body>\n  \n</body>\n</html>',
    solution: '<!DOCTYPE html>\n<html>\n<body>\n  <form>\n    <input type="text">\n    <input type="password">\n    <select><option>Option 1</option></select>\n  </form>\n</body>\n</html>',
    difficulty: 'hard',
    points: 40,
    testCases: [
      { description: "មាន <form>", input: "document.querySelector('form') !== null" },
      { description: "មាន text input", input: "document.querySelector('form input[type=\"text\"]') !== null" },
      { description: "មាន password input", input: "document.querySelector('form input[type=\"password\"]') !== null" },
      { description: "មាន select", input: "document.querySelector('form select') !== null" }
    ]
  },
  {
    title: 'Full Page Structure (<main>)',
    description: 'សូមបង្កើត HTML ពេញលេញ: `<header>`, `<nav>`, `<main>`, និង `<footer>`។',
    starterCode: '<!DOCTYPE html>\n<html>\n<body>\n  \n</body>\n</html>',
    solution: '<!DOCTYPE html>\n<html>\n<body>\n  <header></header>\n  <nav></nav>\n  <main></main>\n  <footer></footer>\n</body>\n</html>',
    difficulty: 'hard',
    points: 50,
    testCases: [
      { description: "មាន <header>", input: "document.querySelector('header') !== null" },
      { description: "មាន <nav>", input: "document.querySelector('nav') !== null" },
      { description: "មាន <main>", input: "document.querySelector('main') !== null" },
      { description: "មាន <footer>", input: "document.querySelector('footer') !== null" }
    ]
  }
];

async function main() {
  let course = await prisma.course.findFirst({
    where: { category: 'html' }
  });

  if (!course) {
    course = await prisma.course.create({
      data: {
        title: 'HTML & CSS ថ្នាក់ដំបូង',
        slug: 'html-css-basics',
        description: 'រៀនមូលដ្ឋានគ្រឹះនៃការបង្កើតគេហទំព័រជាមួយ HTML និង CSS',
        category: 'html',
        published: true,
        order: 1
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
        title: 'សេចក្តីផ្តើម HTML',
        slug: 'intro-to-html',
        content: 'HTML គឺជាភាសាគ្រឹះសម្រាប់បង្កើតគេហទំព័រ។',
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

  console.log(`Successfully inserted ${exercises.length} HTML exercises!`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
