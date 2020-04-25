var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
'((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
'(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
'(\\#[-a-z\\d_]*)?$','i');

function isURL(text, successCallBack, errorCallBack){
    if(!text){
        errorCallBack("Invalid text passed.");
    }

    if(pattern.test(text))
    {
        successCallBack(text);
    }
}
 
module.exports = {
    isURL: isURL
}