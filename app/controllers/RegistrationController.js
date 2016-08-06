var Reg = require('../models/registration'); 

module.exports.create = function (req, res) {
        var reg = new Reg(req.body);
        reg.save(function (err, result) {
                //console.log(err);
                //console.log(result);
                res.json(result);
        });
}


