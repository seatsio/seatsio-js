function errorResponseHandler (error) {
    return new Promise(function (resolve, reject) {
        if (typeof error.response !== 'undefined') {
            if (typeof error.response.data !== 'undefined' && error.response.data) {
                reject(error.response.data)
            } else if (typeof error.response.statusText !== 'undefined' && error.response.statusText) {
        reject(`${error.config.method} ${error.config.url} resulted in ${error.response.status} ${error.response.statusText} error`) // eslint-disable-line
            }
        } else {
            reject(error)
        }
    })
}

module.exports = errorResponseHandler
