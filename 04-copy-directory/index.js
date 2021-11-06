import { readdir} from 'fs/promises';
import { mkdir } from 'fs';
import { copyFile,  } from 'fs';
import { unlink } from 'fs';

async function copyDir() {
  try {
    mkdir('04-copy-directory/files-copy', {recursive: true}, callback);

    const filesDelete = await readdir('04-copy-directory/files-copy');

    for (const file of filesDelete) {
      unlink(`04-copy-directory/files-copy/${file}`, (err) => {
        if (err) throw err;
      });
    }

    const files = await readdir('04-copy-directory/files');

    for await (const file of files) {
      copyFile(`04-copy-directory/files/${file}`, `04-copy-directory/files-copy/${file}`, callback);
    }
  } catch (err) {
    console.error(err);
  }
}

function callback(err) {
  if (err) throw err;
}

copyDir();