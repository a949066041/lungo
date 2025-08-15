/*
 * @Author: Rikka
 * @Date: 2022-05-07 17:12:35
 * @LastEditTime: 2022-05-11 11:30:00
 * @LastEditors: Rikka
 * @Description:
 * @FilePath: \faw-operate-plateform-workspace\apps\tools\upload\rollup.config.js
 */
import typescript from "rollup-plugin-typescript2";
import terser from '@rollup/plugin-terser';
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import replace from "@rollup/plugin-replace";
import { resolve } from "path";
import { rmdirSync } from "fs";


function rollupBuildUtil() {
  return {
    name: "build-util",
    buildStart() {
      rmdirSync(resolve(process.cwd(), "dist"), { recursive: true });
    }
  };
}
const plugins = [
  rollupBuildUtil(),
  nodeResolve({
    preferBuiltins: true,
    exportConditions: ["node"],
    moduleDirectories: ["node_modules"],
    resolveOnly: (module) => !module.includes("ssh2")
  }),
  commonjs(),
  typescript(),
  json(),
  replace({
    "require('node:": "require('"
  }),
  terser(),
  // hashbang.default()
];

const config = [
  {
    input: "src/bin.ts",
    output: {
      format: "cjs",
      banner: "#!/usr/bin/env node",
      file: "./dist/bin.js",
    },
    plugins
  }
];

export default config;
