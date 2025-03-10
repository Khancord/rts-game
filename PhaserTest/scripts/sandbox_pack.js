// Pack assets so they can be imported using solely jsdelivr. 

const outputDir = '../dist/sandboxified'
const assetsDir = '../assets';

const fs = require("node:fs");
const path = require('node:path');
process.chdir(__dirname);

fs.mkdirSync(outputDir, { recursive: true });

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

console.log("Finished export")