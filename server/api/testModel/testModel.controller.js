var model = require('./testModel.model.js');

/**
 * testModelController.js
 *
 * @description :: Server-side logic for managing testModels.
 */
module.exports = {

    /**
     * testModelController.list()
     */
    list: function(req, res) {
        model.find(function(err, testModels){
            if(err) {
                return res.json(500, {
                    message: 'Error getting testModel.'
                });
            }
            return res.json(testModels);
        });
    },

    /**
     * testModelController.show()
     */
    show: function(req, res) {
        var id = req.params.id;
        model.findOne({_id: id}, function(err, testModel){
            if(err) {
                return res.json(500, {
                    message: 'Error getting testModel.'
                });
            }
            if(!testModel) {
                return res.json(404, {
                    message: 'No such testModel'
                });
            }
            return res.json(testModel);
        });
    },

    /**
     * testModelController.create()
     */
    create: function(req, res) {
        var testModel = new model({
			title : req.body.title,
			description : req.body.description
        });

        testModel.save(function(err, testModel){
            if(err) {
                return res.json(500, {
                    message: 'Error saving testModel',
                    error: err
                });
            }
            return res.json({
                message: 'saved',
                _id: testModel._id
            });
        });
    },

    /**
     * testModelController.update()
     */
    update: function(req, res) {
        var id = req.params.id;
        model.findOne({_id: id}, function(err, testModel){
            if(err) {
                return res.json(500, {
                    message: 'Error saving testModel',
                    error: err
                });
            }
            if(!testModel) {
                return res.json(404, {
                    message: 'No such testModel'
                });
            }

            testModel.title =  req.body.title ? req.body.title : testModel.title;
			testModel.description =  req.body.description ? req.body.description : testModel.description;

            testModel.save(function(err, testModel){
                if(err) {
                    return res.json(500, {
                        message: 'Error getting testModel.'
                    });
                }
                if(!testModel) {
                    return res.json(404, {
                        message: 'No such testModel'
                    });
                }
                return res.json(testModel);
            });
        });
    },

    /**
     * testModelController.remove()
     */
    remove: function(req, res) {
        var id = req.params.id;
        model.findByIdAndRemove(id, function(err, testModel){
            if(err) {
                return res.json(500, {
                    message: 'Error getting testModel.'
                });
            }
            return res.json({
                _id: testModel._id,
                message:'Removed'
            });
        });
    }
};
