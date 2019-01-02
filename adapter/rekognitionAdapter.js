const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-1' });
AWS.config.apiVersions = { s3: '2006-03-01' };
var rekognition = new AWS.Rekognition();


//================================================================================
const rekognitionImage = (params, fnCallback) => {
    var fResponse = new FunctionResponse("rekognition", [params, fnCallback]);

    rekognition.detectText(params, function(err, data) {
        debugger;
        if (err) fResponse.setErr(err)
        else fResponse.setData(data);
        fnCallback(fResponse);
    });
}

//================================================================================
module.exports = {
    rekognitionImage
}