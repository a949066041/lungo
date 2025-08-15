/*
 * @Author: Rikka
 * @Date: 2022-05-11 10:23:59
 * @LastEditTime: 2022-05-11 10:24:12
 * @LastEditors: Rikka
 * @Description:
 * @FilePath: \faw-operate-plateform-workspace\apps\tools\upload\src\config\config.interface.ts
 */

export interface ConfigCommon {
  serverDir: string;
  host: string;
  port: number;
  username: string;
  project: string;
  dist: string;
  timeout?: number;
  forward?: Forward;
}

export interface Config extends ConfigCommon {
  password: string;
}
export interface Config2 extends ConfigCommon {
  privateKey: string
}

interface Forward {
  host: string;
  port: number;
  username: string;
  password: string;
}
