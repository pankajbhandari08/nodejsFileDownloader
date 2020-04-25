var downloadFile = require('download-file')
var http = require('http');
var fs = require('fs');

var getQueryString = function ( field, url ) {
	
	var reg = new RegExp( '[?&]' + field + '=([^&#]*)', 'i' );
	var string = reg.exec(url);
	return string ? string[1] : null;
};


function checkDirectory(directory, callback) {  
    fs.stat(directory, function(err, stats) {
      //Check if error defined and the error code is "not exists"
      if (err && err.code === 'ENOENT') {
        //Create the directory, call the callback.
        console.log("making directory");
        fs.mkdir(directory, callback);
      } else {
        //just in case there was a different error:
        callback(err)
      }
    });
  }


var download = function(url, dest, cb) {

    if(!dest){
        dest = __dirname;
        dest +="\\download";
    }

    console.log(dest);

    checkDirectory(dest, function(error){
        if(error){
            cb(error)
        }
        else{
            var fileName = getQueryString("isbn", url);
            if(!fileName){
                fileName = Date.UTC();
            }

            var options = {
                directory: dest,
                filename: fileName + ".pdf"
            }

            downloadFile(url, options, function(err){
                if (err) {console.log(err)}
                cb();
            });
        }
    });

     
};

module.exports = {
    download: download
}