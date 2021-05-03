const uuid = require('uuid/v1');
const Router = require('../models/Router');

exports.getAllRoutes = (req, res, next) => {
    Router.find()
        .then((routes) => {
            res.status(200).json(routes);
        })
        .catch(() => {
            res.status(500).send(new Error('Database error!'));
        });
};
