import { basename, join } from 'path';
import { moveSync, readFileSync, readdirSync } from 'fs-extra';
import { output } from '@nrwl/cli/lib/output';
import { parse } from 'parse-gitignore';
import { sync as rimrafSync } from 'rimraf';
import * as micromatch from 'micromatch';

interface Options {
  fileReplacements?: { src: string; dest: string }[];
  clearDirectory?: { path: string; gitignore: string }[];
}

export default async (_options: Options): Promise<{ success: boolean }> => {
  let _error: Error;

  try {
    _options.clearDirectory?.forEach(({ path, gitignore }) => {
      const baseName: string = `/${basename(path)}`;

      micromatch(
        readdirSync(path).map((file) => `${baseName}/${file}`),
        parse(readFileSync(gitignore)).patterns
      ).map((file) => {
        file = join(path, file.replace(baseName, ''));

        rimrafSync(file);

        output.logSingleLine(`'${file}' removed`);
      });
    });

    _options.fileReplacements?.forEach(({ src, dest }) => {
      moveSync(src, dest, { overwrite: true });

      output.logSingleLine(`'${src}' moved to '${dest}'`);
    });

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
