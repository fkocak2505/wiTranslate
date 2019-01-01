var AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-west-1' });
var dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

const enumJS = require("../common/enum");


//=======================================
const createTable = (result, fnCallback) => {
	var fResponse = new FunctionResponse("createTable", [result, fnCallback]);

    var tableNameObj = result.req.body;
    var tableName = tableNameObj.tableName;

    var params = {
        TableName: tableName,
        KeySchema: [
            { AttributeName: TablePrimaryKey[tableName], KeyType: "HASH" } // PK
        ],
        AttributeDefinitions: [
            { AttributeName: TablePrimaryKey[tableName], AttributeType: "S" }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1
        }
    };
    dynamodb.createTable(params, function(err, data) {
        if (err) fResponse.setErr(err);
        else fResponse.setData(tableName + " was created..")
        fnCallback(fResponse);
    });
}

module.exports = {
    createTable
};