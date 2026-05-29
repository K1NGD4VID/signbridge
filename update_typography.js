const fs = require('fs');
const path = require('path');

const mapping = [
  ['tracking-tight', 'tracking-tighter'],
  ['tracking-normal', 'tracking-tight'],
  ['tracking-wide', 'tracking-normal'],
  ['tracking-wider', 'tracking-wide'],
  ['tracking-widest', 'tracking-wider'],
  ['tracking-\\[0\\.25em\\]', 'tracking-wider']
];

// To avoid double replacement, we need to do this carefully.
// Since we want to REDUCE spacing:
// widest -> wider
// wider -> wide
// wide -> normal
// normal -> tight
// tight -> tighter
// [0.25em] -> wider

// If we do it in this order:
// 1. tight -> tighter
// 2. normal -> tight
// 3. wide -> normal
// 4. wider -> wide
// 5. widest -> wider
// 6. [0.25em] -> wider
// It works! Because 'tight' becomes 'tighter', then 'normal' becomes 'tight'.
// The 'tight' from step 2 won't be caught by step 1 because step 1 already ran.

const files = [
  'frontend/src/app/settings/page.tsx',
  'frontend/src/app/translation/page.tsx',
  'frontend/src/app/admin/page.tsx',
  'frontend/src/app/emergency/page.tsx',
  'frontend/src/app/phrases/page.tsx',
  'frontend/src/app/about/page.tsx',
  'frontend/src/app/feedback/page.tsx',
  'frontend/src/app/dashboard/page.tsx',
  'frontend/src/app/institution/page.tsx',
  'frontend/src/app/hospital/page.tsx',
  'frontend/src/app/register/page.tsx',
  'frontend/src/app/profile/page.tsx',
  'frontend/src/app/support/page.tsx',
  'frontend/src/app/history/page.tsx',
  'frontend/src/app/accessibility/page.tsx',
  'frontend/src/app/page.tsx',
  'frontend/src/app/school/page.tsx',
  'frontend/src/app/hub/page.tsx',
  'frontend/src/app/notifications/page.tsx',
  'frontend/src/app/login/page.tsx',
  'frontend/src/app/billing/page.tsx',
  'frontend/src/app/vocabulary/classroom/page.tsx',
  'frontend/src/app/vocabulary/medical/page.tsx',
  'frontend/src/components/translation/CameraPortal.tsx',
  'frontend/src/components/translation/AvatarViewer.tsx',
  'frontend/src/components/voice/VoicePortal.tsx'
];

files.forEach(file => {
  const fullPath = path.join(process.cwd(), file);
  if (!fs.existsSync(fullPath)) {
    console.log(`File not found: ${fullPath}`);
    return;
  }
  let content = fs.readFileSync(fullPath, 'utf8');
  let originalContent = content;

  for (const [oldClass, newClass] of mapping) {
    const regex = new RegExp(oldClass, 'g');
    content = content.replace(regex, newClass);
  }

  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content);
    console.log(`Updated ${file}`);
  } else {
    console.log(`No changes for ${file}`);
  }
});
