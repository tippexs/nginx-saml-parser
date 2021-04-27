#!/usr/bin/env bash

echo "🛠 Building ... "

docker build -t tippexs/ngxsamlp:latest .

echo "🧩 Linking ... "

ID=$(docker create tippexs/ngxsamlp:latest)
echo $ID
echo "💫 Copying files ... "
docker cp $ID:/tmp/xmldom.js $(pwd)/build/xmldom.js
docker cp $ID:/tmp/xpath.js $(pwd)/build/xpath.js

echo "🧻 Cleaning up..."
docker rm -v $ID