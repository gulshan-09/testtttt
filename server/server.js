require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react']
});

const express = require('express');
// const cors = require('cors');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const { StaticRouter } = require('react-router-dom/server');
const path = require('path');
const fs = require('fs').promises;

// Use absolute path to load the App component
const App = require(path.join(__dirname, '..', 'src', 'App')).default;
const metadata = require('./metadata');

const app = express();

// Configure CORS
// app.use(cors({
//   origin: 'https://zoro.streamixz.com/'
// }));

// Middleware to serve static files
app.use('/static', express.static(path.join(__dirname, 'public')));

// Route to handle SSR
app.get('*', async (req, res) => {
  const context = {};
  const route = req.url;
  let meta = {};

  // Try to read index.html from local file system
  let indexFile;
  try {
    indexFile = await fs.readFile(path.join(__dirname, '..', '/build/index.html'), 'utf8');
    console.log('index.html loaded successfully'); // Debugging
  } catch (error) {
    console.error('Error reading index.html:', error);
    return res.status(500).send('Internal Server Error');
  }

  // Determine metadata based on the route
  Object.keys(metadata).forEach(key => {
    const match = new RegExp(`^${key.replace(/:[^\s/]+/, '([\\w-]+)')}$`).exec(route);
    if (match) {
      meta = typeof metadata[key] === 'function' ? metadata[key](match[1]) : metadata[key];
    }
  });

  // Create the HTML content for SSR
  const jsx = (
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );
  const appHTML = ReactDOMServer.renderToString(jsx);

  // Extract and update <head> content
  const headStart = indexFile.indexOf('<head>') + '<head>'.length;
  const headEnd = indexFile.indexOf('</head>');
  const headContent = indexFile.substring(headStart, headEnd);

  const newHeadContent = `
    <title>${meta.title || 'Default Title'}</title>
    <meta name="description" content="${meta.description || 'Default description'}" />
    <meta name="keywords" content="${meta.keywords || 'Default keywords'}" />
    <meta property="og:title" content="${meta.title || 'Default Title'}" />
    <meta property="og:description" content="${meta.description || 'Default description'}" />
    <link rel="canonical" href="${req.protocol}://${req.get('host')}${req.originalUrl}" />
  `;

  // Replace the head content in the HTML template
  const updatedHTML = indexFile.substring(0, headStart) + newHeadContent + indexFile.substring(headEnd);

  // Replace the root div with rendered app HTML
  const finalHTML = updatedHTML.replace('<div id="root"></div>', `<div id="root">${appHTML}</div>`);

  // Return the final HTML
  return res.send(finalHTML);
});

const PORT = process.env.PORT || 1111;
app.listen(PORT, () => {
  console.log(`SSR running on port ${PORT}`);
});
