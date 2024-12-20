#!/bin/sh

if [ -z "$1" ]; then
  echo "Error : No scenario given as argument"
  exit 1
fi

# Reset bundle
echo "" > build/bundle.js

# Build playbook
echo "window.playbook=\`" >> build/bundle.js
var=$(cat scenarios/$1/playbook.txt)
echo "$var" >> build/bundle.js
echo "\`" >> build/bundle.js

# Build core.js
echo "" >> build/bundle.js
cat src/core.js >> build/bundle.js
echo "" >> build/bundle.js

## Build run
#echo "" >> build/bundle.js
#cat src/run.js >> build/bundle.js
#echo "" >> build/bundle.js