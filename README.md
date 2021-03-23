## NGINX njs XML SAML Parser PoC

This is a working demo on how to parse and manipulate XML-messages (e.g. SAML-Headers) with njs.

## 1. Build npm modules for njs
To build the libraries for njs simply build the Docker-Container and download the files or use them in another NGINX-Container with Docker multistage-build.

`docker build -t nginx:samllibs .`

Do build the libraries on the current system issue the following commands:
Learn more about how to use node-modules with njs (http://nginx.org/en/docs/njs/node_modules.html)

```shell
    npm install xpath xmldom

    printf "export default {xp}\nfunction xp(){}\n\n" > nginxify.xpath.js

    echo "global.xpath = require('xpath');" | npx browserify -d -o browserify.xpath.js -

    cat nginxify.xpath.js browserify.xpath.js > xpath.js
```

```shell
    printf "export default {xd}\nfunction xd(){}\n\n" > nginxify.xmldom.js

    echo "global.xmldom = require('xmldom');" | npx browserify -d -o browserify.xmldom.js -

    cat nginxify.xmldom.js browserify.xmldom.js > xmldom.js
```

## Installing

Copy the newly created files `xpath.js` as well as `xmldom.js` into the NGINX configuration directory. I like to have the `libs` directory to seperate the 3rd party libraries from the other njs code I have build on top of it.

## NGINX Configuration

Import the modules (see default.conf in conf.d)

```shell
js_import xp from libs/xpath.js;
js_import xd from libs/xmldom.js;
js_import xml from conf.d/njsxml.js;

```

## Credits
The example SAML SOAP-Envelope comes from the Oracle Documentations website.
