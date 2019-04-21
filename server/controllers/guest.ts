import Guest from '../models/guest';
import BaseCtrl from './base';

export default class GuestCtrl extends BaseCtrl {
  model = Guest;

  // Get by user id
  getByUserId = async (req, res) => {
    try {
      const obj = await this.model.find({ userId: req.params.userId });
      console.log(obj);
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

}
