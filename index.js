const { createCanvas, registerFont } = require('canvas');
const path = require('path');
const fs = require('fs');

function getAllFilenamesWithoutExtension(folderPath) {
  const items = fs.readdirSync(folderPath);
  const filenamesWithoutExtension = items.map(item => {
    const itemPath = path.join(folderPath, item);
    const parsedPath = path.parse(itemPath);
    return parsedPath.name;
  });
  return filenamesWithoutExtension;
}

const folderPath = 'fonts';
const filenames = getAllFilenamesWithoutExtension(folderPath);
for (let i = 0; i < filenames.length; i++) {
    const font = filenames[i];
    console.log(font);
}


const canvasWidth = 400;
const canvasHeight = 200;



// Register the font file
const fontPath = path.join(__dirname, 'fonts', 'SFCompact.ttf');
registerFont(fontPath, { family: 'SF Arabic' });

// Create a canvas and set its dimensions
const canvas = createCanvas(canvasWidth, canvasHeight);
const context = canvas.getContext('2d');

// Set the font style
const fontSize = 36;
context.font = `${fontSize}px 'SF Arabic'`;

// Set the text color and alignment
context.fillStyle = 'black';
context.textAlign = 'center';
context.textBaseline = 'middle';

// Set the text content
const text = 'یہ اردو فونٹس ہیں';

// Calculate the text position
const textX = canvasWidth / 2;
const textY = canvasHeight / 2;

// Draw the text on the canvas
context.fillText(text, textX, textY);

// Export the canvas as a PNG image
const imagePath = path.join(__dirname, 'output.png');
const out = fs.createWriteStream(imagePath);
const stream = canvas.createPNGStream();
stream.pipe(out);
out.on('finish', () => console.log('Image saved:', imagePath));