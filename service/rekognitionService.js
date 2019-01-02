const rekognitionAdapter = require(__dirname + "/../adapter/rekognitionAdapter");
const s3Adapter = require(__dirname + "/../adapter/s3Adapter");
const async = require('async');

const fResponse = require("../common/fResponse");

//================================================================
const rekognition = (result, fnCallback) => {
    var fResponse = new FunctionResponse("rekognition", [result, fnCallback]);

    var rekognitionParam = result.req.body;
    var fileName = result.req.file.originalname;
    var userEmail = rekognitionParam.email;
    var userUuid = rekognitionParam.uuid;

    var tmp_path = result.req.file.path;
    var bucketName = "wi-translate";
    var accountS3Path = userEmail + "-" + userUuid + "/"
    var key = accountS3Path + fileName;

    async.waterfall(
        [
            function(callback) {
                s3Adapter.putImage2S3(tmp_path, bucketName, key, (fResp) => {
                    if (fResp.err != undefined) fResponse.setErr(fResp.err)
                    else {
                        callback(null)
                    }
                });
            },
            function(callback) {
                var params = {
                    Image: {
                        S3Object: {
                            Bucket: bucketName,
                            Name: key
                        }
                    }
                }

                rekognitionAdapter.rekognitionImage(params, fResp => {
                    if (fResp.err != undefined) fResponse.setErr(fResp.err);
                    else {
                        callback(null, fResp.data)
                    }
                });
            }
        ],
        function(err, result) {
            var resultObj = { data: result }
            fResponse.setData(resultObj);
            fnCallback(fResponse)
            console.log("Err -> " + err)
        });
}

//================================================================
module.exports = {
    rekognition
}