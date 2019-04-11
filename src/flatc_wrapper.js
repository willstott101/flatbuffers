
flatc = {};

flatc._lines = [];
Module['print'] = function (msg) {
    flatc._lines.push(msg);
};

flatc.getLines = function (lines) {
    if (lines)
        return flatc._lines.splice(0, flatc._lines.length, ...lines);
    return flatc._lines.splice(0, flatc._lines.length);
};

flatc.getVersion = function () {
    let lines = flatc.getLines();
    Module.callMain(["--version"]);
    return flatc.getLines(lines).join('\n');
};

flatc.ALLOWED_GEN_TARGETS = [
  'binary',
  'json',
  'cpp',
  'go',
  'java',
  'js',
  'dart',
  'ts',
  'csharp',
  'python',
  'lobster',
  'lua',
  'rust',
  'php',
  // 'jsonschema',
];


flatc.generate = function (options) {
    FS.mkdir("out");
    var args = [];

    for (let target in options.targets) {
        if (flatc.ALLOWED_GEN_TARGETS.indexOf(target) === -1)
            throw "Unkown target specified: " + target;
        args.push('--' + target);
    }

    if (!args.length) {
        throw "No target specified...";
    }

    if (options.includes) {
        FS.mkdir("includes");
        args.push("-I includes/");

        for (let fileName of options.includes) {
            FS.writeFile('includes/' + fileName, options.includes[fileName]);
        }
    }

    for (let fileName of options.protocols) {
        FS.writeFile(fileName, options.protocols[fileName]);
    }

    args.push("-o out/");
    Module.callMain(args);
    console.log('out folder readdir', FS.readdir("out"));
};
