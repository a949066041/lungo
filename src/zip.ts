/*
 * @Author: Rikka
 * @Date: 2022-05-11 14:11:53
 * @LastEditTime: 2022-05-11 15:43:47
 * @LastEditors: Rikka
 * @Description:
 * @FilePath: \faw-operate-plateform-workspace\apps\tools\upload\src\zip.ts
 */
import { join } from "path";
import { zip } from 'zip-a-folder';

function createZip2(path: string, dist: string, toZip: string) {
  return zip(join(path, dist), toZip)
}

export { createZip2 };

