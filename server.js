// server.js

const path = require('path');
const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser')
const app = express();


const DIR = './uploads';

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      cb(null, "tsClassFileName.ts");
    }
});
let upload = multer({storage: storage});


app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(express.static('uploads'));

app.get('/', function (req, res) {
    res.end('file catcher example');
  });

app.post('/post', upload.single('file'), function(req, res) {
    console.log(req.file);
    return res.send({
        success: true
      })
   });

const PORT = process.env.PORT || 4000;

app.listen(PORT, function () {
  console.log('Node.js server is running on port ' + PORT);
});