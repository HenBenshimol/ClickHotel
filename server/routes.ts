import * as express from 'express';

import UserCtrl from './controllers/user';
import HotelsCtrl from './controllers/hotels';
import RoomCtrl from './controllers/room';
import GuestCtrl from './controllers/guest';

export default function setRoutes(app) {

  const router = express.Router();

  const userCtrl = new UserCtrl();
  const hotelCtrl = new HotelsCtrl();
  const roomCtrl = new RoomCtrl();
  const guestCtrl = new GuestCtrl();

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
  router.route('/thankyou/:userId').get(guestCtrl.getActiveGuest);
  router.route('/guestRoomId/:userId').get(guestCtrl.setGuestRoomId);
  
  // Apply the routes to our application with the prefix /api
  app.use('/api', router);

}
