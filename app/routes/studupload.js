'use strict';

module.exports = function(app) {

var multer  = require('multer')

var upload = multer({ 
    dest: 'uploads/',
    limits: {fileSize: 1000000, files:1},
 })

app.post('/upload', upload.any(), function (req, res, next) {
    res.send(req.files);
})

};