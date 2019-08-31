import Ranking from '../models/ranking';
import BaseCtrl from './base';
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';

export default class RankingCtrl extends BaseCtrl {

  // Get ranking by number of guest and dates
  getRankingByDate = async (req, res) => {
    try {
      const obj = await this.model.aggregate([
              { $match : { checkinDate: { $gte:(new Date(req.params.checkinDate))}, checkoutDate:{$lt:(new Date(req.params.checkoutDate))}}},
              { $group : {
                _id : { hotelName: "$hotelName"},
                total: {$sum: "$rate"},
                count: { $sum: 1 }}
              }]);
      res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  model = Ranking;
}