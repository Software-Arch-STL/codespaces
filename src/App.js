// Simple Express application to demonstrate port forwarding in Codespaces
const express = require('express');
const app = express();
const port = 3000;

// Basic route to display environment info
app.get('/', (req, res) => {
  const environmentInfo = {
    teamName: process.env.TEAM_NAME || 'Not set',
    myName: process.env.MY_NAME || 'Not set',
    nodeVersion: process.version,
    hostname: require('os').hostname(),
    platform: process.platform,
    workingDirectory: process.cwd()
  };

  // Generate HTML response
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Codespaces Virtualization Demo</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        h1 { color: #0366d6; }
        .container { border: 1px solid #e1e4e8; border-radius: 6px; padding: 20px; }
        .info-item { margin-bottom: 10px; }
        .label { font-weight: bold; }
        .value { font-family: monospace; }
      </style>
    </head>
    <body>
      <h1>Virtualization in Action: Codespaces Environment</h1>
      <div class="container">
        <p>This simple web app is running inside your virtualized GitHub Codespace.</p>
        
        <h2>Environment Information:</h2>
        ${Object.entries(environmentInfo).map(([key, value]) => `
          <div class="info-item">
            <span class="label">${key}:</span>
            <span class="value">${value}</span>
          </div>
        `).join('')}
        
        <h2>How Virtualization Makes This Possible:</h2>
        <ul>
          <li>This app is running inside a container on a VM in the cloud</li>
          <li>Port forwarding makes the app accessible to your browser</li>
          <li>Environment variables defined in devcontainer.json are available to the app</li>
          <li>The filesystem shows your repository in /workspaces</li>
        </ul>
      </div>
    </body>
    </html>
  `;

  res.send(html);
});

// Start the server
app.listen(port, () => {
  console.log(`Demo app running at http://localhost:${port}`);
  console.log('In Codespaces, this port will be automatically forwarded to your browser.');
  console.log('Look for the "Open in Browser" button in the ports tab or notification.');
});
