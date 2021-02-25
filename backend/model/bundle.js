//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var bundleInfoSchema = new Schema({
    id: String,
    ethPrice: String,   
    factory: {
        type: ObjectId,
        ref: 'FactoryInfo'
    },
    time : { type : Date, default: Date.now }
});

var BundleInfoModel = mongoose.model('BundleInfo', bundleInfoSchema );

module.exports = BundleInfoModel;