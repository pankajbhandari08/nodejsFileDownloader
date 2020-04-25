const fs = require('fs');
var PdfReader = require('pdfreader').PdfReader;



function readPdf(file, sucessCallBack, readingFinishedCallBack, ErrorCallback) { 
    fs.readFile(file, (err, pdfBuffer) => {
        // pdfBuffer contains the file content
        new PdfReader().parseBuffer(pdfBuffer, function(err, item){
           if (err)
           ErrorCallback(err);
            else if (!item)
            readingFinishedCallBack(true);
             else if (item.text)
             sucessCallBack( item.text);
              });
           });
        }
 
// now we export the class, so other modules can create Cat objects
module.exports = {
    readPdf: readPdf
}