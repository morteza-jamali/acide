import { ExecutorContext } from '@nrwl/devkit';
import build from 'next/dist/build';
import { PHASE_PRODUCTION_BUILD } from 'next/dist/next-server/lib/constants';
import { join, resolve } from 'path';
import { copySync, mkdir } from 'fs-extra';
import { prepareConfig } from '@nrwl/next/src/utils/config';
import { NextBuildBuilderOptions } from '@nrwl/next/src/utils/types';
import { createPackageJson } from '@nrwl/next/src/executors/build/lib/create-package-json';
import { createNextConfigFile } from '@nrwl/next/src/executors/build/lib/create-next-config-file';
import { directoryExists } from '@nrwl/workspace/src/utilities/fileutils';

try {
  require('dotenv').config();
} catch (e) {}

export default async function buildExecutor(
  options: NextBuildBuilderOptions,
  context: ExecutorContext
) {
  const root = resolve(context.root, options.root);

  const config = await prepareConfig(PHASE_PRODUCTION_BUILD, options, context);

  await build(root, config as any);

  if (!directoryExists(options.outputPath)) {
    mkdir(options.outputPath);
  }

  createPackageJson(options, context);
  createNextConfigFile(options, context);

  copySync(join(root, 'public'), join(options.outputPath, 'public'));

  return { success: true };
}
