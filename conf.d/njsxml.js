export default { readXML }

function readXML(r) {

  var xpath = global.xpath;
  var dom = global.xmldom.DOMParser;
  var xmlSerializer = global.xmldom.XMLSerializer;

  if (typeof(r.requestBuffer) != "undefined") {


    // Create a DOM Document https://developer.mozilla.org/en-US/docs/Web/API/Document from the XMLString.
    var doc = new dom().parseFromString(r.requestBuffer.toString());
    // Define the namesapes you want to make use of.
    var saml = xpath.useNamespaces({'saml': 'urn:oasis:names:tc:SAML:1.0:assertion'});
    // Get a node by its XPATH
    var node4XML =  saml('//saml:Subject', doc)[0];
    // Get the text value of a node by its XPATH
    var node = saml('//saml:Subject/saml:NameIdentifier/text()', doc)[0].nodeValue;

    // Node Manipulation
    // Add Attributes to already existing nodes.
    node4XML.setAttribute('test', 'TestAttributeFromNJS');
    var newContent = doc.createTextNode("Base64EncodedStuff");

    // Create a new Node using NameSpaces.
    var newElementNS = doc.createElementNS('http://www.w3.org/1999/xhtml', 'SomeMoreSaml');
    // Add a Content-Node.
    newElementNS.appendChild(newContent);
    // Append the new Node to the currently selected node.
    node4XML.appendChild(newElementNS);

    // use xmlSerializer to create a String from the DOM Document.
    var xmlString = new xmlSerializer().serializeToString(node4XML);

  }
  r.log(node);
  r.log(xmlString.toString());
  r.return (200, "OK");
}