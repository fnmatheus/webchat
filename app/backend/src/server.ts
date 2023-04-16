// import { App } from './app';
// new App().start(3001);

import { serverHttp } from './app';
import './websocket';

serverHttp.listen(3001, () => {
  console.log('Running on port 3001')
});
