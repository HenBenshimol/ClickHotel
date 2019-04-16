"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var user_1 = require("./controllers/user");
var hotels_1 = require("./controllers/hotels");
function setRoutes(app) {
    var router = express.Router();
    var userCtrl = new user_1.default();
    var hotelCtrl = new hotels_1.default();
    // Hotel
    router.route('/hotels').get(hotelCtrl.getAll);
    router.route('/hotels/count').get(hotelCtrl.count);
    router.route('/hotel').post(hotelCtrl.insert);
    router.route('/hotel/:id').get(hotelCtrl.get);
    router.route('/hotel/:id').put(hotelCtrl.update);
    router.route('/hotel/:id').delete(hotelCtrl.delete);
    // Users
    router.route('/login').post(userCtrl.login);
    router.route('/users').get(userCtrl.getAll);
    router.route('/users/count').get(userCtrl.count);
    router.route('/user').post(userCtrl.insert);
    router.route('/user/:id').get(userCtrl.get);
    router.route('/user/:id').put(userCtrl.update);
    router.route('/user/:id').delete(userCtrl.delete);
    // Apply the routes to our application with the prefix /api
    app.use('/api', router);
}
exports.default = setRoutes;
//# sourceMappingURL=routes.js.map