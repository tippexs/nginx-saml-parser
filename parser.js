// Debugging App for the npm modules loaded into NJS

var DOMParser = require('xmldom').DOMParser;
var XPath = require('xpath');
var XMLSerializer = require('xmldom').XMLSerializer;
var DOMImpl = require('xmldom').DOMImplementation;
const fs = require('fs');


var doc = new DOMParser().parseFromString(fs.readFileSync('./soapEnvelope.xml').toString());

var saml = XPath.useNamespaces({'saml': 'urn:oasis:names:tc:SAML:1.0:assertion'});
var node4XML =  saml('//saml:Subject', doc)[0];
var node = saml('//saml:Subject/saml:NameIdentifier/text()', doc)[0].nodeValue;
node4XML.setAttribute('test', 'TestAttributeFromNJS');


var newDiv = doc.createElement("div");
var newElementNS = doc.createElementNS('http://www.w3.org/1999/xhtml', 'SomeMoreSaml')
var newContent = doc.createTextNode("Base64EncodedStuff");
newDiv.appendChild(newContent);
newElementNS.appendChild(newContent);
doc.insertBefore(newDiv);
doc.insertBefore(newElementNS);
node4XML.appendChild(newElementNS);

var xmlString = new XMLSerializer().serializeToString(doc);

console.log(xmlString);




