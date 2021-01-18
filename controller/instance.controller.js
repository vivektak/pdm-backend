const instanceModel = require('../models/instance.model');
const { events } = require('../models/instance.model');
const base64Img = require('base64-img');
const randomString = require('randomstring');

module.exports.findInstances = async (req,res) => {
    const instances = await instanceModel.find({}, "name refinery image createdDate createdBy").sort({ createdAt : 'desc'}).skip(9 * 1 - 9).limit(9).exec();
    return res.status(200).send({
        error: false,
        message: 'Instance found',
        data: instances
    })
}

module.exports.deleteInstance = async (req, res) => {
	const deletedInstance = await instanceModel.findOneAndDelete({ _id: req.params.id }, function (err) {
		if(err) console.log(err);
		return res.status(200).send({
			error: false,
			message: 'Deleted Successfully',
		})
	});
}

module.exports.createInstance = (req, res) => {
	const random_string = randomString.generate(10);
	const filepath = base64Img.imgSync(req.body.image, 'public', random_string);
	if (filepath.includes('/')) {
		fileName = filepath.split('/')[1];
	} else {
		fileName = filepath.split('\\')[1];
	}
	console.log(req.body.createdBy)
	const Instance = new instanceModel({
		name: req.body.name,
		image: fileName,
		refinery: req.body.refinery,
		createdDate: new Date(),
		createdBy: req.body.createdBy,
	});
    Instance.save((err, eventSaved) => {
		if (err) {
			return res.status(500).send({
				error: true,
				message: 'Error while saving event',
				data: err
			});
		}

		return res.status(200).send({
			error: false,
			message: 'Instance saved successfully'
		});
	});
}