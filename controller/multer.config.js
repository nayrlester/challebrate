const multer = require('multer');
 
var storage = multer.diskStorage({
	destination: (req, file, cb) => {
	  cb(null, __dirname + '/storage')
	},
	filename: (req, file, cb) => {
	  cb(null, file.originalname)
	}
});
 
var upload = multer({storage: storage});
module.exports = upload;