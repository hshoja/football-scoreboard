const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// Make sure the splash screens directory exists
const splashDir = path.join(__dirname, "..", "public", "splash");
if (!fs.existsSync(splashDir)) {
  fs.mkdirSync(splashDir, { recursive: true });
}

// Input SVG file - we'll use the same base icon
const inputFile = path.join(
  __dirname,
  "..",
  "public",
  "icons",
  "icon-base.svg"
);

// Define iOS splash screen sizes
const splashScreens = [
  { name: "iphone5_splash.png", width: 640, height: 1136 },
  { name: "iphone6_splash.png", width: 750, height: 1334 },
  { name: "iphoneplus_splash.png", width: 1242, height: 2208 },
  { name: "iphonex_splash.png", width: 1125, height: 2436 },
  { name: "iphonexr_splash.png", width: 828, height: 1792 },
  { name: "iphonexsmax_splash.png", width: 1242, height: 2688 },
  { name: "ipad_splash.png", width: 1536, height: 2048 },
  { name: "ipadpro1_splash.png", width: 1668, height: 2224 },
  { name: "ipadpro2_splash.png", width: 1668, height: 2388 },
  { name: "ipadpro3_splash.png", width: 2048, height: 2732 },
];

// Background color - use the theme color from manifest
const backgroundColor = "#4f46e5";

// Generate splash screens with a resized icon centered
async function generateSplashScreens() {
  // First create the base icon at a larger size
  const iconSize = 512;
  const iconBuffer = await sharp(inputFile)
    .resize(iconSize, iconSize)
    .toBuffer();

  for (const splash of splashScreens) {
    const { name, width, height } = splash;

    // Create a solid background with the theme color
    const background = Buffer.from(
      `<svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="${width}" height="${height}" fill="${backgroundColor}"/>
      </svg>`
    );

    // Composite the icon on top of the background
    await sharp(background)
      .composite([
        {
          input: iconBuffer,
          top: Math.floor((height - iconSize) / 2),
          left: Math.floor((width - iconSize) / 2),
        },
      ])
      .toFile(path.join(splashDir, name));

    console.log(`Generated ${name}`);
  }
}

generateSplashScreens()
  .then(() => console.log("All splash screens generated successfully"))
  .catch((err) => console.error("Error generating splash screens:", err));
