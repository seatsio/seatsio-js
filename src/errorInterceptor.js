function errorResponseHandler(error) {
    return new Promise(function(resolve, reject){
        if(typeof error.response.data !== 'undefined' && error.response.data){
            reject(error.response.data);
        } else {
            reject(`${error.config.method} ${error.config.url} resulted in ${error.response.status}  ${error.response.statusText}  error`)
        }
    })
}

module.exports = errorResponseHandler;
