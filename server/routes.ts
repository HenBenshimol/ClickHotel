import * as express from 'express';

import UserCtrl from './controllers/user';
import HotelsCtrl from './controllers/hotels';

export default function setRoutes(app) {

  const router = express.Router();

  const userCtrl = new UserCtrl();
  const hotelCtrl = new HotelsCtrl();

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
