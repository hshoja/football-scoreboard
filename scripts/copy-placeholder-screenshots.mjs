import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get directory path in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

// Create directory if it doesn't exist
const screenshotsDir = path.join(rootDir, "public", "screenshots");
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
  console.log("Created screenshots directory");
}

// Generate SVG content for a placeholder
function generateSvgPlaceholder(title, description) {
  return `
<svg width="1280" height="720" xmlns="http://www.w3.org/2000/svg">
  <!-- Background gradient -->
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4f46e5;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2563eb;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="100%" height="100%" fill="url(#grad)" />
  
  <!-- Pattern -->
  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
    <rect width="20" height="20" fill="rgba(255, 255, 255, 0.05)" />
  </pattern>
  <rect width="100%" height="100%" fill="url(#grid)" />
  
  <!-- Border -->
  <rect x="20" y="20" width="1240" height="680" fill="none" stroke="rgba(255, 255, 255, 0.3)" stroke-width="10" />
  
  <!-- Title -->
  <text x="50%" y="45%" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white" text-anchor="middle">${title}</text>
  
  <!-- Description -->
  <text x="50%" y="55%" font-family="Arial, sans-serif" font-size="24" fill="rgba(255, 255, 255, 0.8)" text-anchor="middle">${description}</text>
  
  <!-- Football icon -->
  <circle cx="640" cy="200" r="80" fill="white" opacity="0.2" />
  <path d="M640 140 L680 180 L670 230 L610 230 L600 180 Z" fill="rgba(0, 0, 0, 0.3)" />
</svg>
  `.trim();
}

// Configuration for screenshots
const screenshots = [
  {
    name: "home.png",
    title: "Home Screen",
    description: "Manage your tournaments with ease",
  },
  {
    name: "standings.png",
    title: "Standings Screen",
    description: "View team rankings and statistics",
  },
];

// Create SVG files
for (const screenshot of screenshots) {
  const svgContent = generateSvgPlaceholder(
    screenshot.title,
    screenshot.description
  );
  const svgPath = path.join(
    screenshotsDir,
    screenshot.name.replace(".png", ".svg")
  );
  fs.writeFileSync(svgPath, svgContent);
  console.log(`Created ${svgPath}`);
}

console.log(
  "All placeholder screenshots created as SVGs. You can convert them to PNG using a tool of your choice."
);
