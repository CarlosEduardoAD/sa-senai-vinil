import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";
import tailwindConfig from "./src/css/tailwind.config.js";

const postcss_import = require('postcss-import')

export default {
  plugins: [tailwind(tailwindConfig), autoprefixer, postcss_import]
};
