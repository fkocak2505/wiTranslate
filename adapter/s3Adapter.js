const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-1' });
AWS.config.apiVersions = { s3: '2006-03-01' };

const fs = require("fs");

const s3 = new AWS.S3({ region: 'eu-west-1' });
const fResponse = require("../common/fResponse");

//================================================================
const putImage2S3 = (filePath, bucket, key, fnCallback) => {
    var fResponse = new FunctionResponse("putImage2S3", [filePath, bucket, key, fnCallback]);
    debugger;
    fs.readFile(filePath, (err, data) => {
        if (err != undefined) {
            fResponse.setErr(err);
            fnCallback(fResponse);
        } else {
            var params = {
                Body: data,
                Bucket: bucket,
                Key: key
            };
            s3.putObject(params, function(err, data) {
                if (err) {
                    fResponse.setErr(err);
                    fnCallback(fResponse);
                } else {
                    fResponse.setData(data);
                    fs.unlink(filePath, function(err) {
                        if (!err) {
                            fnCallback(fResponse);
                        } else {
                            fResponse.setErr(err);
                            fnCallback(fResponse);
                        }
                    });
                }
            });
        }

    });
}

//================================================================
module.exports = {
    putImage2S3
}