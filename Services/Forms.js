const formidable = require('formidable');

module.exports.parse = async function(req) {
	return new Promise((resolve, reject) => {
		let form = new formidable.IncomingForm();

		form.parse(req, (err, fields, files) => {
			if (err)
				return reject(err);

			resolve({ fields: fields, files: files });
		});
	});
}