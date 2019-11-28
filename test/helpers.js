const yargs = require('yargs');
const fs = require('fs-extra');
const path = require('path');
const os = require('os');

global.TMP_DIR = os.tmpdir();

let directories = ['models', 'controllers'];

global.runCommand = (command, cmdFile) => {
    return new Promise(resolve => {
        const parser = yargs.command(cmdFile);
        parser.parse(`${command}`, (err, argv, output) => {
            resolve(output);
        });
    });
}

global.clearDirectories = async () => {
    directories.forEach(async dir => {
        await fs.remove(path.join(TMP_DIR, dir)).then(res => {});
    });
}

global.dirExists = (path) => {
    try {
        return fs.statSync(path).isDirectory();
    } catch(err) {
        return false;
    }
}

global.fileExists = (path) => {
    try {
        return fs.statSync(path).isFile();
    } catch(err) {
        return false;
    }
}