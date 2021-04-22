import { renameSync } from 'fs';
import { output } from '@nrwl/cli/lib/output';

interface Options {
  outputPath?: string;
  fileReplacements?: { src: string; dest: string }[];
}

export default async (_options: Options): Promise<{ success: boolean }> => {
  let _error: Error;

  try {
    _options.fileReplacements?.forEach(({ src, dest }) =>
      renameSync(src, dest)
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
