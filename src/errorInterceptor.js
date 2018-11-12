function errorResponseHandler(error) {
    return Promise.reject(error.response.data);
}

module.exports = errorResponseHandler;
