import path from 'path';
import fs from 'fs-extra';
import glob from 'glob';
import { promisify } from 'util';
// import { exec } from 'child_process';
import kebabCase from 'kebab-case';
import { replaceInFile } from 'replace-in-file';

import logger from '@app-scripts/lib/logger';

const rootJsonPkg = path.join(process.cwd(), 'package.json');

(async () => {
  try {
    const pkg = await fs.readJSON(rootJsonPkg);
    if (!pkg.bootstraped) {
      logger.info(
        'first install, boostraping packages replacing packages name ...',
      );
      const promises = [];
      const packagesPath = await promisify(glob)(
        `${process.cwd()}/packages/**/package.json`,
      );
      const dirName = process.cwd().split('/').pop();

      promises.push(
        Promise.all(
          packagesPath.map(async (packagePath) => {
            const packageJsonFile = await fs.readJSON(packagePath);

            // @todo Ugly stuff find something else
            await fs.writeJSON(
              packagePath,
              JSON.parse(
                JSON.stringify(packageJsonFile).replace(
                  new RegExp(`@${pkg.name}`, 'g'),
                  `@${dirName}`,
                ),
              ),
              {
                spaces: 2,
              },
            );
          }),
        ),
      );
      promises.push(
        fs.writeJSON(
          rootJsonPkg,
          {
            ...pkg,
            name: kebabCase(dirName),
            bootstraped: true,
          },
          {
            spaces: 2,
          },
        ),
      );

      promises.push(
        replaceInFile({
          files: `${process.cwd()}/packages/**/src/**/*.ts`,
          from: new RegExp(`@${pkg.name}`, 'g'),
          to: `@${dirName}`,
        }),
        replaceInFile({
          files: `${process.cwd()}/packages/web/src/**/*.tsx`,
          from: new RegExp(`@${pkg.name}`, 'g'),
          to: `@${dirName}`,
        }),
      );

      await Promise.all(promises);
      logger.info('monorepo bootstraped');
    }
    // await fs.unlink(path.join(process.cwd(), '.git'));

    // await promisify(exec)('git init');
    // await promisify(exec)('git add -A');
    // await promisify(exec)('git commit -m "chore: initial commit"');
  } catch (err) {
    logger.error('something fail while bootstraping');
  }
})();
