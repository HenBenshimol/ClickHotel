import * as express from 'express';

import UserCtrl from './controllers/user';
import HotelsCtrl from './controllers/hotels';
import RoomCtrl from './controllers/room';
import GuestCtrl from './controllers/guest';
import RankingCtrl from './controllers/ranking';
import ServiceCtrl from './controllers/service';
import OrderCtrl from './controllers/order';

export default function setRoutes(app) {

  const router = express.Router();

  const userCtrl = new UserCtrl();
  const hotelCtrl = new HotelsCtrl();
  const roomCtrl = new RoomCtrl();
  const guestCtrl = new GuestCtrl();
  const rankingCtrl = new RankingCtrl();
  const serviceCtrl = new ServiceCtrl();
  const orderCtrl = new OrderCtrl();

  // Hotel
  router.route('/hotels').get(hotelCtrl.getAll);
  router.route('/hotels/count').get(hotelCtrl.count);
  router.route('/hotel').post(hotelCtrl.insert);
  router.route('/hotel/:id').get(hotelCtrl.get);
  router.route('/hotel/:id').put(hotelCtrl.update);
  router.route('/hotel/:id').delete(hotelCtrl.delete);
  router.route('/hotelByName/:hotelName').get(hotelCtrl.getHotelByName);

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
  router.route('/guestAnalytics').get(guestCtrl.getAllGuestAge);
  router.route('/getAllGuestPurpose').get(guestCtrl.getAllGuestPurpose);

  // Ranking
  router.route('/rankings').get(rankingCtrl.getAll);
  router.route('/rankings/count').get(rankingCtrl.count);
  router.route('/checkout').post(rankingCtrl.insert);
  router.route('/ranking/:id').get(rankingCtrl.get);
  router.route('/ranking/:id').put(rankingCtrl.update);
  router.route('/ranking/:id').delete(rankingCtrl.delete);

  // Service
  router.route('/services').get(serviceCtrl.getAll);
  router.route('/services/count').get(serviceCtrl.count);
  router.route('/service').post(serviceCtrl.insert);
  router.route('/service/:id').get(serviceCtrl.get);
  router.route('/service/:id').put(serviceCtrl.update);
  router.route('/service/:id').delete(serviceCtrl.delete);
  router.route('/servicesType').get(serviceCtrl.getServicesType);
  router.route('/serviceByType/:type').get(serviceCtrl.getServicesByType);

  // Order
  router.route('/orders').get(orderCtrl.getAll);
  router.route('/orders/count').get(orderCtrl.count);
  router.route('/order').post(orderCtrl.insert);
  router.route('/order/:id').get(orderCtrl.get);
  router.route('/order/:id').put(orderCtrl.update);
  router.route('/order/:id').delete(orderCtrl.delete);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
