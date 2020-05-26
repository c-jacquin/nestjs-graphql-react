import fs from 'fs';
import { promisify } from 'util';
import path from 'path';
import glob from 'glob';

import logger from './lib/logger';

const BLACKLIST = ['common'];

(async () => {
  const [packages, envFiles] = await Promise.all([
    promisify(glob)('./packages/*'),
    promisify(glob)('./scripts/env/*.env'),
  ]);
  const availableEnv = envFiles.map(
    envPath =>
      envPath
        .split('/')
        .pop()
        .split('.')[0],
  );

  try {
    await Promise.all(
      packages
        .filter(packagePath =>
          availableEnv.includes(packagePath.split('/').pop()),
        )
        .map(packagePath => packagePath.split('/').pop())
        .filter(packageName => !BLACKLIST.includes(packageName))
        .map(packageName => ({
          packagePath: path.resolve(
            __dirname,
            '..',
            'packages',
            packageName,
            '.env.local',
          ),
          packageName,
        }))
        .map(async ({ packageName, packagePath }) => {
          if (!(await promisify(fs.exists)(packagePath))) {
            await promisify(fs.copyFile)(
              path.join(__dirname, 'env', `${packageName}.env`),
              packagePath,
            );
            logger.info(`${packageName}.env created in ${packagePath}`);
          }
        }),
    );
  } catch (err) {
    logger.error('Something fail while creating .local.env files');
    logger.error(err.name, err.message);
  }
})();
