import { seedAll } from './core/seeds/seed-all';
import { devConfig } from './config';

seedAll(devConfig).catch((error: any) => {
  console.log(error);
  process.exit(1);
});
