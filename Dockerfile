FROM node:alpine
WORKDIR /tmp
RUN npm install xpath xmldom && \
    printf "export default {xp}\nfunction xp(){}\n\n" > nginxify.xpath.js && \
    echo "global.xpath = require('xpath');" | npx browserify -d -o browserify.xpath.js - && \
    cat nginxify.xpath.js browserify.xpath.js > xpath.js
RUN printf "export default {xd}\nfunction xd(){}\n\n" > nginxify.xmldom.js && \
    echo "global.xmldom = require('xmldom');" | npx browserify -d -o browserify.xmldom.js - && \
    cat nginxify.xmldom.js browserify.xmldom.js > xmldom.js


