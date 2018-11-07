const axios = require('axios');

function errorResponseHandler(error) {
    if (error.config.hasOwnProperty('errorHandle') && error.config.errorHandle === false) {
        return Promise.reject(error.response.data);
    }
    if (error.response) {
        console.log(error.response.data);
    }
}

module.exports = errorResponseHandler;
