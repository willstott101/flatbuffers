
function flatc(inputs, options) {

    // Directories
    var args = [
        "-o out/",
        "-I includes/",
    ];
    // Module.callMain(args);
}

flatc.getVersion = function () {
    let stdout = [];
    let print = Module['print'];
    Module['print'] = stdout.push.bind(stdout);
    Module.callMain(["--version"]);
    Module['print'] = print;
    return stdout.join('\n');
};
