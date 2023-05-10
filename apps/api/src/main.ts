import { devConfig } from './config';
import { bootstrap } from './bootstrap';

bootstrap(devConfig).catch((error) => {
  console.log('error', error);
  process.exit(1);
});
