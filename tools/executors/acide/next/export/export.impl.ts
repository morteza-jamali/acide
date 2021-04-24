import {
  ExecutorContext,
  parseTargetString,
  readTargetOptions,
  runExecutor,
} from '@nrwl/devkit';
import exportApp from 'next/dist/export';
import fixBuildExecutor from '../../fix-build/fix-build.impl';
import { PHASE_EXPORT } from 'next/dist/next-server/lib/constants';
import { resolve } from 'path';
import { prepareConfig } from '@nrwl/next/src/utils/config';
import {
  NextBuildBuilderOptions,
  NextExportBuilderOptions,
} from '@nrwl/next/src/utils/types';

interface Options extends NextExportBuilderOptions {
  outputPath?: string;
}

try {
  require('dotenv').config();
} catch (e) {}

export default async function exportExecutor(
  options: Options,
  context: ExecutorContext
) {
  const buildTarget = parseTargetString(options.buildTarget);
  const build = await runExecutor(buildTarget, {}, context);

  for await (const result of build) {
    if (!result.success) {
      return result;
    }
  }

  const buildOptions = readTargetOptions<NextBuildBuilderOptions>(
    buildTarget,
    context
  );
  const root = resolve(context.root, buildOptions.root);
  const config = await prepareConfig(PHASE_EXPORT, buildOptions, context);

  await exportApp(
    root,
    {
      statusMessage: 'Exporting',
      silent: options.silent,
      threads: options.threads,
      outdir: `${buildOptions.outputPath}/exported`,
    } as any,
    config
  );

  return options.outputPath
    ? await fixBuildExecutor({
        fileReplacements: [
          {
            src: `${buildOptions.outputPath}/exported`,
            dest: options.outputPath,
          },
        ],
      })
    : { success: true };
}
