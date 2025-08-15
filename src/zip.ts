import { join } from "path";
import { zip } from 'zip-a-folder';

function createZip2(path: string, dist: string, toZip: string) {
  return zip(join(path, dist), toZip)
}

export { createZip2 };

