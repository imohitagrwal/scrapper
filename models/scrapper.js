var mongoose        = require('mongoose');
var Schema          = mongoose.Schema;
var db           	= require('../config/db');

var scrapped_data = new Schema({
                                url : {  type : String,unique : true},
                                metadata : { type : Schema.Types.Mixed , default : null}
                            }, {
                                timestamps: true
                            });

module.exports =  db.model('scrapped_data', scrapped_data);