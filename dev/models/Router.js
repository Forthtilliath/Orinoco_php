const routes = require('../app/config/routes.json');

exports.find = () => {
    return new Promise((resolve, reject) => resolve(JSON.parse(JSON.stringify(routes))));
};