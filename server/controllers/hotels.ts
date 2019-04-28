import Hotel from '../models/hotel';
import BaseCtrl from './base';

export default class HotelsCtrl extends BaseCtrl {
  model = Hotel;

    // Get hotel by name
    getHotelByName = async (req, res) => {
      try {
        const obj = await this.model.findOne({ name: req.params.hotelName });
        console.log(obj);
        res.status(200).json(obj);
      } catch (err) {
        return res.status(500).json({ error: err.message });
      }
    }
}
