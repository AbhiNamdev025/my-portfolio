const app = require('./src/app');
const { port } = require('./src/config/env');

const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Please stop the other process or use a different PORT.`);
    return;
  }

  console.error('Server failed to start:', error.message);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error.message);
});

process.on('unhandledRejection', (reason) => {
  const message = reason instanceof Error ? reason.message : String(reason);
  console.error('Unhandled rejection:', message);
});
