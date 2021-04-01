const mix = require("laravel-mix");

mix
  .ts("resources/ts/app.tsx", "public/js")
  .react()
  .postCss("resources/css/app.css", "public/css", []);
