import * as fs from 'fs';
import {readdir} from "fs/promises";
import {copyFile, mkdir} from "fs";
import path from "path";

let componentsArray = [];

mkdir('06-build-page/project-dist', { recursive: true }, callback);
fs.writeFile(path.join('06-build-page/project-dist', 'index.html'), '', callback);

try {
  const files = await readdir('06-build-page/components', {withFileTypes: true});

  for (const file of files) {
    const component = await fs.promises.readFile(`06-build-page/components/${file.name}`)
    componentsArray.push(component)
  }
} catch (err) {
  console.error(err);
}

fs.readFile('06-build-page/template.html',  function(err, data) {
  if(err) throw err;
  const template = data.toString();
  const array = data.toString().split("\n");
  const components = template.match(/(?<={{).+(?=}})/g).sort();

  let result = array.map(item => {
    if (item.trim() === `{{${components[0]}}}`) {
      return componentsArray[0].toString()
    } else if (item.trim() === `{{${components[1]}}}`) {
      return componentsArray[1].toString()
    } else if (item.trim() === `{{${components[2]}}}`) {
      return componentsArray[2].toString()
    } else if (item.trim() === `{{${components[3]}}}`) {
      return componentsArray[3].toString()
    } else {
      return item;
    }
  })

  fs.appendFile(
    path.join('06-build-page/project-dist', 'index.html'),
    result.join('\n'),
    err => {
      if (err) throw err;
    }
  );
});

try {
  const files = await readdir('06-build-page/styles', {withFileTypes: true});
  fs.writeFile(path.join('06-build-page/project-dist', 'style.css'), '', callback);

  for (const file of files) {
    if (file.isFile() && path.extname(file.name) === '.css') {
      fs.readFile(`06-build-page/styles/${file.name}`, function(err, data) {
        if(err) throw err;
        const array = data.toString().split("\n");
        fs.appendFile(
          path.join('06-build-page/project-dist', 'style.css'),
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

async function copyDir() {
  try {
    mkdir('06-build-page/project-dist/assets', { recursive: true }, callback);
    const dirs = await readdir('06-build-page/assets');

    for await (const dir of dirs) {
      mkdir(`06-build-page/project-dist/assets/${dir}`, { recursive: true }, callback)

      const files = await readdir(`06-build-page/assets/${dir}`);

      for await (const file of files) {
        copyFile(`06-build-page/assets/${dir}/${file}`, `06-build-page/project-dist/assets/${dir}/${file}`, callback);
      }
    }
  } catch (err) {
    console.error(err);
  }

  function callback(err) {
    if (err) throw err;
  }
}

copyDir()

function callback(err) {
  if (err) throw err;
}





