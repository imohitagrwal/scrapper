const urlMetadata = require('url-metadata')
const Scrappers = require("../models/scrapper");

const scrapper = {};

scrapper.scrapMetaData = async ( req, res ) => {
	try{
		if(req.body.url && req.body.url.trim().length){
			if(!isUrlValid(req.body.url.trim())){
				return res.status(400).send("Invalid_url_format")
			}
			
			let scrappedData;
			
			scrappedData = await Scrappers.findOne({ url : req.body.url.trim() }).lean();
			
			if(scrappedData){
				return res.status(200).send(scrappedData);
			}else{
				let urlMeta = await urlMetadata(req.body.url.trim());
				if(urlMeta){
					scrappedData =  await Scrappers.create({ url : req.body.url , metadata : urlMeta});
					return res.status(200).send(scrappedData);
				}else{
					return res.status(204).send("No_meta_data_found");
				}
			}
		}else{
			return res.status(400).send("Bad_arguments");
		}

	}catch(err){
		console.log(err);
		return res.status(500).send("Internal_server_error");
	}
}

const isUrlValid = (userInput) => {
	let reg = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
	return reg.test(userInput);
}

module.exports = scrapper;
