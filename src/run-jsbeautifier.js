var beautify = require("../lib/beautify");
var nopt = require("nopt");
var fs = require("fs");

var opt = {outfile: Boolean};
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
            console.error(err);
        } else {
            // Fix UTF8 with BOM
            if (0xEF === data[0] && 0xBB === data[1] && 0xBF === data[2]) {
                data = data.slice(3);
            }

            data = data.toString("utf8");

            switch (ft[ft.length -1]) {
                case "js": 
                    beauty = beautify.js_beautify;
                    break;
                case "css":
                    beauty = beautify.css_beautify;
                    break;
                case "html":
                    beauty = beautify.html_beautify;
                    break;
                default:
                    die("invalid file format");
            }
            if (parsed.outfile) {
                fs.writeFile(ft[0] + ".b." + ft[ft.length - 1], beauty(data), function (err) {
                    if (err)
                        console.error(err);
                });
            } else {
                console.log(beauty(data));
            }
        }
    });
}

if (!parsed.argv.remain.length) {
    die("No files specified.");
}

parsed.argv.remain.forEach(beautifyFile);
