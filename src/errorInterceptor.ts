export function errorResponseHandler (e: any) {
    return new Promise(function (resolve, reject) {
        if (typeof e.response !== 'undefined') {
            if (typeof e.response.data !== 'undefined' && e.response.data) {
                reject(e.response.data)
            } else if (typeof e.response.statusText !== 'undefined' && e.response.statusText) {
        reject(`${e.config.method} ${e.config.url} resulted in ${e.response.status} ${e.response.statusText} error`) // eslint-disable-line
            }
        } else {
            reject(e)
        }
    })
}
