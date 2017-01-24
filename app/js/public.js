const request = require('request');
const public = function() {
    this.post = function(url, data) {
        return new Promise((resolve, reject) => {
            request.post({ url: config['HOST'] + url, form: data }, function(err, httpResponse, body) {
                if (err) {
                    reject(err);
                } else {
                    resolve(body);
                }
            })
        })
    }
    return this;
}