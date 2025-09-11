// Environment variable validation script
// Run this to check if all required environment variables are set

require('dotenv').config();

const requiredEnvVars = [
  'RAZORPAY_KEY_ID_TEST',
  'RAZORPAY_SECRET_TEST',
  'RAZORPAY_KEY_ID_LIVE',
  'RAZORPAY_SECRET_LIVE'
];

console.log('🔍 Checking environment variables...\n');

let allPresent = true;

requiredEnvVars.forEach(envVar => {
  const value = process.env[envVar];
  if (value) {
    console.log(`✅ ${envVar}: ${value.substring(0, 10)}...`);
  } else {
    console.log(`❌ ${envVar}: NOT SET`);
    allPresent = false;
  }
});

console.log('\n' + '='.repeat(50));

if (allPresent) {
  console.log('🎉 All required environment variables are set!');
} else {
  console.log('⚠️  Some environment variables are missing.');
  console.log('\nTo fix this on Render.com:');
  console.log('1. Go to your Render dashboard');
  console.log('2. Select your service');
  console.log('3. Go to Environment tab');
  console.log('4. Add the missing environment variables');
  console.log('\nRequired variables:');
  requiredEnvVars.forEach(envVar => {
    console.log(`   - ${envVar}`);
  });
}
