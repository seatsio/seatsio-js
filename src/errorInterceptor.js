function errorResponseHandler(error) {
    return new Promise(function(resolve, reject){
        if(error.response.data ){
            reject(error.response.data);
        } else {
            reject(`${error.config.method} ${error.config.url} resulted in ${error.response.status}  ${error.response.statusText}  error`)
        }
    })
}

module.exports = errorResponseHandler;
