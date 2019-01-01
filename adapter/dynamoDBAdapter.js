var AWS = require('aws-sdk');
const uuidv1 = require('uuid/v1');
const moment = require('moment');

AWS.config.update({ region: 'eu-west-1' });
var dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
const docClient = new AWS.DynamoDB.DocumentClient();

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

//=======================================
const register = (result, fnCallback) => {
    var fResponse = new FunctionResponse("createTable", [result, fnCallback]);

    var registerObj = result.req.body;
    var email = registerObj.email;
    var password = registerObj.password;
    var userUUID = uuidv1();

    var paramOfRegister = {
        TableName: "Wi_USER",
        Item: {
            "userID": userUUID,
            "email": email,
            "password": password,
            "registerDate": moment().format('YYYY/MM/DD-HH:mm:ss')
        }
    }

    docClient.put(paramOfRegister, function(err, data) {
        if (err) fResponse.setErr(err);
        else fResponse.setData(userUUID + " kullanıcı kaydı başarıyle gerçekleştirildi")
        fnCallback(fResponse);
    })

}

module.exports = {
    createTable,
    register
};