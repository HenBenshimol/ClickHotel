"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var user_1 = require("./controllers/user");
var hotels_1 = require("./controllers/hotels");
var room_1 = require("./controllers/room");
var guest_1 = require("./controllers/guest");
var ranking_1 = require("./controllers/ranking");
function setRoutes(app) {
    var router = express.Router();
    var userCtrl = new user_1.default();
    var hotelCtrl = new hotels_1.default();
    var roomCtrl = new room_1.default();
    var guestCtrl = new guest_1.default();
    var rankingCtrl = new ranking_1.default();
    // Hotel
    router.route('/hotels').get(hotelCtrl.getAll);
    router.route('/hotels/count').get(hotelCtrl.count);
    router.route('/hotel').post(hotelCtrl.insert);
    router.route('/hotel/:id').get(hotelCtrl.get);
    router.route('/hotel/:id').put(hotelCtrl.update);
    router.route('/hotel/:id').delete(hotelCtrl.delete);
    // Room
    router.route('/rooms').get(roomCtrl.getAll);
    router.route('/room/count').get(roomCtrl.count);
    router.route('/room').post(roomCtrl.insert);
    router.route('/room/:id').get(roomCtrl.get);
    router.route('/room/:id').put(roomCtrl.update);
    router.route('/room/:id').delete(roomCtrl.delete);
    router.route('/roomId/:roomId').get(roomCtrl.getRoomById);
    router.route('/roomByUserId/:userId').get(roomCtrl.getRoomByUserId);
    router.route('/randomRoom/:hotelName').get(roomCtrl.getRandomRoom);
    // Users
    router.route('/login').post(userCtrl.login);
    router.route('/users').get(userCtrl.getAll);
    router.route('/users/count').get(userCtrl.count);
    router.route('/user').post(userCtrl.insert);
    router.route('/user/:id').get(userCtrl.get);
    router.route('/user/:id').put(userCtrl.update);
    router.route('/user/:id').delete(userCtrl.delete);
    // Guest
    router.route('/guests').get(guestCtrl.getAll);
    router.route('/guest/count').get(guestCtrl.count);
    router.route('/checkin').post(guestCtrl.insert);
    router.route('/guest/:id').get(guestCtrl.get);
    router.route('/guest/:id').put(guestCtrl.update);
    router.route('/guest/:id').delete(guestCtrl.delete);
    router.route('/hotelHistory/:userId').get(guestCtrl.getGuestByUserId);
    router.route('/activeGuest/:userId').get(guestCtrl.getActiveGuest);
    // Ranking
    router.route('/rankings').get(rankingCtrl.getAll);
    router.route('/rankings/count').get(rankingCtrl.count);
    router.route('/checkout').post(rankingCtrl.insert);
    router.route('/ranking/:id').get(rankingCtrl.get);
    router.route('/ranking/:id').put(rankingCtrl.update);
    router.route('/ranking/:id').delete(rankingCtrl.delete);
    // Apply the routes to our application with the prefix /api
    app.use('/api', router);
}
exports.default = setRoutes;
//# sourceMappingURL=routes.js.map