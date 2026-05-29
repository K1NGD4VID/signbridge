const fs = require('fs');
const path = require('path');

const fixMapping = [
  [/tracking-normalr/g, 'tracking-wide'],
  [/tracking-tighterer/g, 'tracking-tighter']
];

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
  if (!fs.existsSync(fullPath)) return;
  let content = fs.readFileSync(fullPath, 'utf8');
  let originalContent = content;

  for (const [regex, newClass] of fixMapping) {
    content = content.replace(regex, newClass);
  }

  if (content !== originalContent) {
    fs.writeFileSync(fullPath, content);
    console.log(`Fixed ${file}`);
  }
});
