import { prisma } from './src/config/prisma';

const exercises = [
  // Easy (1-15) Variables and Types
  { title: 'Variable (var)', description: 'សូមបង្កើតអញ្ញាត `var` មួយឈ្មោះថា `message` និងផ្តល់តម្លៃ "Hello" ឲ្យវា។', starterCode: '// Write your code here\n', solution: 'var message = "Hello";', difficulty: 'easy', points: 10, testCases: [{ description: 'ត្រូវមាន var message = "Hello"', input: "code.includes('var message') && code.includes('\"Hello\"')" }] },
  { title: 'Variable (let)', description: 'សូមបង្កើតអញ្ញាត `let` មួយឈ្មោះថា `age` និងផ្តល់តម្លៃ `25`។', starterCode: '// Write your code here\n', solution: 'let age = 25;', difficulty: 'easy', points: 10, testCases: [{ description: 'ត្រូវមាន let age = 25', input: "code.includes('let age') && code.includes('25')" }] },
  { title: 'Variable (const)', description: 'សូមបង្កើតអញ្ញាត `const` មួយឈ្មោះថា `pi` និងផ្តល់តម្លៃ `3.14`។', starterCode: '// Write your code here\n', solution: 'const pi = 3.14;', difficulty: 'easy', points: 10, testCases: [{ description: 'ត្រូវមាន const pi = 3.14', input: "code.includes('const pi') && code.includes('3.14')" }] },
  { title: 'String Data Type', description: 'សូមបង្កើតអញ្ញាត `let` ឈ្មោះថា `name` និងផ្តល់តម្លៃ "Alice"។', starterCode: '// Write your code here\n', solution: 'let name = "Alice";', difficulty: 'easy', points: 10, testCases: [{ description: 'ត្រូវមាន "Alice"', input: "code.includes('let name') && code.includes('\"Alice\"')" }] },
  { title: 'Number Data Type', description: 'សូមបង្កើតអញ្ញាត `let` ឈ្មោះថា `year` និងផ្តល់តម្លៃ `2026`។', starterCode: '// Write your code here\n', solution: 'let year = 2026;', difficulty: 'easy', points: 10, testCases: [{ description: 'ត្រូវមាន 2026', input: "code.includes('let year') && code.includes('2026')" }] },
  { title: 'Boolean Data Type', description: 'សូមបង្កើតអញ្ញាត `let` ឈ្មោះថា `isStudent` និងផ្តល់តម្លៃ `true`។', starterCode: '// Write your code here\n', solution: 'let isStudent = true;', difficulty: 'easy', points: 10, testCases: [{ description: 'ត្រូវមាន true', input: "code.includes('let isStudent') && code.includes('true')" }] },
  { title: 'typeof Operator', description: 'សូមស្វែងរកប្រភេទនៃ "Hello" ដោយប្រើ `typeof` ហើយរក្សាទុកក្នុងអញ្ញាត `type`។', starterCode: 'let type = \n', solution: 'let type = typeof "Hello";', difficulty: 'easy', points: 10, testCases: [{ description: 'ត្រូវប្រើ typeof', input: "code.includes('typeof') && code.includes('\"Hello\"')" }] },
  { title: 'Basic Math (Add)', description: 'សូមបូកលេខ `5` និង `10` ហើយរក្សាទុកក្នុងអញ្ញាត `sum`។', starterCode: 'let sum = \n', solution: 'let sum = 5 + 10;', difficulty: 'easy', points: 10, testCases: [{ description: 'ត្រូវមាន 5 + 10', input: "code.includes('5 + 10')" }] },
  { title: 'Basic Math (Subtract)', description: 'សូមដកលេខ `20` នឹង `5` ហើយរក្សាទុកក្នុងអញ្ញាត `diff`។', starterCode: 'let diff = \n', solution: 'let diff = 20 - 5;', difficulty: 'easy', points: 10, testCases: [{ description: 'ត្រូវមាន 20 - 5', input: "code.includes('20 - 5')" }] },
  { title: 'Basic Math (Multiply)', description: 'សូមគុណលេខ `4` នឹង `5` ហើយរក្សាទុកក្នុងអញ្ញាត `prod`។', starterCode: 'let prod = \n', solution: 'let prod = 4 * 5;', difficulty: 'easy', points: 10, testCases: [{ description: 'ត្រូវមាន 4 * 5', input: "code.includes('4 * 5')" }] },
  { title: 'Basic Math (Divide)', description: 'សូមចែកលេខ `20` នឹង `4` ហើយរក្សាទុកក្នុងអញ្ញាត `quot`។', starterCode: 'let quot = \n', solution: 'let quot = 20 / 4;', difficulty: 'easy', points: 10, testCases: [{ description: 'ត្រូវមាន 20 / 4', input: "code.includes('20 / 4')" }] },
  { title: 'Basic Math (Modulo)', description: 'សូមរកសំណល់នៃការចែក `10` នឹង `3` ហើយរក្សាទុកក្នុង `rem`។', starterCode: 'let rem = \n', solution: 'let rem = 10 % 3;', difficulty: 'easy', points: 10, testCases: [{ description: 'ត្រូវមាន 10 % 3', input: "code.includes('10 % 3')" }] },
  { title: 'String Concatenation', description: 'សូមភ្ជាប់ពាក្យ "Hello" និង "World" បញ្ចូលគ្នា ហើយរក្សាទុកក្នុង `greeting`។', starterCode: 'let greeting = \n', solution: 'let greeting = "Hello" + "World";', difficulty: 'easy', points: 15, testCases: [{ description: 'ត្រូវភ្ជាប់ពាក្យ', input: "code.includes('\"Hello\"') && code.includes('+') && code.includes('\"World\"')" }] },
  { title: 'String Length', description: 'សូមស្វែងរកប្រវែងនៃពាក្យ "Cambodia" ដោយប្រើ `.length` ហើយរក្សាទុកក្នុង `len`។', starterCode: 'let len = \n', solution: 'let len = "Cambodia".length;', difficulty: 'easy', points: 15, testCases: [{ description: 'ត្រូវមាន .length', input: "code.includes('\"Cambodia\".length')" }] },
  { title: 'Template Literals', description: 'សូមប្រើ Template Literal (``) ដើម្បីសរសេរអត្ថបទ `My name is John` ដោយប្រើអញ្ញាត `name`។', starterCode: 'let name = "John";\nlet text = \n', solution: 'let name = "John";\nlet text = `My name is ${name}`;', difficulty: 'easy', points: 15, testCases: [{ description: 'ត្រូវមាន `${name}`', input: "code.includes('`My name is ${name}`')" }] },

  // Medium (16-35)
  { title: 'Create Array', description: 'សូមបង្កើត Array មួយឈ្មោះ `fruits` ដែលមាន "Apple", "Banana"។', starterCode: 'let fruits = \n', solution: 'let fruits = ["Apple", "Banana"];', difficulty: 'medium', points: 20, testCases: [{ description: 'ត្រូវមាន ["Apple", "Banana"]', input: "code.includes('[\"Apple\", \"Banana\"]')" }] },
  { title: 'Array Index', description: 'សូមទាញយកតំលៃទី១ (Index 0) ពី Array `colors` រក្សាទុកក្នុង `first`។', starterCode: 'let colors = ["Red", "Green"];\nlet first = \n', solution: 'let colors = ["Red", "Green"];\nlet first = colors[0];', difficulty: 'medium', points: 20, testCases: [{ description: 'ត្រូវមាន colors[0]', input: "code.includes('colors[0]')" }] },
  { title: 'Array Push', description: 'សូមបន្ថែម "Orange" ទៅក្នុង Array `fruits` ដោយប្រើ `.push()`។', starterCode: 'let fruits = ["Apple"];\n// your code\n', solution: 'let fruits = ["Apple"];\nfruits.push("Orange");', difficulty: 'medium', points: 20, testCases: [{ description: 'ត្រូវមាន push("Orange")', input: "code.includes('push(\"Orange\")')" }] },
  { title: 'Array Pop', description: 'សូមលុបតំលៃចុងក្រោយនៃ Array `nums` ដោយប្រើ `.pop()`។', starterCode: 'let nums = [1, 2, 3];\n// your code\n', solution: 'let nums = [1, 2, 3];\nnums.pop();', difficulty: 'medium', points: 20, testCases: [{ description: 'ត្រូវមាន .pop()', input: "code.includes('.pop()')" }] },
  { title: 'Array Length', description: 'សូមរកប្រវែងនៃ Array `items` ហើយរក្សាទុកក្នុង `size`។', starterCode: 'let items = [10, 20];\nlet size = \n', solution: 'let items = [10, 20];\nlet size = items.length;', difficulty: 'medium', points: 20, testCases: [{ description: 'ត្រូវប្រើ .length', input: "code.includes('items.length')" }] },
  { title: 'Create Object', description: 'សូមបង្កើត Object មួយឈ្មោះ `car` ដែលមាន properties `brand` ("Toyota") និង `year` (2020)។', starterCode: 'let car = \n', solution: 'let car = { brand: "Toyota", year: 2020 };', difficulty: 'medium', points: 20, testCases: [{ description: 'ត្រូវមាន brand និង year', input: "code.includes('brand:') && code.includes('year:')" }] },
  { title: 'Object Dot Notation', description: 'សូមទាញយកតម្លៃ `brand` ពី Object `car` ដោយប្រើសញ្ញាុចុច (`.`) ហើយទុកក្នុង `b`។', starterCode: 'let car = { brand: "Honda" };\nlet b = \n', solution: 'let car = { brand: "Honda" };\nlet b = car.brand;', difficulty: 'medium', points: 20, testCases: [{ description: 'ត្រូវមាន car.brand', input: "code.includes('car.brand')" }] },
  { title: 'Object Bracket Notation', description: 'សូមទាញយកតម្លៃ `age` ពី Object `person` ដោយប្រើវង់ក្រចក `[]`។', starterCode: 'let person = { age: 30 };\nlet a = \n', solution: 'let person = { age: 30 };\nlet a = person["age"];', difficulty: 'medium', points: 20, testCases: [{ description: 'ត្រូវមាន person["age"]', input: "code.includes('person[\"age\"]') || code.includes(\"person['age']\")" }] },
  { title: 'If Statement', description: 'សូមបង្កើត `if` statement ដើម្បីពិនិត្យថាបើ `x > 10` អោយ `result = "Yes"`។', starterCode: 'let x = 15;\nlet result = "No";\n// your code\n', solution: 'let x = 15;\nlet result = "No";\nif (x > 10) {\n  result = "Yes";\n}', difficulty: 'medium', points: 25, testCases: [{ description: 'ត្រូវមាន if (x > 10)', input: "code.includes('if') && code.includes('x > 10')" }] },
  { title: 'If Else Statement', description: 'សូមប្រើ `if...else`: បើ `x > 5` អោយ `ans = "Big"`, បើមិនអញ្ចឹងទេអោយ `ans = "Small"`។', starterCode: 'let x = 3;\nlet ans;\n// your code\n', solution: 'let x = 3;\nlet ans;\nif (x > 5) {\n  ans = "Big";\n} else {\n  ans = "Small";\n}', difficulty: 'medium', points: 25, testCases: [{ description: 'ត្រូវមាន if...else', input: "code.includes('else') && code.includes('ans = \"Small\"')" }] },
  { title: 'Equality Operator (===)', description: 'សូមពិនិត្យថាតើ `a` និង `b` ដូចគ្នាទាំងតម្លៃ និងប្រភេទឬទេ ដោយប្រើ `===`។', starterCode: 'let a = 5;\nlet b = "5";\nlet isEqual = \n', solution: 'let a = 5;\nlet b = "5";\nlet isEqual = a === b;', difficulty: 'medium', points: 25, testCases: [{ description: 'ត្រូវមាន ===', input: "code.includes('===')" }] },
  { title: 'Logical AND (&&)', description: 'សូមពិនិត្យថា `x > 0` ផង និង `y > 0` ផង ដោយប្រើ `&&`។', starterCode: 'let x = 5;\nlet y = 10;\nlet isPos = \n', solution: 'let x = 5;\nlet y = 10;\nlet isPos = x > 0 && y > 0;', difficulty: 'medium', points: 25, testCases: [{ description: 'ត្រូវមាន &&', input: "code.includes('&&')" }] },
  { title: 'Logical OR (||)', description: 'សូមពិនិត្យថា `x === 0` ឬ `y === 0` ដោយប្រើ `||`។', starterCode: 'let x = 0;\nlet y = 10;\nlet isZero = \n', solution: 'let x = 0;\nlet y = 10;\nlet isZero = x === 0 || y === 0;', difficulty: 'medium', points: 25, testCases: [{ description: 'ត្រូវមាន ||', input: "code.includes('||')" }] },
  { title: 'For Loop', description: 'សូមបង្កើត `for` loop រត់ពី `0` ទៅ `4` (តិចជាង 5) ហើយបញ្ជូលលេខទៅក្នុង Array `arr`។', starterCode: 'let arr = [];\n// your code\n', solution: 'let arr = [];\nfor (let i = 0; i < 5; i++) {\n  arr.push(i);\n}', difficulty: 'medium', points: 25, testCases: [{ description: 'ត្រូវមាន for', input: "code.includes('for') && code.includes('i < 5')" }] },
  { title: 'While Loop', description: 'សូមប្រើ `while` loop ដរាបណា `i < 3` សូមបូក `sum += i` ហើយកុំភ្លេច `i++`។', starterCode: 'let i = 0;\nlet sum = 0;\n// your code\n', solution: 'let i = 0;\nlet sum = 0;\nwhile (i < 3) {\n  sum += i;\n  i++;\n}', difficulty: 'medium', points: 25, testCases: [{ description: 'ត្រូវមាន while (i < 3)', input: "code.includes('while') && code.includes('i < 3')" }] },
  { title: 'Function Declaration', description: 'សូមបង្កើត function ឈ្មោះ `sayHello` ដែលអត់មានប៉ារ៉ាម៉ែត្រ ហើយវា return ពាក្យ "Hello"។', starterCode: '// your code\n', solution: 'function sayHello() {\n  return "Hello";\n}', difficulty: 'medium', points: 25, testCases: [{ description: 'ត្រូវមាន function sayHello', input: "code.includes('function sayHello()') && code.includes('return \"Hello\"')" }] },
  { title: 'Function Parameters', description: 'សូមបង្កើត function ឈ្មោះ `add` ដែលមានប៉ារ៉ាម៉ែត្រ `a` និង `b` ហើយវា return ផលបូករបស់វា។', starterCode: '// your code\n', solution: 'function add(a, b) {\n  return a + b;\n}', difficulty: 'medium', points: 25, testCases: [{ description: 'ត្រូវមាន a + b', input: "code.includes('function add(a, b)') && code.includes('return a + b')" }] },
  { title: 'Function Call', description: 'សូមហៅ (call) function `multiply(2, 3)` ហើយរក្សាទុកក្នុងអញ្ញាត `res`។', starterCode: 'function multiply(a, b) { return a * b; }\nlet res = \n', solution: 'function multiply(a, b) { return a * b; }\nlet res = multiply(2, 3);', difficulty: 'medium', points: 25, testCases: [{ description: 'ត្រូវហៅ multiply(2, 3)', input: "code.includes('multiply(2, 3)')" }] },
  { title: 'Switch Statement', description: 'សូមប្រើ `switch` លើអញ្ញាត `color` បើ "Red" អោយ `x=1` បើ "Blue" អោយ `x=2`។', starterCode: 'let color = "Red";\nlet x = 0;\n// your code\n', solution: 'let color = "Red";\nlet x = 0;\nswitch(color) {\n  case "Red": x=1; break;\n  case "Blue": x=2; break;\n}', difficulty: 'medium', points: 25, testCases: [{ description: 'ត្រូវមាន switch', input: "code.includes('switch') && code.includes('case \"Red\"')" }] },
  { title: 'Ternary Operator', description: 'សូមប្រើ `? :` ដើម្បីពិនិត្យថា `age >= 18` អោយ `status = "Adult"` បើមិនអញ្ចឹង "Minor"។', starterCode: 'let age = 20;\nlet status = \n', solution: 'let age = 20;\nlet status = age >= 18 ? "Adult" : "Minor";', difficulty: 'medium', points: 25, testCases: [{ description: 'ត្រូវមាន ? និង :', input: "code.includes('?') && code.includes(':')" }] },

  // Hard (36-50)
  { title: 'Arrow Function', description: 'សូមបង្កើត Arrow function ឈ្មោះ `subtract` ទទួល `a`, `b` នឹង return `a - b`។', starterCode: 'const subtract = \n', solution: 'const subtract = (a, b) => a - b;', difficulty: 'hard', points: 30, testCases: [{ description: 'ត្រូវមាន =>', input: "code.includes('=>') && code.includes('a - b')" }] },
  { title: 'Array map()', description: 'សូមប្រើ `.map()` លើ Array `nums` ដើម្បីគុណគ្រប់ធាតុនឹង 2។', starterCode: 'let nums = [1, 2, 3];\nlet doubled = \n', solution: 'let nums = [1, 2, 3];\nlet doubled = nums.map(n => n * 2);', difficulty: 'hard', points: 30, testCases: [{ description: 'ត្រូវមាន .map()', input: "code.includes('.map(')" }] },
  { title: 'Array filter()', description: 'សូមប្រើ `.filter()` លើ `nums` ដើម្បីយកតែធាតុដែលធំជាង 5។', starterCode: 'let nums = [2, 6, 8, 3];\nlet filtered = \n', solution: 'let nums = [2, 6, 8, 3];\nlet filtered = nums.filter(n => n > 5);', difficulty: 'hard', points: 30, testCases: [{ description: 'ត្រូវមាន .filter()', input: "code.includes('.filter(')" }] },
  { title: 'Array reduce()', description: 'សូមប្រើ `.reduce()` លើ `nums` ដើម្បីរកផលបូកសរុប។', starterCode: 'let nums = [1, 2, 3];\nlet total = \n', solution: 'let nums = [1, 2, 3];\nlet total = nums.reduce((sum, n) => sum + n, 0);', difficulty: 'hard', points: 30, testCases: [{ description: 'ត្រូវមាន .reduce()', input: "code.includes('.reduce(')" }] },
  { title: 'Array find()', description: 'សូមប្រើ `.find()` ដើម្បីរកធាតុដំបូងក្នុង `nums` ដែលស្មើនឹង 10។', starterCode: 'let nums = [5, 10, 15];\nlet found = \n', solution: 'let nums = [5, 10, 15];\nlet found = nums.find(n => n === 10);', difficulty: 'hard', points: 30, testCases: [{ description: 'ត្រូវមាន .find()', input: "code.includes('.find(')" }] },
  { title: 'Array includes()', description: 'សូមពិនិត្យមើលថា `nums` មានផ្ទុកលេខ 20 ដែរឬទេ ដោយប្រើ `.includes()`។', starterCode: 'let nums = [10, 20, 30];\nlet hasTwenty = \n', solution: 'let nums = [10, 20, 30];\nlet hasTwenty = nums.includes(20);', difficulty: 'hard', points: 30, testCases: [{ description: 'ត្រូវមាន .includes()', input: "code.includes('.includes(20)')" }] },
  { title: 'Object keys()', description: 'សូមទាញយក Key ទាំងអស់របស់ Object `user` ទុកក្នុង Array ដោយប្រើ `Object.keys()`។', starterCode: 'let user = { name: "Tom", age: 25 };\nlet keys = \n', solution: 'let user = { name: "Tom", age: 25 };\nlet keys = Object.keys(user);', difficulty: 'hard', points: 30, testCases: [{ description: 'ត្រូវប្រើ Object.keys()', input: "code.includes('Object.keys(')" }] },
  { title: 'Object values()', description: 'សូមទាញយក Value ទាំងអស់របស់ Object `user` ទុកក្នុង Array ដោយប្រើ `Object.values()`។', starterCode: 'let user = { name: "Tom", age: 25 };\nlet values = \n', solution: 'let user = { name: "Tom", age: 25 };\nlet values = Object.values(user);', difficulty: 'hard', points: 30, testCases: [{ description: 'ត្រូវប្រើ Object.values()', input: "code.includes('Object.values(')" }] },
  { title: 'Destructuring Object', description: 'សូមទាញយក `name` ចេញពី `user` តាមរយៈ Object Destructuring `{ name }`។', starterCode: 'let user = { name: "Bob", age: 30 };\n// your code\n', solution: 'let user = { name: "Bob", age: 30 };\nlet { name } = user;', difficulty: 'hard', points: 30, testCases: [{ description: 'ត្រូវមាន { name }', input: "code.includes('{ name }') || code.includes('{name}')" }] },
  { title: 'Destructuring Array', description: 'សូមទាញយក `first` និង `second` ចេញពី `arr` តាមរយៈ Array Destructuring `[first, second]`។', starterCode: 'let arr = [10, 20];\n// your code\n', solution: 'let arr = [10, 20];\nlet [first, second] = arr;', difficulty: 'hard', points: 30, testCases: [{ description: 'ត្រូវមាន [first, second]', input: "code.includes('[first, second]') || code.includes('[first,second]')" }] },
  { title: 'Spread Operator (Array)', description: 'សូមចម្លង `arr1` ទៅក្នុង `arr2` ដោយប្រើ Spread Operator `...`។', starterCode: 'let arr1 = [1, 2];\nlet arr2 = \n', solution: 'let arr1 = [1, 2];\nlet arr2 = [...arr1];', difficulty: 'hard', points: 35, testCases: [{ description: 'ត្រូវប្រើ ...arr1', input: "code.includes('...arr1')" }] },
  { title: 'Spread Operator (Object)', description: 'សូមរួមបញ្ចូល Object `obj1` ជាមួយ `{ b: 2 }` ដោយប្រើ Spread Operator `...` ទុកក្នុង `obj2`។', starterCode: 'let obj1 = { a: 1 };\nlet obj2 = \n', solution: 'let obj1 = { a: 1 };\nlet obj2 = { ...obj1, b: 2 };', difficulty: 'hard', points: 35, testCases: [{ description: 'ត្រូវប្រើ ...obj1', input: "code.includes('...obj1')" }] },
  { title: 'Rest Parameter', description: 'សូមបង្កើត Function `sumAll(...args)` ដែលប្រមូល Parameter ទាំងអស់ទៅក្នុង Array មួយ។', starterCode: 'function sumAll( ) {\n  return args.length;\n}', solution: 'function sumAll(...args) {\n  return args.length;\n}', difficulty: 'hard', points: 35, testCases: [{ description: 'ត្រូវមាន ...args', input: "code.includes('...args')" }] },
  { title: 'setTimeout', description: 'សូមប្រើ `setTimeout` ដើម្បីហៅ function `greet` ក្រោយពេល 1 វិនាទី (1000ms)។', starterCode: 'function greet() {}\n// your code\n', solution: 'function greet() {}\nsetTimeout(greet, 1000);', difficulty: 'hard', points: 35, testCases: [{ description: 'ត្រូវប្រើ setTimeout', input: "code.includes('setTimeout(greet')" }] },
  { title: 'setInterval', description: 'សូមប្រើ `setInterval` ដើម្បីហៅ function `tick` រៀងរាល់ 1 វិនាទី (1000ms)។', starterCode: 'function tick() {}\n// your code\n', solution: 'function tick() {}\nsetInterval(tick, 1000);', difficulty: 'hard', points: 35, testCases: [{ description: 'ត្រូវប្រើ setInterval', input: "code.includes('setInterval(tick')" }] },
];

async function main() {
  let course = await prisma.course.findFirst({
    where: { category: 'javascript' }
  });

  if (!course) {
    course = await prisma.course.create({
      data: {
        title: 'JavaScript ថ្នាក់ដំបូង',
        slug: 'javascript-basics',
        description: 'រៀនមូលដ្ឋានគ្រឹះនៃការសរសេរកូដជាមួយ JavaScript',
        category: 'javascript',
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
        title: 'សេចក្តីផ្តើម JavaScript',
        slug: 'intro-to-js',
        content: 'JavaScript គឺជាភាសាសម្រាប់បង្កើតមុខងារនៅលើគេហទំព័រ។',
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

  console.log(`Successfully inserted ${exercises.length} JavaScript exercises!`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
