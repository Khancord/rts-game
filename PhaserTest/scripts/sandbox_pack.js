// Pack assets so they can be imported using solely jsdelivr. 

const outputDir = '../dist/sandboxified'
const assetsDir = '../assets';

const fs = require("node:fs");
const path = require('node:path');
process.chdir(__dirname);

fs.mkdirSync(outputDir, { recursive: true });
if (fs.existsSync(outputDir)) {
    fs.readdirSync(outputDir).forEach(file => {
        const filePath = path.join(outputDir, file);
        fs.unlinkSync(filePath);
    });
}

console.log("Exporting assets")
fs.readdir(assetsDir, (err, files) => {
    files.forEach(fileName => {
        const filePath = path.join(assetsDir, fileName);

        const fileBuffer = fs.readFileSync(filePath);
        const base64String = fileBuffer.toString('base64');

        const outputFile = path.join(outputDir, fileName + '.js');
        const outputContent = `window["${fileName}"] = "${base64String}";`

        fs.writeFileSync(outputFile, outputContent);
        console.log(`Exported ${fileName}`);
    });
});
console.log("Finished exporting assets")

console.log("Exporting data URLs")

// Pack any used data URLs here - TODO consider moving to file in assets folder
const dataURLMap = {
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABAQMAAADD8p2OAAAAA1BMVEX/AP804Oa6AAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==': '__DEFAULT.png',
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABAQMAAADD8p2OAAAAA1BMVEX/AP804Oa6AAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==": "magenta-rectangle.png",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAIAAAD8GO2jAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJ9JREFUeNq01ssOwyAMRFG46v//Mt1ESmgh+DFmE2GPOBARKb2NVjo+17PXLD8a1+pl5+A+wSgFygymWYHBb0FtsKhJDdZlncG2IzJ4ayoMDv20wTmSMzClEgbWYNTAkQ0Z+OJ+A/eWnAaR9+oxCF4Os0H8htsMUp+pwcgBBiMNnAwF8GqIgL2hAzaGFFgZauDPKABmowZ4GL369/0rwACp2yA/ttmvsQAAAABJRU5ErkJggg==": "line-green-square.png",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgAQMAAABJtOi3AAAAA1BMVEX///+nxBvIAAAAAXRSTlMAQObYZgAAABVJREFUeF7NwIEAAAAAgKD9qdeocAMAoAABm3DkcAAAAABJRU5ErkJggg==": "white-square.png",
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABdJREFUeNpi/P//PwMMMDEgAdwcgAADAJZuAwXJYZOzAAAAAElFTkSuQmCC': '__WHITE.png',
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAABAQMAAADD8p2OAAAAA1BMVEX//wCKxvRF+SAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==': '__BLEND_YELLOW.png',
};

// Extract and save each image
Object.entries(dataURLMap).forEach(([base64Data, filename]) => {
    try {
        // Decode base64 to binary data
        const binaryData = Buffer.from(base64Data, 'base64');

        // For the asset packager example, also create the direct JS file if needed
        const jsContent = `window["${filename}"] = "${base64Data}";`;
        fs.writeFileSync(path.join(outputDir, filename + '.js'), jsContent);

        console.log(`Exported ${filename}.js`);
    } catch (error) {
        console.error(`Error extracting ${filename}:`, error);
    }
});

console.log('Finished exporting data URLs');
