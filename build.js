import fs from "fs"
import fse from "fs-extra"

import { execSync } from "child_process"

console.log('kosen-syllabus-kai builder')
if (fs.existsSync("dist")) {
    console.log("distディレクトリが存在するため、実行しません")
}
else {
    fs.mkdirSync('dist');
    fs.copyFileSync('index.html', 'dist/index.html');

    fs.mkdirSync('dist/courseDetail');
    fs.copyFileSync('courseDetail/index.html', 'dist/courseDetail/index.html');

    fs.mkdirSync('dist/teacher');
    fs.copyFileSync('teacher/index.html', 'dist/teacher/index.html');

    fs.mkdirSync('dist/browserStorage');
    fs.copyFileSync('browserStorage/index.html', 'dist/browserStorage/index.html');

    fs.mkdirSync('dist/setting');
    fs.copyFileSync('setting/index.html', 'dist/setting/index.html');

    fs.readdirSync('public').forEach((e, i) => {
        fs.copyFileSync(`public/${e}`, `dist/${e}`);
    })

    fse.copySync('src', 'dist/src')

    const stdout = execSync('npx tailwindcss -i src/index.css -o dist/src/index.css')
}
