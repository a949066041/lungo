/*
 * @Author: Rikka
 * @Date: 2022-05-11 12:12:38
 * @LastEditTime: 2022-05-11 17:01:28
 * @LastEditors: Rikka
 * @Description:
 * @FilePath: \faw-operate-plateform-workspace\apps\tools\upload\src\ftp.ts
 */
import { createReadStream, rmSync } from "fs";
import { resolve } from "path";
import { Observable } from "rxjs";
import { Client } from "ssh2";

import { Config, Config2 } from "./config/config.interface";
import { createZip2 } from "./zip";

const sftp$ = (
  config: Config | Config2,
  conn: Client,
  projectDir: string,
  dist: string
) =>
  new Observable<{ command: string; del: string }>((observe) => {
    conn.sftp(async (err, sftp) => {
      if (err) throw err;
      const zipFileName = `${config.project}-5p2O5qKT6JCM.zip`;
      const fullFileName = `${config.serverDir}/${zipFileName}`;
      const command = `unzip ${fullFileName} -d ${config.serverDir}/${config.project}`;
      const writeStream = sftp.createWriteStream(fullFileName);
      const zipPath = resolve(process.cwd(), "dist.zip");

      writeStream.on("close", () => {
        observe.next({ command, del: `rm -r ${fullFileName}` });
        observe.complete();
        rmSync(zipPath);
      });
      writeStream.on("end", () => {
        observe.next({ command, del: `rm -r ${fullFileName}` });
        observe.complete();
        rmSync(zipPath);
      });
      await createZip2(projectDir, dist, zipPath)
      const readStream = createReadStream(zipPath);
      readStream.pipe(writeStream);
    });
  });
export { sftp$ };
