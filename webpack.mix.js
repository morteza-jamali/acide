const mix = require("laravel-mix");

mix
  .js("resources/js/app.js", "public/js")
  .react()
  .postCss("resources/css/app.css", "public/css", [])
  .webpackConfig({
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ["*", ".js", ".jsx", ".vue", ".ts", ".tsx"],
    },
  });
