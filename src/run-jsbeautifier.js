var beautify = require("../lib/beautify");
var nopt = require("nopt");
var fs = require("fs");

var parsed = nopt();

function die(why) {
    'use strict';
    console.warn(why);
    console.warn("Usage: " + process.argv[1] + " <scriptfile>{js,css,html}...");
    process.exit(1);
}

function lintFile(file) {
    'use strict';
    var ft = file.split('.'), lint;

    fs.readFile(file, function (err, data) {
        if (err) {
            throw err;
        }

        // Fix UTF8 with BOM
        if (0xEF === data[0] && 0xBB === data[1] && 0xBF === data[2]) {
            data = data.slice(3);
        }

        data = data.toString("utf8");

        switch (ft[ft.length -1]) {
            case "js": 
                lint = beautify.js_beautify;
                break;
            case "css":
                lint = beautify.css_beautify;
                break;
            case "html":
                lint = beautify.html_beautify;
                break;
            default:
                die("invalid file format");
        }
        console.log(lint(data));
    });
}

if (!parsed.argv.remain.length) {
    die("No files specified.");
}

parsed.argv.remain.forEach(lintFile);
