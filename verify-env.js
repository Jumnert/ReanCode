// Verify NextAuth Environment Variables
require('dotenv').config({ path: '.env.local' });

console.log('\n🔍 Checking NextAuth Environment Variables...\n');

const checks = [
  {
    name: 'NEXTAUTH_SECRET',
    value: process.env.NEXTAUTH_SECRET,
    required: true,
    validation: (val) => val && val.length >= 32,
    message: 'Must be at least 32 characters',
  },
  {
    name: 'NEXTAUTH_URL',
    value: process.env.NEXTAUTH_URL,
    required: true,
    validation: (val) => val && /^https?:\/\/.+/.test(val),
    message: 'Must be a valid URL (http:// or https://)',
  },
  {
    name: 'NEXT_PUBLIC_APP_URL',
    value: process.env.NEXT_PUBLIC_APP_URL,
    required: true,
    validation: (val) => val && /^https?:\/\/.+/.test(val),
    message: 'Must be a valid URL (http:// or https://)',
  },
  {
    name: 'DATABASE_URL',
    value: process.env.DATABASE_URL,
    required: true,
    validation: (val) => val && val.startsWith('postgresql://'),
    message: 'Must be a valid PostgreSQL URL',
  },
  {
    name: 'GOOGLE_CLIENT_ID',
    value: process.env.GOOGLE_CLIENT_ID,
    required: false,
    validation: (val) => !val || val.length > 0,
    message: 'Optional - for Google OAuth',
  },
  {
    name: 'GOOGLE_CLIENT_SECRET',
    value: process.env.GOOGLE_CLIENT_SECRET,
    required: false,
    validation: (val) => !val || val.length > 0,
    message: 'Optional - for Google OAuth',
  },
  {
    name: 'GITHUB_CLIENT_ID',
    value: process.env.GITHUB_CLIENT_ID,
    required: false,
    validation: (val) => !val || val.length > 0,
    message: 'Optional - for GitHub OAuth',
  },
  {
    name: 'GITHUB_CLIENT_SECRET',
    value: process.env.GITHUB_CLIENT_SECRET,
    required: false,
    validation: (val) => !val || val.length > 0,
    message: 'Optional - for GitHub OAuth',
  },
];

let hasErrors = false;

checks.forEach((check) => {
  const status = check.value ? '✅' : check.required ? '❌' : '⚠️';
  const isValid = check.validation(check.value);
  const validationStatus = isValid ? '' : ` (${check.message})`;

  if (check.required && !isValid) {
    hasErrors = true;
  }

  console.log(
    `${status} ${check.name.padEnd(25)} ${
      check.value ? (isValid ? 'OK' : 'INVALID' + validationStatus) : 'MISSING'
    }`
  );
});

console.log('\n');

if (hasErrors) {
  console.log('❌ Some required environment variables are missing or invalid!\n');
  console.log('📝 Fix instructions:\n');
  console.log('1. Open .env.local in your editor');
  console.log('2. Make sure these variables are set correctly:');
  console.log('   - NEXTAUTH_SECRET (32+ chars)');
  console.log('   - NEXTAUTH_URL (http://localhost:3000)');
  console.log('   - NEXT_PUBLIC_APP_URL (http://localhost:3000)');
  console.log('   - DATABASE_URL (postgresql://...)');
  console.log('\n3. Restart your dev server: npm run dev\n');
  process.exit(1);
} else {
  console.log('✅ All required environment variables are set correctly!\n');
  console.log('🚀 You can now run: npm run dev\n');
  process.exit(0);
}
