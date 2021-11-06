import { stat } from 'fs';
import { readdir } from 'fs/promises';
import * as path from 'path';

try {
  const files = await readdir('03-files-in-folder/secret-folder', {withFileTypes: true});

  for (const file of files) {
    if (file.isFile()) {
      stat(`03-files-in-folder/secret-folder/${file.name}`, (err, stats) => {
        let a = path.parse(file.name).name;
        let b = path.extname(file.name).substring(1);
        let c = (stats.size / 1024).toFixed(3);
        console.log(a + ' - ' + b + ' - ' + c + 'kb')
      })
    }
  }
} catch (err) {
  console.error(err);
}