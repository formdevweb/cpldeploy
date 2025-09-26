import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const assetsDir = 'F:/Projet_CPL_M2I/Version-Finale_M2I-Form/Dployment/CLubPongiste_Deploy_Render/src/assets';

async function optimizeImages() {
  try {
    const files = await fs.readdir(assetsDir);

    for (const file of files) {
      const filePath = path.join(assetsDir, file);
      const ext = path.extname(file).toLowerCase();
      const name = path.basename(file, ext);

      if (ext === '.jpg' || ext === '.jpeg' || ext === '.png') {
        const widths = [600, 1200, 1800]; // Define desired widths

        for (const width of widths) {
          const webpPath = path.join(assetsDir, `${name}-${width}w.webp`);
          console.log(`Converting ${file} to WebP with width ${width}...`);
          await sharp(filePath)
            .resize(width) // Resize to the specified width
            .webp({ quality: 80 }) // Adjust quality as needed
            .toFile(webpPath);
          console.log(`Converted ${file} to ${name}-${width}w.webp`);
        }
        // Also convert the original size to webp for cases where a specific width isn't matched
        const originalWebpPath = path.join(assetsDir, `${name}.webp`);
        console.log(`Converting ${file} to original size WebP...`);
        await sharp(filePath)
          .webp({ quality: 80 })
          .toFile(originalWebpPath);
        console.log(`Converted ${file} to ${name}.webp`);
      }
    }
    console.log('Image optimization complete.');
  } catch (error) {
    console.error('Error optimizing images:', error);
  }
}

optimizeImages();