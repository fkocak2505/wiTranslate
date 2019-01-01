const dynamoDBAdapter = require(__dirname + "/../adapter/dynamoDBAdapter");
const fResponse = require("../common/fResponse");

//================================================================
const createTable = (result, fnCallback) => {
    var fResp = new FunctionResponse("createTable", [result, fnCallback]);

    dynamoDBAdapter.createTable(result, fResp => {
        if (fResp.err !== undefined) fResp.setErr(fResp.err)
        else fResp.setData(fResp.data);
        fnCallback(fResp);
    })
}

//================================================================
const register = (result, fnCallback) => {
    var fResp = new FunctionResponse("register", [result, fnCallback]);
    dynamoDBAdapter.register(result, fResp => {
        if (fResp.err !== undefined) fResp.setErr(fResp.err)
        else fResp.setData(fResp.data);
        fnCallback(fResp);
    })
}

//================================================================
const login = (result, fnCallback) => {
    var fResp = new FunctionResponse("login", [result, fnCallback]);
    dynamoDBAdapter.login(result, fResp => {
        if (fResp.err !== undefined) fResp.setErr(fResp.err)
        else fResp.setData(fResp.data);
        fnCallback(fResp);
    })
}

//================================================================
module.exports = {
    createTable,
    register,
    login
}