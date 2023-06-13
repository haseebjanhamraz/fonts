const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

const fontsDirectory = path.join(__dirname, 'fonts');

// Serve static files from the "fonts" directory
app.use(express.static(fontsDirectory));

// Read font files from the directory
function getFontFiles() {
  return fs.readdirSync(fontsDirectory);
}

// Display the headings with the respective font styles
app.get('/', (req, res) => {
  const fontFiles = getFontFiles();

  let fontRules = ''; // Store all font rules in a single variable

  fontFiles.forEach((filename) => {
    const fontName = path.basename(filename, path.extname(filename));

    // Generate the CSS rule for the font
    const fontRule = `
      @font-face {
        font-family: '${fontName}';
        src: url('/${filename}') format('truetype');
      }
    `;

    fontRules += fontRule; // Append each font rule to the variable
  });

  let headings = '';
  fontFiles.forEach((filename) => {
    const fontName = path.basename(filename, path.extname(filename));

    headings += `<h1 style="font-family: '${fontName}';">${fontName}</h1>`;
  });

  const html = `
    <html>
      <head>
        <style>
          ${fontRules} // Include all font rules in the style tag
        </style>
      </head>
      <body>
        ${headings}
      </body>
    </html>
  `;

  res.send(html);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
