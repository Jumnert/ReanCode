import { prisma } from './src/config/prisma';

const exercises = [
  // Basics
  { title: 'Hello React', description: 'សូមបង្កើត Component `App` ដែល return `<h1>Hello React</h1>`។', starterCode: 'function App() {\n  return (\n    \n  );\n}', solution: 'function App() {\n  return <h1>Hello React</h1>;\n}', difficulty: 'easy', points: 10, testCases: [{ description: 'ត្រូវមាន <h1>Hello React</h1>', input: "code.includes('<h1>Hello React</h1>')" }] },
  { title: 'Multiple Elements', description: 'សូម return `<div>` មួយដែលមាន `<h1>` និង `<p>` នៅខាងក្នុងវាក្នុង Component `App`។', starterCode: 'function App() {\n  return (\n    \n  );\n}', solution: 'function App() {\n  return (\n    <div>\n      <h1>Title</h1>\n      <p>Description</p>\n    </div>\n  );\n}', difficulty: 'easy', points: 15, testCases: [{ description: 'ត្រូវមាន <div> ខ្ចប់', input: "code.includes('<div>') && code.includes('<h1>') && code.includes('<p>')" }] },
  { title: 'React Fragment', description: 'សូម return `<h1>` និង `<p>` ដោយប្រើប្រាស់ `<>` (Fragment) ជំនួសអោយ `<div>`។', starterCode: 'function App() {\n  return (\n    \n  );\n}', solution: 'function App() {\n  return (\n    <>\n      <h1>Title</h1>\n      <p>Description</p>\n    </>\n  );\n}', difficulty: 'easy', points: 15, testCases: [{ description: 'ត្រូវប្រើ Fragment <>', input: "code.includes('<>') && code.includes('</>')" }] },
  { title: 'Dynamic Variables', description: 'សូមបង្ហាញតម្លៃនៃអញ្ញាត `name` នៅក្នុង `<h1>` ដោយប្រើ `{name}`។', starterCode: 'function App() {\n  const name = "John";\n  return <h1></h1>;\n}', solution: 'function App() {\n  const name = "John";\n  return <h1>{name}</h1>;\n}', difficulty: 'easy', points: 15, testCases: [{ description: 'ត្រូវមាន {name}', input: "code.includes('{name}')" }] },
  { title: 'Applying CSS Classes', description: 'សូមបន្ថែម Class ឈ្មោះ `title` ទៅអោយ `<h1>` ដោយប្រើ `className`។', starterCode: 'function App() {\n  return <h1>Hello</h1>;\n}', solution: 'function App() {\n  return <h1 className="title">Hello</h1>;\n}', difficulty: 'easy', points: 15, testCases: [{ description: 'ត្រូវមាន className="title"', input: "code.includes('className=\"title\"') || code.includes(\"className='title'\")" }] },
  
  // Props
  { title: 'Passing Props', description: 'សូមបញ្ជូន Prop `name="Alice"` ទៅកាន់ Component `Welcome`។', starterCode: 'function App() {\n  return <Welcome />;\n}', solution: 'function App() {\n  return <Welcome name="Alice" />;\n}', difficulty: 'medium', points: 20, testCases: [{ description: 'ត្រូវមាន name="Alice"', input: "code.includes('name=\"Alice\"')" }] },
  { title: 'Receiving Props', description: 'សូមទទួល `props` នៅក្នុង `Welcome` ហើយបង្ហាញ `props.name`។', starterCode: 'function Welcome(props) {\n  return <h1>Hello </h1>;\n}', solution: 'function Welcome(props) {\n  return <h1>Hello {props.name}</h1>;\n}', difficulty: 'medium', points: 20, testCases: [{ description: 'ត្រូវមាន {props.name}', input: "code.includes('{props.name}')" }] },
  { title: 'Destructuring Props', description: 'សូមប្រើការ Destructure `{ name }` ជំនួសអោយ `props`។', starterCode: 'function Welcome( ) {\n  return <h1>Hello {name}</h1>;\n}', solution: 'function Welcome({ name }) {\n  return <h1>Hello {name}</h1>;\n}', difficulty: 'medium', points: 20, testCases: [{ description: 'ត្រូវមាន { name }', input: "code.includes('{ name }') || code.includes('{name}')" }] },
  { title: 'Children Props', description: 'សូមប្រើប្រាស់ `children` Prop ដើម្បីបង្ហាញអត្ថបទនៅកណ្តាល Component `Card`។', starterCode: 'function Card({ children }) {\n  return <div className="card"></div>;\n}', solution: 'function Card({ children }) {\n  return <div className="card">{children}</div>;\n}', difficulty: 'medium', points: 20, testCases: [{ description: 'ត្រូវមាន {children}', input: "code.includes('{children}')" }] },
  { title: 'Default Props', description: 'សូមកំណត់ Default Value សម្រាប់ prop `theme` អោយស្មើនឹង `"light"`។', starterCode: 'function Button({ theme }) {\n  return <button className={theme}>Click</button>;\n}', solution: 'function Button({ theme = "light" }) {\n  return <button className={theme}>Click</button>;\n}', difficulty: 'medium', points: 20, testCases: [{ description: 'ត្រូវមាន theme = "light"', input: "code.includes('theme = \"light\"') || code.includes(\"theme = 'light'\")" }] },

  // State
  { title: 'useState Hook', description: 'សូមបង្កើត State ឈ្មោះ `count` និង `setCount` ដោយប្រើ `useState(0)`។', starterCode: 'import { useState } from "react";\n\nfunction Counter() {\n  \n  return <div>{count}</div>;\n}', solution: 'import { useState } from "react";\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n  return <div>{count}</div>;\n}', difficulty: 'medium', points: 25, testCases: [{ description: 'ត្រូវប្រើ useState(0)', input: "code.includes('useState(0)') && code.includes('const [count, setCount]')" }] },
  { title: 'Updating State', description: 'សូមហៅ `setCount(count + 1)` នៅពេលចុចលើ Button (ប្រើ `onClick`)។', starterCode: 'function Counter() {\n  const [count, setCount] = useState(0);\n  return <button>Click</button>;\n}', solution: 'function Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>Click</button>;\n}', difficulty: 'medium', points: 25, testCases: [{ description: 'ត្រូវមាន onClick និង setCount', input: "code.includes('onClick') && code.includes('setCount(')" }] },
  { title: 'Toggle State', description: 'សូមបង្កើត State ឈ្មោះ `isOn` ជាប្រភេទ Boolean ហើយប្តូរតម្លៃវានៅពេលចុច Button។', starterCode: 'function Toggle() {\n  const [isOn, setIsOn] = useState(false);\n  return <button onClick={() => }>{isOn ? "ON" : "OFF"}</button>;\n}', solution: 'function Toggle() {\n  const [isOn, setIsOn] = useState(false);\n  return <button onClick={() => setIsOn(!isOn)}>{isOn ? "ON" : "OFF"}</button>;\n}', difficulty: 'hard', points: 30, testCases: [{ description: 'ត្រូវមាន setIsOn(!isOn)', input: "code.includes('setIsOn(!isOn)')" }] },
  { title: 'Controlled Input', description: 'សូមភ្ជាប់តម្លៃ Input ទៅកាន់ State `text` ដោយប្រើ `value` និង `onChange`។', starterCode: 'function Input() {\n  const [text, setText] = useState("");\n  return <input />;\n}', solution: 'function Input() {\n  const [text, setText] = useState("");\n  return <input value={text} onChange={(e) => setText(e.target.value)} />;\n}', difficulty: 'hard', points: 30, testCases: [{ description: 'ត្រូវមាន value={text} និង setText(e.target.value)', input: "code.includes('value={text}') && code.includes('e.target.value')" }] },
  { title: 'Array in State', description: 'សូមបន្ថែម "Apple" ទៅកាន់ State Array `items` ដោយប្រើ Spread Operator។', starterCode: 'function List() {\n  const [items, setItems] = useState([]);\n  const addItem = () => {\n    // your code\n  };\n}', solution: 'function List() {\n  const [items, setItems] = useState([]);\n  const addItem = () => {\n    setItems([...items, "Apple"]);\n  };\n}', difficulty: 'hard', points: 30, testCases: [{ description: 'ត្រូវមាន [...items, "Apple"]', input: "code.includes('...items') && code.includes('\"Apple\"')" }] },

  // Effects & Lists
  { title: 'useEffect Hook', description: 'សូមហៅ `useEffect` ដែល Print ពាក្យ "Mounted" ម្តងគត់ (ប្រើ empty dependency array `[]`)។', starterCode: 'import { useEffect } from "react";\n\nfunction App() {\n  \n  return <div>App</div>;\n}', solution: 'import { useEffect } from "react";\n\nfunction App() {\n  useEffect(() => {\n    console.log("Mounted");\n  }, []);\n  return <div>App</div>;\n}', difficulty: 'hard', points: 35, testCases: [{ description: 'ត្រូវមាន useEffect និង []', input: "code.includes('useEffect') && code.includes('[]')" }] },
  { title: 'Rendering Lists', description: 'សូមប្រើ `.map()` ដើម្បី Render `<li>` សម្រាប់ធាតុនីមួយៗក្នុង Array `names`។', starterCode: 'function List() {\n  const names = ["A", "B"];\n  return <ul>\n    {names.}\n  </ul>;\n}', solution: 'function List() {\n  const names = ["A", "B"];\n  return <ul>\n    {names.map(name => <li>{name}</li>)}\n  </ul>;\n}', difficulty: 'hard', points: 35, testCases: [{ description: 'ត្រូវប្រើ .map()', input: "code.includes('.map(') && code.includes('<li>')" }] },
  { title: 'List Keys', description: 'នៅពេលប្រើ `.map()` សូមបន្ថែម `key={index}` ទៅអោយ `<li>`។', starterCode: 'function List() {\n  const names = ["A", "B"];\n  return <ul>\n    {names.map((name, index) => <li>{name}</li>)}\n  </ul>;\n}', solution: 'function List() {\n  const names = ["A", "B"];\n  return <ul>\n    {names.map((name, index) => <li key={index}>{name}</li>)}\n  </ul>;\n}', difficulty: 'hard', points: 35, testCases: [{ description: 'ត្រូវមាន key={index}', input: "code.includes('key={index}')" }] },
  { title: 'Conditional Rendering', description: 'សូមបង្ហាញពាក្យ "Welcome" បើ `isLoggedIn` ជា true ដោយប្រើ Logical AND (`&&`)។', starterCode: 'function App({ isLoggedIn }) {\n  return <div>\n    \n  </div>;\n}', solution: 'function App({ isLoggedIn }) {\n  return <div>\n    {isLoggedIn && <h1>Welcome</h1>}\n  </div>;\n}', difficulty: 'hard', points: 35, testCases: [{ description: 'ត្រូវប្រើ &&', input: "code.includes('isLoggedIn &&')" }] },
  { title: 'Ternary Rendering', description: 'បើ `isLoggedIn` ត្រូវ Render "Logout" បើមិនអញ្ចឹង Render "Login"។', starterCode: 'function App({ isLoggedIn }) {\n  return <button>\n    \n  </button>;\n}', solution: 'function App({ isLoggedIn }) {\n  return <button>\n    {isLoggedIn ? "Logout" : "Login"}\n  </button>;\n}', difficulty: 'hard', points: 35, testCases: [{ description: 'ត្រូវប្រើ ? និង :', input: "code.includes('?') && code.includes(':') && code.includes('\"Logout\"')" }] },
];

async function main() {
  let course = await prisma.course.findFirst({
    where: { category: 'react' }
  });

  if (!course) {
    course = await prisma.course.create({
      data: {
        title: 'React ថ្នាក់ដំបូង',
        slug: 'react-basics',
        description: 'រៀនបង្កើត Web App ទំនើបជាមួយនឹង React',
        category: 'react',
        published: true,
        order: 3
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
        title: 'សេចក្តីផ្តើម React',
        slug: 'intro-to-react',
        content: 'React គឺជាបណ្ណាល័យរបស់ JavaScript សម្រាប់បង្កើត UI។',
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

  console.log(`Successfully inserted ${exercises.length} React exercises!`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
