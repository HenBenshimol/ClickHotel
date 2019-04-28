import Hotel from '../models/hotel';
import BaseCtrl from './base';

export default class HotelsCtrl extends BaseCtrl {
  model = Hotel;

    // Get hotel by id
    getHotelById = async (req, res) => {
      try {
        const obj = await this.model.findOne({ _id: req.params.hotelId });
        console.log(obj);
        res.status(200).json(obj);
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
    }
}
