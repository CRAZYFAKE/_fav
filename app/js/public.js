const fs = request('fs');
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

    /**
     * 异步
     * 覆盖之前的文件内容,写文件
     */
    this.writeFile = function(path, arr) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, arr, function(err) {
                if (err) {
                    resolve(err);
                } else {
                    resolve('success');
                }
            });
        });
    }

    /**
     * 同步
     * 读取文件
     */
    this.readFileSync = function(path) {
        return fs.readFileSync(path).toString();
    }
    return this;
}