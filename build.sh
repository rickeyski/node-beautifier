#!/bin/bash - 
#===============================================================================
#
#         USAGE:  ./build.sh 
# 
#   DESCRIPTION:  Compile source file into the actual node module
# 
#        AUTHOR: Rickey Visinski 
#      REVISION:  0.0.2
#===============================================================================

set -o nounset                              # Treat unset variables as an error

BIN=bin/beautifier.js
LIB=lib/beautify.js

echo '#!/usr/bin/env node' > $BIN

# I use the closure compiler, this is the quick and dirty check if you build from source
if [[ $(which closure) ]] ; then
    closure --compilation_level SIMPLE_OPTIMIZATIONS --js src/beautify*.js --js_output_file $LIB || exit 1
    closure --compilation_level SIMPLE_OPTIMIZATIONS --js src/run-jsbeautifier.js >> $BIN || exit 1
else
    cat src/beautify*.js > $LIB
    cat src/run-jsbeautify.js >> $BIN
fi

chmod +x $BIN
