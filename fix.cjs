const fs = require('fs');
const path = require('path');

function replaceInFiles(dir, exts, replacers) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInFiles(fullPath, exts, replacers);
    } else if (exts.includes(path.extname(fullPath))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;
      for (const [search, replace] of replacers) {
        if (content.includes(search)) {
          content = content.split(search).join(replace);
          modified = true;
        }
      }
      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
      }
    }
  }
}

// Vue files
replaceInFiles('./src', ['.vue'], [
  ['src="/images/', 'src="images/'],
  ["src: '/images/", "src: 'images/"],
]);

// CSS files
replaceInFiles('./src/assets/css', ['.css'], [
  ['url("/images/', 'url("../images/'],
  ["url('/images/", "url('../images/"],
]);
