import { moveSync, readFileSync } from 'fs-extra';
import { output } from '@nrwl/cli/lib/output';
import { parse } from 'parse-gitignore';
import { sync as globSync } from 'glob-gitignore';
import { sync as rimrafSync } from 'rimraf';

interface Options {
  outputPath?: string;
  fileReplacements?: { src: string; dest: string }[];
  clearDirectory?: { path: string; gitignore: string }[];
}

export default async (_options: Options): Promise<{ success: boolean }> => {
  let _error: Error;

  try {
    _options.clearDirectory?.forEach(({ path, gitignore }) => {
      rimrafSync(
        globSync(`${path}/**`, {
          ignore: parse(readFileSync(gitignore)).patterns,
        }) as any
      );
    });

    _options.fileReplacements?.forEach(({ src, dest }) =>
      moveSync(src, dest, { overwrite: true })
    );

    output.success({ title: 'fix-build task executed successfully !' });
  } catch (error) {
    _error = error;

    output.error({
      title: 'fix-build error',
      bodyLines: [error.message],
    });
  }

  return new Promise<{ success: boolean }>((res) => {
    res({ success: !_error });
  });
};
