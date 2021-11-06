import { stdin as input, stdout as output } from 'process';
import * as fs from 'fs';
import * as path from 'path';

fs.writeFile(path.join('02-write-file', 'text.txt'), '', err => {if (err) throw err});

output.write('Hello\n');
input.on('data', data => {
  let str = data.toString();
  if (str.trim() === 'exit') {
    output.write('Good bye!');
    process.exit();
  } else {
    fs.appendFile(
      path.join('02-write-file', 'text.txt'),
      data,
      err => {
        if (err) throw err;
      }
    );
  }
});

process.on('SIGINT', () => {
  output.write('Good bye!');
  process.exit();
});


