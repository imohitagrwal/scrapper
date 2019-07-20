var mongoose		= require('mongoose');
mongoose.Promise 	= require('bluebird');

mongoose = mongoose.createConnection( 'mongodb://localhost:27017/scp', function(err){
	console.log(err);
	console.log('=============== Database Connected ===============');
});

module.exports = mongoose;