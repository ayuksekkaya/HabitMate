const zipcode = require('../Models/zipcode');


const MapMethods  = {
    addAddress: async function(req, res) {
            console.log(req.body);
            zipcode.create(req.body, function(err, created){
                if (err){
                    res.send(err);
                    console.log(err);
                }
                else {
                    res.send("success");
                }
            });
    },

    getAddress: async function(req, res) {
        let addresses = await zipcode.find({});
        res.send(addresses);
    }
};


module.exports = MapMethods;