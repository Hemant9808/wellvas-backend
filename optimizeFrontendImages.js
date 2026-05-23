const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// Relative path to frontend ResourseImages folder
const targetFolder = path.join(__dirname, "..", "charak", "public", "ResourseImages");

const optimizeImages = async () => {
  console.log(`Starting image optimization inside: ${targetFolder}\n`);

  if (!fs.existsSync(targetFolder)) {
    console.error("Target folder does not exist! Please check path.");
    return;
  }

  const files = fs.readdirSync(targetFolder);
  let totalSavings = 0;

  for (const file of files) {
    const filePath = path.join(targetFolder, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) continue;

    const ext = path.extname(file).toLowerCase();
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") continue;

    const originalSizeKB = stat.size / 1024;
    const tempOutputPath = path.join(targetFolder, `temp_${file}`);

    try {
      let pipeline = sharp(filePath);

      if (ext === ".png") {
        pipeline = pipeline.png({ quality: 80, compressionLevel: 8 });
      } else {
        pipeline = pipeline.jpeg({ quality: 80, progressive: true });
      }

      await pipeline.toFile(tempOutputPath);

      const optimizedStat = fs.statSync(tempOutputPath);
      const optimizedSizeKB = optimizedStat.size / 1024;

      if (optimizedSizeKB < originalSizeKB) {
        // Replace original with optimized
        fs.unlinkSync(filePath);
        fs.renameSync(tempOutputPath, filePath);

        const savings = originalSizeKB - optimizedSizeKB;
        totalSavings += savings;

        console.log(`✅ Optimized: ${file}`);
        console.log(`   Before: ${originalSizeKB.toFixed(1)} KB`);
        console.log(`   After:  ${optimizedSizeKB.toFixed(1)} KB (-${((savings / originalSizeKB) * 100).toFixed(0)}%)`);
      } else {
        // Optimized was somehow larger, delete temporary
        fs.unlinkSync(tempOutputPath);
        console.log(`ℹ️ Skipped: ${file} (already fully optimized)`);
      }
    } catch (err) {
      console.error(`❌ Error optimizing ${file}:`, err.message);
      if (fs.existsSync(tempOutputPath)) fs.unlinkSync(tempOutputPath);
    }
  }

  console.log(`\n🎉 Optimization completed!`);
  console.log(`💾 Total Disk/Network Space Saved: ${(totalSavings / 1024).toFixed(2)} MB\n`);
};

optimizeImages();
