import json from "@rollup/plugin-json";
// import terser from '@rollup/plugin-terser';
import commonjs from "@rollup/plugin-commonjs";
// import del from 'rollup-plugin-delete'
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "es",
    },
  ],
  plugins: [
    resolve(),
    commonjs(),
    json(),
    typescript({
      tsconfig: "./tsconfig.build.json",
      outDir: "dist",
    }),
  ],
};