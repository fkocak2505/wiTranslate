var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const multer = require('multer');
const upload = multer({ dest: "upload/" });
const type = upload.single('recfile');

const dynamoDBController = require("./controller/dynamoDBController");
const rekognitionController = require("./controller/rekognitionController");

const API_VERSION = "0.0.1";
app.use(cors());
app.use(bodyParser.json({ limit: '250mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


//=======================================
app.get('/api/public', (req, res) => {
    res.json({
        message: "Hello WiTranslate Server"
    });
});

//=======================================
app.post('/api/createTable', (req, res) => {
    var result = { data: { data: 0 }, req: req, res: res };
    dynamoDBController.createTable(result);
});

//=======================================
app.post('/api/register', (req, res) => {
    var result = { data: { data: 0 }, req: req, res: res };
    dynamoDBController.register(result);
})

//=======================================
app.post('/api/login', (req, res) => {
    var result = { data: { data: 0 }, req: req, res: res };
    dynamoDBController.login(result);
})

//=======================================
app.post('/api/rekognition', type, (req, res) => {
    var result = { data: { data: 0 }, req: req, res: res };
    rekognitionController.rekognition(result);
})

var port = process.env.PORT || 3010
app.listen(port, function() {
    console.log('Server listening on ', port);
})