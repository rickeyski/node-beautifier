var beautify = require("../lib/beautify");
var nopt = require("nopt");
var fs = require("fs");

var parsed = nopt();

function die(why) {
    'use strict';
    console.warn(why);
    console.warn("Usage: " + process.argv[1] + " file.{js,css,html} ...");
    process.exit(1);
}

function beautifyFile(file) {
    'use strict';
    var ft = file.split('.'), beautify;

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
                beautify = beautify.js_beautify;
                break;
            case "css":
                beautify = beautify.css_beautify;
                break;
            case "html":
                beautify = beautify.html_beautify;
                break;
            default:
                die("invalid file format");
        }
        console.log(beautify(data));
    });
}

if (!parsed.argv.remain.length) {
    die("No files specified.");
}

parsed.argv.remain.forEach(beautifyFile);
