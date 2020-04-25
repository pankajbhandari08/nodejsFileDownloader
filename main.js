var pdfReader = require('./myPdfReader');
var urlFinder = require('./urlFinder');
var fileDownloader = require('./fileDownloader');

var filePath = process.argv.slice(2);

var finishedReadeing = false;

var urls = [];
var itemsProcessed = 0;

var beginDownload = function (){
    urls.forEach((item, index, array) => {
        fileDownloader.download(item,"", () => {
          itemsProcessed++;
          if(itemsProcessed === array.length) {
            console.log("Processed all");
          }
        });
      });
}

if(!filePath || !filePath.length){
    console.error("File path is not supplied.");
}
else{
    var file = filePath[0];
    console.log("Reading file : " +file);
    pdfReader.readPdf(file, 
        (content) => {
            urlFinder.isURL(content, 
            (url) => {
                urls.push(url);
            }, (error)=>{
                console.log(error)
            })
        }, 
        
        (readingFinished) => {
                console.log("found "+urls.length+" urls in the file");
                beginDownload();
        },
        (error)=>{
            console.log(error)
        }
    );
}