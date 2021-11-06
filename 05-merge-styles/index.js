import { readdir } from 'fs/promises';
import * as path from 'path';
import * as fs from 'fs';

try {
  const files = await readdir('05-merge-styles/styles', {withFileTypes: true});
  fs.writeFile(path.join('05-merge-styles/project-dist', 'bundle.css'), '', err => {if (err) throw err});

  for (const file of files) {
    if (file.isFile() && path.extname(file.name) === '.css') {
      fs.readFile(`05-merge-styles/styles/${file.name}`, function(err, data) {
        if(err) throw err;
        const array = data.toString().split("\n");
        fs.appendFile(
          path.join('05-merge-styles/project-dist', 'bundle.css'),
          array.join('\n'),
          err => {
            if (err) throw err;
          }
        );
      });
    }
  }
} catch (err) {
  console.error(err);
}