const connect = require('connect');
const serveStatic = require('serve-static');

connect()
  .use(serveStatic(__dirname))
  .listen(3000, () => {
    if (!process.send) process.send('online');
    console.log('Server is running on 3000...');
  });
