#!/usr/bin/env bash

echo "๐  Building ... "

docker build -t tippexs/ngxsamlp:latest .

echo "๐งฉ Linking ... "

ID=$(docker create tippexs/ngxsamlp:latest)
echo $ID
echo "๐ซ Copying files ... "
docker cp $ID:/tmp/xmldom.js $(pwd)/build/xmldom.js
docker cp $ID:/tmp/xpath.js $(pwd)/build/xpath.js

echo "๐งป Cleaning up..."
docker rm -v $ID