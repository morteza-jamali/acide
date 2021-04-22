interface Options {
  outputPath: string;
  replaceFiles: { src: string; dest: string }[];
}

export default async function (
  _options: Options
): Promise<{ success: boolean }> {
  return new Promise<{ success: boolean }>((res) => {
    console.log(_options);

    res({ success: true });
  });
}
