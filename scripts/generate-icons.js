const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// Make sure the icons directory exists
const iconsDir = path.join(__dirname, "..", "public", "icons");
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Input SVG file
const inputFile = path.join(
  __dirname,
  "..",
  "public",
  "icons",
  "icon-base.svg"
);

// Sizes to generate
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Special apple icon sizes
const appleSizes = [57, 60, 72, 76, 114, 120, 144, 152, 167, 180, 1024];

// Generate icons
async function generateIcons() {
  // Standard icons
  for (const size of sizes) {
    await sharp(inputFile)
      .resize(size, size)
      .png()
      .toFile(path.join(iconsDir, `icon-${size}x${size}.png`));
    console.log(`Generated icon-${size}x${size}.png`);
  }

  // Apple icons
  for (const size of appleSizes) {
    await sharp(inputFile)
      .resize(size, size)
      .png()
      .toFile(path.join(iconsDir, `apple-icon-${size}x${size}.png`));
    console.log(`Generated apple-icon-${size}x${size}.png`);
  }

  // Apple touch icon precomposed (used by older iOS)
  await sharp(inputFile)
    .resize(180, 180)
    .png()
    .toFile(path.join(iconsDir, "apple-touch-icon-precomposed.png"));
  console.log("Generated apple-touch-icon-precomposed.png");

  // Create favicon.ico (multi-size ico file)
  await sharp(inputFile)
    .resize(32, 32)
    .toFile(path.join(__dirname, "..", "public", "favicon.ico"));
  console.log("Generated favicon.ico");
}

generateIcons()
  .then(() => console.log("All icons generated successfully"))
  .catch((err) => console.error("Error generating icons:", err));
