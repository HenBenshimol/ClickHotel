import Room from '../models/room';
import BaseCtrl from './base';

export default class RoomsCtrl extends BaseCtrl {
  model = Room;

  // Get room by id
  getRoomById = async (req, res) => {
    try {
      const obj = await this.model.findOne({ _id: req.params.roomId });
      console.log(obj);
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}